import $ from 'jquery'
import TranslateButton from './input-translate-button'

export default class HTMLInput {
  constructor (mceTd, index, vue) { // jquery
    this._mceTd = mceTd
    this._index = index
    this._vue = vue
    this._translateButton = null

    this._mceId = 'mce-' + index
    this._mceTd.attr('id', this._mceId)

    this.init()
  }

  init () {
    const tick = setInterval(() => {
      this._input = this._mceTd.find('.mceIframeContainer iframe').contents().find('#tinymce')
      if (this._input.length !== 0) {
        clearInterval(tick)
        this._input.on('focus', this.createTranslateButton.bind(this))

        // The status bar
        this._statusBar = this._mceTd.find('.mceStatusbar')
        this._statusBar.css('position', 'relative')

        // The words count in the status bar
        this._countWords = this._statusBar.find('div:last')

        // Listen to costum event "focus_input" to hide the translate button when another input is focused
        $(document).on('focusInput', this.onFocusInput.bind(this))
      }
    }, 200)
  }
  createTranslateButton () {
    // First we trigger an event to remove other translate button
    $(document).trigger('focusInput', this._mceId)

    // skip if translate button exists
    if (this._translateButton !== null) {
      return
    }

    // Create translate button
    this._translateButton = TranslateButton.create()
    this._mceTd.append(this._translateButton)
    this._countWords.css('padding-right', '47px')
    this._mceTd.css('position', 'relative')
    this._translateButton.css('bottom', '6px')
    this._translateButton.css('right', '6px')
    this._translateButton.css('top', 'auto')

    // Create click handler for the translate button
    this._translateButton.click(this.onClickTranslateButton.bind(this))
  }

  onClickTranslateButton () {
    TranslateButton.addLoading(this._translateButton)
    this._vue.translate(this)
  }

  onFocusInput (event, objectId) {
    if (objectId !== this._mceId) {
      this.removeTranslateButton()
    }
  }

  removeTranslateButton () {
    if (this._translateButton != null) {
      this._translateButton.remove()
      this._translateButton = null
    }
    this._countWords.css('padding-right', '0')
  }

  getToTranslate () {
    return this._input.html()
  }

  setValue (value) {
    this._input.html(value)
  }

  removeLoading () {
    if (this._translateButton !== null) {
      TranslateButton.removeLoading(this._translateButton)
    }
  }
}

import $ from 'jquery'
import TranslateButton from './input-translate-button'

export default class Input {
  constructor (el, index, vue) {
    this._el = el
    this._index = index
    this._vue = vue

    // Create wrapper
    this._el.wrap('<font class="text-input-wrapper" id="text-input-wrapper-' + this._index + '"></font>')
    this._wrapper = this._el.parent()

    // Translate button
    this._translateButton = null

    // some events
    this._el.on('focus', this.createTranslateButton.bind(this))
    $(document).on('focusInput', this.onFocusInput.bind(this))
  }

  createTranslateButton () {
    // Create only one
    if (this._translateButton !== null) {
      return
    }

    if (this._vue.data.engine.length !== 3) {
      return
    }

    // Create a translate button
    this._translateButton = TranslateButton.create().insertAfter(this._el)

    // Adjust the position of the button
    this.adjustButtonPosition()

    // Create click handler
    this._translateButton.click(this.onClickTranslateButton.bind(this))

    // Trigger an event to remove other button
    $(document).trigger('focusInput', this._wrapper.attr('id'))
  }

  removeTranslateButton () {
    if (this._translateButton !== null) {
      this._translateButton.remove()
      this._translateButton = null
    }
  }

  onFocusInput (event, wrapperId) {
    if (wrapperId !== this._wrapper.attr('id')) {
      this.removeTranslateButton()
    }
  }

  onClickTranslateButton () {
    TranslateButton.addLoading(this._translateButton)
    this._vue.translate(this)
  }

  getToTranslate () {
    return this._el.val()
  }

  setValue (value) {
    this._el.val(value)
  }

  removeLoading () {
    if (this._translateButton !== null) {
      TranslateButton.removeLoading(this._translateButton)
    }
  }

  adjustButtonPosition () {
    // Not implemented
  }
}

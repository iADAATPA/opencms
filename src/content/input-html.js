import $ from 'jquery'

export default class HTMLInput {
  constructor (mceTd, index) { // jquery
    console.log('mceTd', mceTd)
    this._mceTd = mceTd
    this._index = index
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
    console.log('xxxxxxx')
    // First we trigger an event to remove other translate button

    $(document).trigger('focusInput', this._mceId)

    // skip if translate button exists
    if (this._translateButton !== null) {
      return
    }

    // Create translate button
    this._countWords.css('padding-right', '25px')
    this._translateButton = $('<button class="translate-button HTMLInput" style="float:right">T</button>').insertAfter(this._countWords)

    // // Adjust the button size
    // this._translateButton.css('height', this._status_bar.outerHeight() + 'px')
    // this._translateButton.css('width', this._status_bar.outerHeight() + 'px')

    // Create click handler for the translate button
    // this._translateButton.click(this.onClickTranslateButton.bind(this))
  }

  onClickTranslateButton () {
    // var to_translate = this._input.html()
    // this.anim_start()
    // var src_lang = ButtonBar.getSrcLang()
    // var tgt_lang = ButtonBar.getTgtLang()
    // this._translator.translate([to_translate], src_lang, tgt_lang).then(
    //   function (result) {
    //     this.anim_end()
    //     this._input.html(result[0][0]['tgt'])
    //   }.bind(this), function (err) {
    //     this.anim_end()
    //   }.bind(this))
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
  }
}

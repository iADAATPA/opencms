import $ from 'jquery'

export default class Input {
  constructor (el, index) {
    this._el = el
    this._index = index

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

    // Create a translate button
    this._translateButton = $('<button class="el-button el-button--primary el-button--mini translate-button">T</button>').insertAfter(this._el)

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
    this._translateButton.prepend('<i class="el-icon-loading el-icon-loading-pad"></i>')
    this._translateButton.prop('disabled', true)
  }

  adjustButtonPosition () {
    console.log('adjust')
  }
}

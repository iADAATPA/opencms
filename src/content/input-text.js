import Input from './input'

export default class InputText extends Input {
  // Adjust the position of the button
  adjustButtonPosition () {
    const d = (this._wrapper.outerHeight() - this._translateButton.outerHeight()) / 2 + 'px'
    this._translateButton.css('top', d)
    this._translateButton.css('right', '0px')
  }
}

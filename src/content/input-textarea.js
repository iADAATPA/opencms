import Input from './input'

export default class InputTextarea extends Input {
  adjustButtonPosition () {
    this._translateButton.css('top', 'auto')
    this._translateButton.css('bottom', '0px')
    this._translateButton.css('right', '0px')
  }
}

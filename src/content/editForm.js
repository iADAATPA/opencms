import $ from 'jquery'
import InputText from './input-text'
import InputTextarea from './input-textarea'
import InputHTML from './input-html'

export default class EditForm {
  constructor () {
    this._form = $('#EDITOR')
    this._textInputs = []
    this._textareas = []
    this._htmls = []
    const that = this

    // Text inputs
    const inputs = this._form.find('input:text')
    let k = 0
    inputs.each(function () {
      const textInput = new InputText($(this), k)
      that._textInputs.push(textInput)
      k++
    })

    // Textareas
    const textareas = this._form.find('textarea')
    textareas.each(function () {
      const textarea = new InputTextarea($(this), k)
      that._textareas.push(textarea)
      k++
    })

    // HTML editors
    const editors = this._form.find('td.cmsTinyMCE')
    editors.each(function () {
      const editor = new InputHTML($(this), k)
      that._htmls.push(editor)
      k++
    })
  }
}

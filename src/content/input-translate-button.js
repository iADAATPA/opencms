import $ from 'jquery'

export default class TranslaleButton {
  static create () {
    const button = $('<button class="el-button el-button--primary el-button--mini translate-button">T</button>')
    return button
  }

  static addLoading (button) {
    button.prepend('<i class="el-icon-loading el-icon-loading-pad"></i>')
    button.prop('disabled', true)
  }

  static removeLoading (button) {
    console.log('remove')
    $('i', button).remove()
    button.prop('disabled', false)
  }
}

console.log('background!')
chrome.storage.onChanged.addListener(function (keys) {
  keys.forEach(element => {
    console.log(element)
  })
})

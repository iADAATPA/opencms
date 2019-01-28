
const VERSION = '12'
export default {
  DATA_KEY: 'app-data-v' + VERSION,
  CONTENT_KEY: 'app-content' + VERSION,

  get (key) {
    return new Promise(function (resolve, reject) {
      chrome.storage.local.get(key, function (value) {
        if (chrome.runtime.lastError) {
          reject(chrome.runtime.lastError)
        }
        const valueObj = value[key]
        resolve(valueObj)
      })
    })
  },

  set (key, val) {
    const obj = {}
    obj[key] = val
    return new Promise(function (resolve, reject) {
      chrome.storage.local.set(obj, function (res) {
        if (chrome.runtime.lastError) {
          reject(chrome.runtime.lastError)
        }
        resolve(true)
      })
    })
  },

  remove (key) {
    return new Promise(function (resolve, reject) {
      chrome.storage.local.remove(key, function () {
        if (chrome.runtime.lastError) {
          reject(chrome.runtime.lastError)
        }
        resolve(true)
      })
    })
  }
}

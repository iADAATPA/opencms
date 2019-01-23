import Vue from 'vue'
import root from './content.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import storage from './../ext/storage'

// import './assets/element-theme/index.css'

storage.get(storage.DATA_KEY).then(function (value) {
  if (value) {
    const data = JSON.parse(value)
    const urls = data.urls
    const urlsArr = urls.split(/\n/)
    console.log(urlsArr)

    if (document.body != null) {
      const root = document.createElement('div')
      root.setAttribute('id', 'content-root')
      document.body.appendChild(root)
    }

    new Vue({ // eslint-disable-line no-new
      el: '#content-root',
      render: h => h(root)
    })
  }
}).catch(function (err) {
  console.log(err)
})

Vue.config.productionTip = false
Vue.use(ElementUI)

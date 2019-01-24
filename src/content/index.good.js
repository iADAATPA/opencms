import Vue from 'vue'
import root from './content.vue'
import ElementUI from 'element-ui'
import storage from './../ext/storage'

import 'element-ui/lib/theme-chalk/index.css'

Vue.config.productionTip = false
Vue.use(ElementUI)

storage.get(storage.DATA_KEY).then(value => {
  if (value) {
    const data = JSON.parse(value)
    // Allowed  urls
    const allowedUrls = data.urls.split(/\r?\n/)
    console.log('Translator 3: Allowed URLs', allowedUrls)

    // Site Url
    const siteUrl = window.location.href
    console.log('Translator: Site URL', siteUrl)

    // Allowed Site
    let isAllowedSite = false
    for (let url of allowedUrls) {
      if (siteUrl.startsWith(url)) {
        isAllowedSite = true
        break
      }
    }
    console.log('Translator: Allowed Site', isAllowedSite)

    // If site is allowed
    if (isAllowedSite) {
      if (document.body != null) {
        const rootElement = document.createElement('div')
        rootElement.setAttribute('id', 'content-root')
        document.body.appendChild(rootElement)

        new Vue({ // eslint-disable-line no-new
          el: rootElement,
          render: h => h(root)
        })
      }
    }
  }
}).catch(function (err) {
  console.log(err)
})

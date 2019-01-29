import Vue from 'vue'
import content from './content.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import storage from './../ext/storage'

Vue.config.productionTip = false
Vue.use(ElementUI)

storage.get(storage.DATA_KEY).then(value => {
  if (value) {
    const data = JSON.parse(value)
    // Allowed  urls
    const allowedUrls = data.urls.split(/\r?\n/)

    // Site Url
    const siteUrl = window.location.href

    // Allowed Site
    let isAllowedSite = false
    for (const url of allowedUrls) {
      if (siteUrl.startsWith(url)) {
        isAllowedSite = true
        break
      }
    }

    if (isAllowedSite) {
      const allowedFrame = siteUrl.includes('editor_form.jsp')
      if (allowedFrame) {
        const el = document.createElement('div')
        document.body.prepend(el)
        new Vue({ // eslint-disable-line no-new
          el: el,
          render: h => h(content)
        })
      }
    }
  }
}).catch(function (err) {
  console.log(err)
})

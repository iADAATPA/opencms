import Vue from 'vue'
import content from './content.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.config.productionTip = false
Vue.use(ElementUI)

const el = document.createElement('div')
document.body.appendChild(el)

new Vue({ // eslint-disable-line no-new
  el: el,
  render: h => h(content)
})

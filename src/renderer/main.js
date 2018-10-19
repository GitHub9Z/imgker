import Vue from 'vue'
import axios from 'axios'

import App from './App'
import router from './router'
import store from './store'
import toastRegistry from './components/GkViews/GkToast/index'

// 这里也可以直接执行 toastRegistry()
Vue.use(toastRegistry)

// const Env = require('./config/env.js')
Vue.prototype.$axios = axios
axios.defaults.baseURL = 'http://47.94.197.84:3000/api/'

let smalltalk = require('smalltalk/legacy')
Vue.prototype.$smalltalk = smalltalk

let moment = require('moment')
Vue.prototype.$moment = moment

let outputfunc = function (log) {
  log.output = coder(log.output)
  // alert(log.output)
  // alert(coder(log.output))
  store.commit('OUT_PUT_STRING', log)
}
Vue.prototype.$log = outputfunc

let coder = function coder (str) {
  var s = ''
  if (str.length === 0) return ''
  for (var i = 0; i < str.length; i++) {
    switch (str.substr(i, 1)) {
      case '<':
        s += '&lt;'
        break
      case '>':
        s += '&gt;'
        break
      case '&':
        s += '&amp;'
        break
      case ' ':
        s += '&nbsp;'
        break
      case '\'':
        s += '&quot;'
        break
      case '\n':
        s += '<br>'
        break
      default:
        s += str.substr(i, 1)
        break
    }
  }
  return s
}

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  template: '<App/>'
}).$mount('#app')

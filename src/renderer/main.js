import Vue from 'vue'
import axios from 'axios'

import App from './App'
import router from './router'
import store from './store'

// const Env = require("./config/env.js")
Vue.prototype.$axios = axios
axios.defaults.baseURL = 'http://47.94.197.84:3000/api/'
let smalltalk = require('smalltalk/legacy')
Vue.prototype.$smalltalk = smalltalk

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

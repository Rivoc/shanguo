// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import '../static/css/custom.styl'
import '../static/css/animate.css'
import '../static/css/reset.css'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios'
// import './utils/http.js'
Vue.prototype.$http = axios.create({
  baseURL: 'http://localhost:3000/web/api'
})
// respone拦截器

Vue.prototype.$http.interceptors.response.use(

  response => {
    console.log('拦截了')
    Vue.prototype.$message.success(response.data.message)
    return response.data
  },

  error => { // 默认除了2XX之外的都是错误的，就会走这里
    return Promise.reject(error.response)
  }

)
Vue.use(ElementUI)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})

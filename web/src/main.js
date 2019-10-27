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
axios.defaults.withCredentials = true
Vue.prototype.$http = axios.create({
  baseURL: 'http://localhost:3000/web/api'
})
// respone拦截器

Vue.prototype.$http.interceptors.response.use(

  res => {
    switch (res.data.code) {
      case 200:
        if (res.data.message) {
          Vue.prototype.$message.success(res.data.message)
          console.log(res)
        }
        break
      case 201:
        Vue.prototype.$message.error(res.data.message)
        break
    }
    return res.data
  },

  err => { // 默认除了2XX之外的都是错误的，就会走这里
    console.log(err.response)
    if (err && err.response) {
      switch (err.response.status) {
        case 400:
          err.message = '错误请求'
          console.log('阿啊')
          break
        default:
      }
    }
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

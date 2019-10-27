import axios from 'axios'
import Vue from 'vue'
import router from '@/router/index'
// const http = axios.create({
//   baseURL: 'http://localhost:3000/web/api'
// })
// 响应拦截器
axios.interceptors.response.use(res => {
  // console.log('拦截了')
  // if (res.data.message) {
  //   Vue.prototype.$message.success(res.data.message)
  // }
  // return res.data
}, error => {
  console.log('阿啊')
  if (error && error.response) {
    switch (error.response.status) {
      case 400:
        error.message = '错误请求'
        console.log('阿啊')
        break
    }
  }
  return Promise.reject(error)
})

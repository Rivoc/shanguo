import axios from 'axios'
import Vue from 'vue'
import router from '@/router/index'
// const http = axios.create({
//   baseURL: 'http://localhost:3000/web/api'
// })
// 响应拦截器
axios.interceptors.response.use(res => {
  console.log('拦截了')
  if (res.data.message) {
    Vue.prototype.$message.success(res.data.message)
  }
  return res.data
}, (err) => {
  console.log(err.response.status)
  Vue.prototype.$message.error('错了')
  if (err.data.message) {
    Vue.prototype.$message.error(err.data.message)
  }
  // 约定返回401就跳回登录页
  if (err.response.status === 401) {
    router.push('/login')
  }
  return Promise.reject(err)
})

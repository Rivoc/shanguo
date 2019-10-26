import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import LoginReg from '@/components/LoginReg'
import Register from '@/components/Register'
import Main from '@/components/Main'
import Login from '@/components/Login'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Main',
      component: Main,
      redirect: '/home',
      children: [
        {
          path: '/home',
          name: 'Home',
          component: Home
        }
      ]

    },
    {
      path: '/loginReg',
      name: 'LoginReg',
      component: LoginReg,
      redirect: '/login',
      children: [
        {
          path: '/login',
          name: 'Login',
          component: Login
        },
        {
          path: '/register',
          name: 'Register',
          component: Register
        }
      ]
    }
  ]
})

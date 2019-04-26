import Vue from 'vue'
import Router from 'vue-router'
import SignIn from './views/SignIn'
import SignUp from './views/SignUp'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      redirect: 'sign_in'
    },
    {
      path: '/sign_in',
      name: 'sign_in',
      component: SignIn
    },
    {
      path: '/sign_up',
      name: 'sign_up',
      component: SignUp
    }
  ]
})

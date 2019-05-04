import Vue from 'vue'
import Router from 'vue-router'
import UserLogin from './views/User/Login'
import UserRegister from './views/User/Register'
import Teacher from './views/Teacher'
import Layout from './views/Layout'
// import Test from './components/Test'
// import QuestionBank from './components/Test'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      redirect: 'user/login'
    },
    {
      path: '/user/login',
      name: 'user-login',
      component: UserLogin
    },
    {
      path: '/user/register',
      name: 'register',
      component: UserRegister
    },
    {
      path: '/teacher',
      name: 'teacher',
      component: Teacher
    },
    {
      path: '/layout',
      name: 'layout',
      component: Layout
    }
    // {
    //     path: '/test',
    //     name: 'Test.vue',
    //     component: Test
    // }

  ]
})

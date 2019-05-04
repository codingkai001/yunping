import Vue from 'vue'
import Router from 'vue-router'
import SignIn from './views/SignIn'
import SignUp from './views/SignUp'
import Teacher from './views/Teacher'
// import Test from './components/Test'
// import QuestionBank from './components/Test'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      redirect: 'signin'
    },
    {
      path: '/signin',
      name: 'signin',
      component: SignIn
    },
    {
      path: '/signup',
      name: 'signup',
      component: SignUp
    },
    {
      path: '/teacher',
      name: 'teacher',
      component: Teacher
    }
    // {
    //     path: '/test',
    //     name: 'Test.vue',
    //     component: Test
    // }

  ]
})

import Vue from 'vue'
import Router from 'vue-router'
import UserLogin from './views/User/Login'
import UserRegister from './views/User/Register'
import ClassList from './views/Class/List'
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
    { path: '/user/login', name: 'user-login', component: UserLogin },
    { path: '/user/register', name: 'user-register', component: UserRegister },
    { path: '/class/list', name: 'class-list', component: ClassList }
  ]
})

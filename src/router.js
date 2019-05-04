import Vue from 'vue'
import Router from 'vue-router'
import UserLogin from './views/User/Login'
import UserRegister from './views/User/Register'
import ClassList from './views/Class/List'
import DimensionList from './views/Dimension/List'
import DimensionEdit from './views/Dimension/Edit'
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
      redirect: 'user/login'
    },
    { path: '/user/login', name: 'user-login', component: UserLogin },
    { path: '/user/register', name: 'user-register', component: UserRegister },
    { path: '/class/list', name: 'class-list', component: ClassList },
    { path: '/teacher', name: 'aaa', component: Teacher },

    { path: '/dimension/list', name: 'dimension-list', component: DimensionList },
    { path: '/dimension/edit/:id', name: 'dimension-edit', component: DimensionEdit }
  ]
})

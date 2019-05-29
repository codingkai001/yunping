import Vue from 'vue'
import Router from 'vue-router'
import UserStorage from './store/user'
import UserLogin from './views/User/Login'
import UserRegister from './views/User/Register'
import ClassList from './views/Class/List'
import ClassDetail from './views/Class/Detail'
import ClassAnalysis from './views/Class/Detail/Analysis'
import DimensionList from './views/Dimension/List'
import DimensionEdit from './views/Dimension/Edit'
import HomeworkList from './views/Homework/List'
import HomeworkEdit from './views/Homework/Edit'
import { UserRole } from './models/User'
import TeamList from './views/Team/List'

Vue.use(Router)

const login = (param) => {
  const oldBeforeEnter = param.beforeEnter
  param.beforeEnter = (to, from, next) => {
    if (UserStorage.state.token !== '') {
      if (oldBeforeEnter) {
        return oldBeforeEnter(to, from, next)
      }
      return next()
    } else {
      return next('/user/login')
    }
  }
  return param
}

const studentRoute = (param) => {
  const oldBeforeEnter = param.beforeEnter
  param.beforeEnter = (to, from, next) => {
    if (UserStorage.state.user.userRole === UserRole.student) {
      if (oldBeforeEnter) {
        return oldBeforeEnter(to, from, next)
      }
      return next()
    } else {
      return next(false)
    }
  }
  return param
}

const teacherRoute = (param) => {
  const oldBeforeEnter = param.beforeEnter
  param.beforeEnter = (to, from, next) => {
    if (UserStorage.state.user.userRole === UserRole.teacher) {
      if (oldBeforeEnter) {
        return oldBeforeEnter(to, from, next)
      }
      return next()
    } else {
      return next(false)
    }
  }
  return param
}

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      beforeEnter: (to, from, next) => {
        if (UserStorage.state.token === '') {
          next('/user/login')
        } else {
          next('/class/list')
        }
      }
    },
    { path: '/user/login', name: 'user-login', component: UserLogin },
    { path: '/user/register', name: 'user-register', component: UserRegister },
    login({ path: '/class/list', name: 'class-list', component: ClassList }),
    login({ path: '/class/detail/:id', name: 'class-detail', component: ClassDetail }),
    login({path: '/class/analysis/:id', name: 'class-analysis', component: ClassAnalysis}),

    teacherRoute(login({ path: '/dimension/list', name: 'dimension-list', component: DimensionList })),
    teacherRoute(login({ path: '/dimension/edit/:id', name: 'dimension-edit', component: DimensionEdit })),
    teacherRoute(login({ path: '/homework/list', name: 'homework-list', component: HomeworkList })),
    teacherRoute(login({ path: '/homework/edit/:id', name: 'homework-edit', component: HomeworkEdit })),
    studentRoute(login({ path: '/team/list', name: 'team-list', component: TeamList }))
  ]
})

import { instance, post } from './base'

export const login = (data) => instance({ url: '/user/login', method: 'POST', data }).then(res => {
  return {
    token: res.headers['s-token'],
    user: res.data.data
  }
})
export const register = (params) => post('/user/register', params)

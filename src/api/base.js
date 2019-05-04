import axios from 'axios'
import UserStore from '../store/user'

export const apiUrl = '/api/'
export const instance = axios.create({
  baseURL: apiUrl,
  withCredentials: true
})

export function request (config) {
  const headers = config.headers ? config.headers : {}
  return instance({
    ...config,
    headers: {
      ...headers,
      'S-TOKEN': UserStore.state.token
    }
  }).then((res) => {
    if (res.data.status !== 0) {
      throw new APIError(res.data)
    }
    return res.data.data
  }).catch((e) => {
    if (e.response) {
      throw new APIError(e.response.data)
    }
    throw e
  })
}

export class APIError extends Error {
    json = {}
    constructor (json) {
      super(JSON.stringify(json))
      this.json = json
    }
}

export const get = (url, config = {}) => request({ method: 'GET', url, ...config })
export const head = (url, config = {}) => request({ method: 'HEAD', url, ...config })
export const del = (url, config = {}) => request({ method: 'DELETE', url, ...config })
export const post = (url, data = {}, config = {}) => request({ method: 'POST', url, data, ...config })
export const put = (url, data = {}, config = {}) => request({ method: 'PUT', url, data, ...config })

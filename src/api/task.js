import { post, get } from './base'
import { TaskAddDTO } from '../models/Task'

export const taskSearch = () => get('/task/search')
export const taskAdd = (params = TaskAddDTO) => post('/task/add', params)
export const taskAuth = (form) => post('/task/auth', form)
export const taskUpdate = (form) => post('/task/update', form)
export const taskDetail = (taskId = '', pageNum = 1, pageSize = 0) => post('/task/detail', { taskId, pageNum, pageSize })
export const taskList = () => get('/task/list')
export const taskDelete = (taskId) => get('/task/delete?taskId=' + taskId)
export const taskStatus = (taskId) => get('/task/status?taskId=' + taskId)

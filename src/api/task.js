import { post } from './base'
import { TaskAddDTO } from '../models/Task'

export const taskSearch = (taskName = '', pageNum = 1, pageSize = 9) => post('/task/search', { taskName, pageNum, pageSize })
export const taskAdd = (params = TaskAddDTO) => post('/task/add', params)
export const taskAuth = (form) => post('/task/auth', form)
export const taskUpdate = (form) => post('/task/update', form)
export const taskDetail = (taskId = '', pageNum = 1, pageSize = 0) => post('/task/detail', { taskId, pageNum, pageSize })

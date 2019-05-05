import { post } from './base'
import { ClassUpdateDTO } from '../models/Class'

export const classSearch = (className = '', pageNum = 1, pageSize = 9) => post('/class/search', { className, pageNum, pageSize })
export const classAdd = (className) => post('/class/add', { className })
export const classAuth = (form) => post('/class/auth', form)
export const classUpdate = (form = ClassUpdateDTO) => post('/class/update', form)
export const classDetail = (classId = '', pageNum = 1, pageSize = 0) => post('/class/detail', { classId, pageNum, pageSize })

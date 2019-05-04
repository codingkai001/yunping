import { post } from './base'

export const classSearch = (className = '', pageNum = 1, pageSize = 9) => post('/class/search', { className, pageNum, pageSize })
export const classAdd = (className) => post('/class/add', { className })

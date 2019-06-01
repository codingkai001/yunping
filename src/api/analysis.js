// eslint-disable-next-line no-unused-vars
import { get, post } from './base'
// eslint-disable-next-line no-unused-vars
import { ClassUpdateDTO } from '../models/Class'

export const analysisClassTotal = (classId) => get('/analysis/class/total?classId=' + classId)
export const analysisSkillSum = (taskId) => get('/analysis/skill/sum?taskId=' + taskId)
export const analysisTaskTotal = (taskId) => get('/analysis/task/total?taskId=' + taskId)
export const analysisTaskSum = (taskId) => get('/analysis/task/sum?taskId=' + taskId)

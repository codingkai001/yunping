import { get, post } from './base'
import { ClassUpdateDTO } from '../models/Class'

export const analysisClassTotal = (classId) => get('/analysis/class/total?classId='+classId)
export const analysisSkillSum = (taskId) => get('/analysis/skill/sum?taskId='+taskId)



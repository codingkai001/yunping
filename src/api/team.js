import { get, post } from './base'
//import { ClassUpdateDTO } from '../models/Class'
//import { ClassUpdateDTO } from '../models/Class'

export const teamJoin = (teamName) => get('/team/join?teamToken=' + teamName)
export const teamAdd = (teamName, teamLimit, teamType) => post('/team/add?teamName=' + teamName + '&teamLimit=' + teamLimit + '&teamType=' + teamType)
export const teamDetail = () => get('/team/detail', '')
export const teamUpdate = (teamId, teamName, teamLimit, teamType, teamEdit, teamCaptain) => post('/team/update?teamId=' + teamId + '&teamName=' + teamName + '&teamLimit=' + teamLimit + '&teamType=' + teamType + '&teamEdit=' + teamEdit + '&teamCaptain=' + teamCaptain)
export const teamExit = () => get('/team/exit', '')

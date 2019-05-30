import { get, post } from './base'
// import { ClassUpdateDTO } from '../models/Class'
// import { ClassUpdateDTO } from '../models/Class'

export const teamJoin = (teamName) => get('/team/join?teamToken=' + teamName)
export const teamAdd = (teamName, teamLimit, teamType) => post('/team/add?teamName=' + teamName + '&teamLimit=' + teamLimit + '&teamType=' + teamType)
export const teamDetail = () => get('/team/detail', '')
export const teamUpdate = (team) => post('/team/update', team)
export const teamExit = () => get('/team/exit', '')
export const teamClear = (teamId) => get('/team/clear?teamId=' + teamId)
export const teamSearch = (classId) => get('/team/search?classId=' + classId)

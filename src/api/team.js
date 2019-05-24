import { get, post } from './base'
//import { ClassUpdateDTO } from '../models/Class'

export const teamJoin = (teamName) => get('/team/join?teamToken=' + teamName)
export const teamAdd = (teamName, teamLimit, teamType) => post('/team/add?teamName=' + teamName + '&teamLimit=' + teamLimit + '&teamType=' + teamType)
export const teamDetail = () => get('/team/detail', '')

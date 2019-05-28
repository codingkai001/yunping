import { get, post } from './base'
import { Dimension } from '../models/Dimension'

export const dimensionSearch = (dimension = Dimension, pageNum = 1, pageSize = 9) => post('/skill/search', {
  ...dimension,
  pageNum,
  pageSize
})
export const dimensionAdd = (dimension = Dimension) => post('/skill/add', dimension)
export const dimensionUpdate = (dimension = Dimension) => post('/skill/update', dimension)
export const dimensionDetail = (id) => get('/skill/detail?skillId=' + encodeURIComponent(id))
export const dimensionDelete = (id) => get('/skill/delete?skillId=' + encodeURIComponent(id))

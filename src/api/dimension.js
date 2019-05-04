import { post } from './base'
import { Dimension } from '../models/Dimension'

export const dimensionSearch = (dimension = Dimension, pageNum = 1, pageSize = 9) => post('/skill/search', {
  ...dimension,
  pageNum,
  pageSize
})
export const dimensionAdd = (dimension = Dimension) => post('/skill/add', dimension)

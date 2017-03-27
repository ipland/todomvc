import { createReducer } from '../../lib/utils'
import {
  SET_VISIBILITY_FILTER
} from './constants'

const initialState = 'all'
export default createReducer(initialState, {
  [SET_VISIBILITY_FILTER]: (state, payload) => payload.filter
})

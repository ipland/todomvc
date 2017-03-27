import { combineReducers } from 'redux'
import todos from '../containers/todo/reducer'
import visibilityFilter from '../containers/visibilityFilter/reducer'

export default combineReducers({
  todos,
  visibilityFilter
})
import { createReducer } from '../../lib/utils'
import {
  INIT_STATE, RESET_STATE,
  ADD_TODO, TOGGLE_TODO, REMOVE_TODO
} from './constants'

function newTodo(state, payload) {
  return {
    id: payload.id,
    text: payload.text,
    completed: false
  }
}

function toggleTodo(state, payload) {
  if (state.id !== payload.id) {
    return state
  }

  return Object.assign({}, state, { completed: !state.completed })
}

const initialState = []
export default createReducer(initialState, {
  [ADD_TODO]: (state, payload) => ( state.concat(newTodo(undefined, payload)) ),
  [TOGGLE_TODO]: (state, payload) => ( state.map(t => toggleTodo(t, payload)) ),
  [REMOVE_TODO]: (state, payload) => ( state.filter( t=> t.id !== payload.id) ),
  [RESET_STATE]: (state, payload) => payload
})

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

function addTodo(state, payload) {
  let index = Math.random() * state.length | 0
  return [].concat(state.slice(0, index), newTodo(undefined, payload), state.slice(index))
}

const initialState = []
export default createReducer(initialState, {
  [ADD_TODO]: (state, payload) => ( addTodo(state, payload) ),
  [TOGGLE_TODO]: (state, payload) => ( state.map(t => toggleTodo(t, payload)) ),
  [REMOVE_TODO]: (state, payload) => ( state.filter( t=> t.id !== payload.id) ),
  [RESET_STATE]: (state, payload) => payload
})

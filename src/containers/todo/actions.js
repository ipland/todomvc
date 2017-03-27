import {
  INIT_STATE, RESET_STATE,
  ADD_TODO, TOGGLE_TODO, REMOVE_TODO
  // SHOW_ALL, SHOW_ACTIVE, SHOW_COMPLETED
} from './constants'

let nextTodoId = 0
export const addTodo = (text) => ({
  type: ADD_TODO,
  payload: {
    id: nextTodoId++,
    text
  }
})

export const toggleTodo = (id) => ({
  type: TOGGLE_TODO,
  payload: { id }
})

export const removeTodo = (id) => ({
  type: REMOVE_TODO,
  payload: { id }
})

export const resetState = (todos = []) => ({
  type: RESET_STATE,
  payload: { todos }
})
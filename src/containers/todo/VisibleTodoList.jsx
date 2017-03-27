import { connect } from 'react-redux'

import TodoList from './TodoList'
import { SHOW_ALL, SHOW_COMPLETED, SHOW_INCOMPLETED } from '../visibilityFilter/constants'
import { toggleTodo, removeTodo } from './actions'

const getVisibleTodos = (todos, filter) => {
  switch(filter) {
    case SHOW_ALL:
      return todos
    case SHOW_COMPLETED:
      return todos.filter(todos => todos.completed)
    case SHOW_INCOMPLETED:
      return todos.filter(todos => !todos.completed)
    default:
      throw new Error(`Unknown filter: ${filter}`)
  }
}

const mapStateToProps = (state, ownProps) => ({
  todos: getVisibleTodos(state.todos, ownProps.filter)
})

const mapStateToDispatch = (dispatch) => ({
  onTodoClick: (id) => { dispatch(toggleTodo(id)) },
  onTodoRemove: (id) => { dispatch(removeTodo(id)) }
})

const VisibleTodoList = connect(mapStateToProps, mapStateToDispatch)(TodoList)

export default VisibleTodoList

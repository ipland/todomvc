import React from 'react'
import { TransitionMotion, spring, presets } from 'react-motion'

import Todo from './Todo'

// actual animation-related logic
function getDefaultStyles(todos) {
  return todos.map(todo => (Object.assign({}, todo, { style: { height: 0, opacity: 1, x: 240 } })) )
}

function getStyles(todos) {
  return todos.map((todo, i) => (
    Object.assign({}, todo, {
      style: {
        height: spring(40, presets.gentle),
        opacity: spring(1, presets.gentle),
        x: spring(0, presets.gentle)
      }
    })
  ))
}

function willEnter() {
  return {
    height: 0,
    opacity: 1,
    x: 240
  }
}

function willLeave() {
  return {
    height: spring(0),
    opacity: spring(0),
    x: spring(240, {stiffness: 29, damping: 13 }),
  }
}

function transformTodos(todos) {
  return todos.map(todo => ({
    key: 't' + todo.id,
    data: todo
  }))
}

function transfromStyle({ x, ...rest }) {
  return Object.assign({}, rest, {
    WebkitTransform: `translate3d(${x}px,0,0)`,
    transform: `translate3d(${x}px,0,0)`
  })
}


function TodoList({ todos, onTodoClick, onTodoRemove }) {
  const transformedTodos = transformTodos(todos)

  return (
    <TransitionMotion
      defaultStyles={getDefaultStyles(transformedTodos)}
      styles={getStyles(transformedTodos)}
      willLeave={willLeave}
      willEnter={willEnter}>
      {
        styles => (
          <ol className="todo__list">
            {styles.map(({key, style, data: todo }) => (
                <Todo
                  onClick={() => onTodoClick(todo.id)}
                  onRemove={() => onTodoRemove(todo.id)}
                  key={key}
                  style={transfromStyle(style)}
                  {...todo}
                />
              )
            )}
          </ol>
        )
      }
    </TransitionMotion>
  )
}

export default TodoList

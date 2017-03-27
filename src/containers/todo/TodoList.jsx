import React, { Component } from 'react'
import { TransitionMotion, spring, presets } from 'react-motion'
import HeightReporter from 'react-height'

import Todo from './Todo'

// actual animation-related logic
function getDefaultStyles(todos) {
  return todos.map(todo => (Object.assign({}, todo,
    { style:
      {
        height: 0,
        opacity: 1,
        x: 100,
      }
    }))
  )
}

function getStyles(todos) {
  return todos.map((todo, i) => (
    Object.assign({}, todo, {
      style: {
        height: spring(todo.height, presets.gentle),
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
    x: 100
  }
}

function willLeave() {
  return {
    height: spring(0),
    opacity: spring(0),
    x: spring(100, {stiffness: 29, damping: 13 }),
  }
}

function transformTodos(todos) {
  return todos.map(todo => ({
    key: 't' + todo.id,
    height: todo.height,
    data: todo
  }))
}

function transfromStyle(style) {
  const _style = Object.assign({}, style, {
    WebkitTransform: `translate3d(${style.x}px,0,0)`,
    transform: `translate3d(${style.x}px,0,0)`
  })

  delete _style.x

  return _style
}

function onHeightReady(todo, height) {
  todo.height = height
  todo.ready = true
}

function notAllReady(todos) {
  return todos.every(todo => todo.ready !== true)
}

class TodoList extends Component {
  constructor(props) {
    super(props)

    this.state = { notAllReady: true }
  }

  onHeightReady(todo, height) {
    todo.height = height
    todo.ready = true

    //Call setState,  only once
    if(!this.notAllReady()) {
      this.setState({ notAllReady: false })
    }
  }

  notAllReady() {
    return this.props.todos.every(todo => todo.ready !== true)
  }

  componentWillMount() {
    this.setState({ notAllReady: true })
  }

  componentWillReceiveProps({ todos }) {
    // todos changes
    if (todos.length !== this.props.todos.length) {
      this.setState({ notAllReady: true })
    }
  }

  componentDidUpdate() {}

  render() {
    const { todos, onTodoClick, onTodoRemove } = this.props
    const transformedTodos = transformTodos(todos)

    let extraContent = null
    if (this.state.notAllReady && transformedTodos.length !== 0) {
      extraContent = transformedTodos.map(({key, data: todo}) => (
        <HeightReporter key={key} onHeightReady={(height) => this.onHeightReady(todo, height)}>
          <Todo {...todo} />
        </HeightReporter>
      ))
    }

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
              {extraContent}
            </ol>
          )
        }
      </TransitionMotion>
    )
  }
}

export default TodoList

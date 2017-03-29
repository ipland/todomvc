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
        x: 200,
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
    x: 200
  }
}

function willLeave() {
  return {
    height: spring(0),
    opacity: spring(0),
    x: spring(200, {stiffness: 29, damping: 13 }),
  }
}

function transformTodos(todos) {
  return todos.map(transformTodo)
}

function transformTodo(todo) {
  return Object.assign({}, {
    key: 't' + todo.id,
    height: null,
    data: todo
  })
}

function transfromStyle({ x, ...rest}) {
  return Object.assign({}, rest, {
    WebkitTransform: `translate3d(${x}px,0,0)`,
    transform: `translate3d(${x}px,0,0)`
  })
}

function notAllReady(todos) {
  return todos.every(todo => todo.ready !== true)
}

class TodoList extends Component {
  constructor(props) {
    super(props)

    this.state = {
      notAllReady: true,
      transformedTodos: transformTodos(props.todos) || []
    }
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
    return this.state.transformedTodos.every(todo => todo.ready !== true)
  }

  componentWillMount() {
    this.setState({ notAllReady: true })
  }

  componentWillReceiveProps({ todos }) {
    // Note:
    // 1) Make sure old todos keep style before getting
    // 2) Make sure new todos have the same structure

    let { transformedTodos, notAllReady } = this.state
    // Collect old transformedTodos ids
    const oldTransIds = transformedTodos.reduce((acc, todo) => (
      acc.concat(todo.data.id)
    ), [])
    // Statistic the number of old todos that new todos containe
    const oldLen = todos.filter(todo => oldTransIds.includes(todo.id)).length

    // all old
    // 1) just modify original todo data
    // 2) remove more than one todo(s), or may modify original todo data
    if (oldLen === todos.length) {
      transformedTodos = todos.reduce((acc, todo) => {
        if (oldTransIds.includes(todo.id)) {
          return acc.concat(
            Object.assign({}, transformedTodos.filter(_todo => _todo.data.id === todo.id)[0] , { data: todo })
          )
        }
      }, [])
    } else {
      // 1) partial old, partial new
      // 2) all new
      // 3) maybe modify old original todo data
      transformedTodos = todos.reduce((acc, todo) => {
        // Already in
        if (oldTransIds.includes(todo.id)) {
          return acc.concat(
            Object.assign({}, transformedTodos.filter(_todo => _todo.data.id === todo.id)[0], { data: todo })
          )
        } else {
          return acc.concat(transformTodo(todo))
        }
      }, [])

      // console.log('componentWillReceiveProps', transformedTodos)

      notAllReady = true
    }

    // console.log('componentWillReceiveProps', newLen, todos.length)

    this.setState({
      notAllReady: true,
      transformedTodos
    })
  }

  componentDidUpdate() {}

  render() {
    const { todos, onTodoClick, onTodoRemove } = this.props
    const { transformedTodos } = this.state

    console.log(transformedTodos)
    let extraContent = null
    if (this.state.notAllReady && transformedTodos.length !== 0) {
      extraContent = (
        <div style={{ height: 0, overflow: 'hidden'}}>
        {
          transformedTodos.map(({key, data: todo}, i) => (
            <HeightReporter key={key} onHeightReady={(height) => this.onHeightReady(transformedTodos[i], height)}>
              <Todo {...todo} />
            </HeightReporter>
          ))
        }
        </div>
      )
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

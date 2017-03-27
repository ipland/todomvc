import React from 'react'
import { connect } from 'react-redux'

import { addTodo } from './actions'

function AddTodo({ dispatch }) {
  let input

  function handleSubmit(event) {
    event.preventDefault()
    let value = input.value.trim()

    if (!value) {
      return
    }

    dispatch(addTodo(value))
    input.value = ''
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="todo__form"
    >
      <input className="todo__input" type="text" ref={node => { input = node }} autoComplete={false}/>
      <button className="todo__submit" type="submit">Add</button>
    </form>
  )
}

export default connect()(AddTodo)

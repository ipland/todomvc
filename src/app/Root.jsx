import React, { Component } from 'react'
import { createStore } from 'redux'
import { Provider } from 'react-redux'

import App from './App'
import configureStore from '../store/configureStore'


// const store = createStore(rootReducer, {
//   todos: [{ text: 'JavaScript', id: -1, completed: false }]
// })

const { store } = configureStore({
  todos: [
  { text: 'Python', id: -2, completed: false },
  { text: 'JavaScript', id: -1, completed: false }
  ]
})

function Root() {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  )
}

export default Root

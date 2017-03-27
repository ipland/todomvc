import React, { Component } from 'react'
import { Provider, connect } from 'react-redux'
import 'normalize.css'

import AddTodo from '../containers/todo/AddTodo'
import VisibleTodoList from '../containers/todo/VisibleTodoList'
import Footer from '../containers/footer/Footer'

import '../style/global.scss'
import '../style/layout.scss'

function App({ filter }) {
  return (
    <div className="app--center">
     <AddTodo />
     <VisibleTodoList filter={filter} />
     <Footer filter={filter}/>
    </div>
  )
}

const mapStateToProps = (state) => ({
  filter: state.visibilityFilter
})

export default connect(mapStateToProps, undefined)(App)

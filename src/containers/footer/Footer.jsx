import React from 'react'
import { connect} from 'react-redux'

import FilterLink from './FilterLink'
import { setVisibilityFilter } from '../visibilityFilter/actions'
import './style.scss'

function Footer({ setVisibilityFilter, filter }) {
  return (
    <div className="todo__filter-group">
      <FilterLink
        filter="all"
        isActive={filter === 'all'}
        onClick={() => setVisibilityFilter('all')}
        >All</FilterLink>{', '}
      <FilterLink
        filter="incompleted"
        isActive={filter === 'incompleted'}
        onClick={() => setVisibilityFilter('incompleted')}
        >Incompleted</FilterLink>{', '}
      <FilterLink
        filter="completed"
        isActive={filter === 'completed'}
        onClick={() => setVisibilityFilter('completed')}
        >Completed</FilterLink>
    </div>
  )
}

const mapDispatchToProps = (dispatch) => ({
  setVisibilityFilter: (filter) => {
    dispatch(setVisibilityFilter(filter))
  }
})

export default connect(undefined, mapDispatchToProps)(Footer)

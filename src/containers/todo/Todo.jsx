import React from 'react'
import 'font-awesome/css/font-awesome.css'

import './style.scss'

function Todo({ onClick, onRemove, text, completed, style }) {
  const cx = `todo__item${completed ? ' todo__item--completed' : ''}`
  const icon = completed ? 'check' : 'times'

  return (
    <li className={cx} style={style}>
      <div className="todo__item-wrapper">
        <a href="javascript:void(0);" onClick={onClick} className="todo__item-content">{text}</a>
        <a href="javascript:void(0);" onClick={onRemove} className="todo__icon todo__icon--remove">
          <i className={`fa fa-${icon}`} />
        </a>
      </div>
    </li>
  )
}

Todo.defaultProps = {
  onClick: () => {},
  onRemove: () => {},
  style: {}
}

export default Todo

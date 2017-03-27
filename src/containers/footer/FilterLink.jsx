import React from 'react'

function FilterLink({ onClick, filter, isActive, children }) {
  const cx = `todo__filter${isActive ? ' todo__filter--active' : ''}`
  return (
    <a
      href="javascript:void(0);" onClick={onClick}
      className={cx}
    >
      {children}
    </a>
  )
}

export default FilterLink

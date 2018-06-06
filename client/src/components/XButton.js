import React from 'react'

const XButton = (props) => {
  return (
    <button
      role='button'
      aria-label='Close'
      className={`XButton ${props.className}`}
      onClick={props.onClick}
    >
      ×
    </button>
  )
}

export default XButton

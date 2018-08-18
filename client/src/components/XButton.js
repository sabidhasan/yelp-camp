import React from 'react'

const XButton = (props) => {
  return (
    <button
      aria-label='Remove'
      className={`XButton ${props.className}`}
      onClick={props.onClick}
    >
      ×
    </button>
  )
}

export default XButton

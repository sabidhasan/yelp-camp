import React from 'react'

const XButton = (props) => {
  return (
    <button className={`XButton ${props.className}`} onClick={props.onClick}>×</button>
  )
}

export default XButton

import React from 'react'
import PropTypes from 'prop-types'

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

XButton.propTypes = {
  className: PropTypes.string,
  onClick: PropTypes.func
}

export default XButton

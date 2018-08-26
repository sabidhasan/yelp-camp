import React from 'react'
import PropTypes from 'prop-types'

const ReviewButton = (props) => {
  return (
    <button
      className='ReviewButton btn btn--large'
      aria-label='Write a Review'
      onClick={(event) => props.toggleReviewForm(event, true)}>
      <span
        className='ReviewButton__icon'
        role='img'
        aria-label='Review'
        aria-hidden='true'>
        ✏️
      </span>
      Write a Review
    </button>
  )
}

ReviewButton.propTypes = {
  toggleReviewForm: PropTypes.func.isRequired
}

export default ReviewButton

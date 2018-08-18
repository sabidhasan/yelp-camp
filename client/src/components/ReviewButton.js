import React from 'react'

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

export default ReviewButton

import React from 'react'

const ReviewButton = (props) => {
  return (
    <button
      className='ReviewButton btn btn--large'
      onClick={(event) => props.toggleReviewForm(event, true)}>
      <span className='ReviewButton__icon'>✏️</span> Write a Review
    </button>
  )
}

export default ReviewButton

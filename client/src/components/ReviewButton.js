import React from 'react'

const ReviewButton = (props) => {
  return (
    <button
      href='#'
      className='review-link'
      onClick={(event) => props.toggleReviewForm(event, true)}
    >Write a Review
    </button>
  )
}

export default ReviewButton

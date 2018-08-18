import React from 'react'
import PropTypes from 'prop-types'
import XButton from './XButton'
import RatingBar from './RatingBar'
import { formatDate } from '../helpers/helpers'

const Review = (props, context) => (
    <li className='Review'>
      <span className='Review__identity bold flex-center'>
        <img className='Review__image' src={props.photoURL} alt='User' />
        <span className='Review__author'>{props.displayName}</span>
      </span>
      <div className='Review__rating'>
        <RatingBar className='Review__rating-bar' rating={props.rating} small={true} />
        <span className='Review__time-stamp'>{formatDate(new Date(props.time))}</span>
      </div>
      {context.user && context.user.uid === props.uid ?
        <XButton className='Review__delete bold' onClick={() => props.deleteReview(props.id)} />
      : null}
      <span className='Review__text'>{props.text}</span>
    </li>
  )

Review.contextTypes = {
  user: PropTypes.object
};

export default Review;

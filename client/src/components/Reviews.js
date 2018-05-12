import React from 'react'
import RatingBar from './RatingBar'
import { formatDate } from '../helpers/helpers'
import PropTypes from 'prop-types'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

class Reviews extends React.Component {
  constructor(props) {
    super(props);
  }

  static contextTypes = {
    user: PropTypes.object,
  };

  render() {
    if (!this.props.comments || this.props.comments.length === 0) {
      return <h2 className='review__first'>Be the first to review this campground</h2>
    }

    const allComments = this.props.comments.map(val => {
      const showDeleteButton = this.context.user && this.context.user.uid === val.uid;
      return (
        <div className='review' key={val.id}>
          <span className='review__author'>
            <img src={val.photoURL} alt='' />
            <span className='review__author-name'>{val.displayName}</span>
          </span>
          <div className='review__rating rating'>
            <RatingBar rating={val.rating} />
            <span className='review__time'>{formatDate(new Date(val.time))}</span>
          </div>
          {showDeleteButton ?
            <a className='review__delete' onClick={() => this.props.deleteReview(val.id)}>X</a>
            : null
          }
          <span className='review__text'>{val.text}</span>
        </div>
      )
    })

    return (
      <ReactCSSTransitionGroup
          transitionName="review-delete"
          transitionEnterTimeout={300}
          transitionLeaveTimeout={300}
          className={'reviews-container'}
          component='div'
      >
      {allComments}
    </ReactCSSTransitionGroup>
  )
  }
}

export default Reviews

import React from 'react'
import PropTypes from 'prop-types'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import Review from './Review'

class Reviews extends React.Component {
  render() {
    if (!this.props.comments || !this.props.comments.length) {
      return (
        <ul className='Reviews'>
          <li><h2 className='Reviews__first'>Be the first to review this campground</h2></li>
        </ul>
      )
    }
    return (
      <ReactCSSTransitionGroup
        transitionName="Reviews-delete"
        transitionEnterTimeout={300}
        transitionLeaveTimeout={300}
        className={'Reviews'}
        component='ul'
        >
          {this.props.comments.map(val => (
            <Review
              key={val.id}
              id={val.id}
              photoURL={val.photoURL}
              displayName={val.displayName}
              rating={val.rating}
              time={val.time}
              deleteReview={this.props.deleteReview}
              text={val.text}
              uid={val.uid}
             />
          ))}
      </ReactCSSTransitionGroup>
    )
  }
}

Reviews.propTypes = {
  comments: PropTypes.array,
  deleteReview: PropTypes.func.isRequired
}

export default Reviews

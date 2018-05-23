import React from 'react'
import RatingBar from './RatingBar'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import Review from './Review'

class Reviews extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    if (!this.props.comments || !this.props.comments.length) {
      return (
        <div className='Reviews'>
          <h2 className='Reviews__first'>Be the first to review this campground</h2>
        </div>
      )
    } else {
      console.log(this.props.comments);
      return (
        <ReactCSSTransitionGroup
          transitionName="Reviews-delete"
          transitionEnterTimeout={300}
          transitionLeaveTimeout={300}
          className={'Reviews'}
          component='div'
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
}

export default Reviews

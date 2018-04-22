import React from 'react'
import RatingBar from './RatingBar'
import { formatDate } from '../helpers/helpers'

class Reviews extends React.Component {
  constructor(props) {
    super(props);
    // this.state = {comments: props.comments};
  }

  // componentWillReceiveProps(nextProps) {
  //   this.setState({comments: nextProps.comments});
  // }

  render() {
    if (!this.props.comments || this.props.comments.length === 0) {
      return <h2 className='review__first'>Be the first to review this campground</h2>
    }
    return this.props.comments.map(val => {
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
          <span className='review__text'>{val.text}</span>
        </div>
      )
    })
  }
}

export default Reviews

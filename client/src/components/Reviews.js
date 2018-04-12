import React from 'react'
import RatingBar from './RatingBar'

class Reviews extends React.Component {
  constructor(props) {
    super(props);
    this.state = {comments: props.comments};
  }

  componentWillReceiveProps(nextProps) {
    this.setState({comments: nextProps.comments});
  }

  render() {
    if (!this.state.comments || this.state.comments.length === 0) {
      return <h2 className='review__first'>Be the first to review this campground</h2>
    }
    return this.state.comments.map(val => {
      return (
        <div className='review' key={val.id}>
          <span className='review__author'>{val.author}</span>
          <div className='review__rating rating'>
            <RatingBar rating={val.rating} />
            <span className='review__time'>{val.time}</span>
          </div>
          <span className='review__text'>{val.text}</span>
        </div>
      )
    })
  }
}

export default Reviews

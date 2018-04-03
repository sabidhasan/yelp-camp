import React from 'react'
import RatingBar from './RatingBar'

class Reviews extends React.Component {
  constructor(props) {
    super(props);
    this.state = {reviews: props.reviews}
  }

  render() {
    return this.state.reviews.map(val => {
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

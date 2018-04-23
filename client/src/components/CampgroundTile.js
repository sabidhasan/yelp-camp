import React from 'react'
import RatingBar from './RatingBar'

const CampgroundTile = (props) => {
  return (
    <React.Fragment>
      <img src={props.image} alt="" />
      <a href={'campground/' + props.id}>
        <h2>{props.name}</h2>
      </a>
      <span className='region'>{props.region}, {props.province}</span>
      <div className='rating'>
        <RatingBar rating={props.rating} small={true} />
      </div>
      <span className='review-count'>
        {props.ratingCount ? `${props.ratingCount} Reviews` : 'No reviews yet' }
      </span>
    </React.Fragment>
  )
}

export default CampgroundTile

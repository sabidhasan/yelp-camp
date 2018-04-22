import React from 'react'
import RatingBar from './RatingBar'

const CampgroundTile = (props) => {
  return (
    <React.Fragment>
      <img src={props.image} alt="" />
      <a href={'campground/' + props.id}>
        <h2>{props.name}</h2>
      </a>
      <div className='review__rating rating'>
        <RatingBar rating={props.rating} />
      </div>
    </React.Fragment>
  )
}

export default CampgroundTile

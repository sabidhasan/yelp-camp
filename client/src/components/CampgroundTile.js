import React from 'react'
import RatingBar from './RatingBar'

const CampgroundTile = (props) => {
  return (
    <React.Fragment>
      <img className='CampgroundTile__img' src={props.image} alt="" />
      <a className='CampgroundTile__link' href={'campground/' + props.id}>
        <h2 className='CampgroundTile__name bold'>{props.name}</h2>
      </a>
      <span className='CampgroundTile__region'>{[props.region, props.province].filter(a=>!!a).join(', ')}</span>
      <RatingBar rating={props.rating} small={true} />
      <span className='CampgroundTile__review-count'>
        {props.ratingCount ? `${props.ratingCount} Reviews` : 'No reviews yet' }
      </span>
    </React.Fragment>
  )
}

export default CampgroundTile

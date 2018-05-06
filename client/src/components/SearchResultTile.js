import React from 'react'
import RatingBar from './RatingBar'

const SearchResultTile = (props) => {
  return (
    <React.Fragment>
      <a href={`/campground/${props.id}`}><h1>{`${props.number}. ${props.name}`}</h1></a>
      <h2>{props.regionAndProvince}</h2>
      <p className='address'>{props.address}</p>
      <p className='distance'>{props.distance ? `${props.distance} km away` : null} </p>
      <p className='description'>{props.description}</p>
      <img src={props.images ? props.images[0] : null} alt='' />

      <div className='rating'>
        <RatingBar rating={props.rating} small={true} />
        <h2>{props.comments ? props.comments.length : 0} Reviews</h2>
      </div>
    </React.Fragment>
  )
}

export default SearchResultTile

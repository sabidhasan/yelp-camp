import React from 'react'

const CampgroundTile = (props) => {
  return (
    <span>
      <img src={props.image} alt="" />
      <h2>{props.name}</h2>
      <a href={'campground/' + props.id}>More Info</a>
    </span>
  )
}

export default CampgroundTile

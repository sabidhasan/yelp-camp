import React from 'react'

const Campground = (props) => {
  return (
    <span>
      <img src={props.image} alt="" />
      <h2>{props.name}</h2>
      <a href="#">More Info</a>
    </span>
  )
}

export default Campground

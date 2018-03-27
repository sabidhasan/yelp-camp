import React from 'react'

const Campground = (props) => {
  return (
    <span>
      <img src="" alt="">{props.img}</img>
      <h2>{props.name}</h2>
      <a href="#">More Info</a>
    </span>
  )
}

export default Campground

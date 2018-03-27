import React from 'react'

const Campground = (props) => {
  return (
    <li key={props.id}>
      <img>{props.img}</img>
      <h2>{props.name}</h2>
      <a href="#">More Info</a>
    </li>
  )
}

export default Campground

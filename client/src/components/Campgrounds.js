import React from 'react'

import Campground from './Campground'

class Campgrounds extends React.Component {
  render() {
    return (
      <ul className="highlightedCampgrounds">
        <h1>
          <span>Some Awesome Campgrounds</span>
          <span onClick={() => this.props.newRandoms()}>🔃</span>
        </h1>
        {this.props.campgrounds.map(val => {
          return (
            <li key={val.id}>
              <Campground name={val.name} image={val.image}/>
            </li>
          )})
        }
      </ul>
    )
  }
}

export default Campgrounds

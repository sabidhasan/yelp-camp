import React from 'react'

import Campground from './Campground'

class Campgrounds extends React.Component {
  // constructor(props) {
  //   super(props);
  // }

  render() {
    return (
      <ul className="highlightedCampgrounds">
        <h1></h1>
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

import React from 'react'

import Campground from './Campground'

class Campgrounds extends React.Component {
  // constructor(props) {
  //   super(props);
  // }

  render() {
    return (
      <div>
        <ul>
          {this.props.campgrounds.map(val => {
            return (
              <li key={val.id}>
                <Campground name={val.name} image={val.image}/>
              </li>
            )})
          }
        </ul>
      </div>
    )
  }
}

export default Campgrounds

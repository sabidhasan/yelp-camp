import React from 'react'

import Campground from './Campground'

class Campgrounds extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <ul>
          {this.props.campgrounds.map(val => {
            return <Campground name={val.name} image={val.image} id={val.id}/>
            })
          }
        </ul>
      </div>
    )
  }
}

export default Campgrounds

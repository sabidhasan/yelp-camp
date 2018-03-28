import React from 'react'

class Banner extends React.Component {
  render(props) {
    return (
      <div className="banner">
        <h1>Welcome to YelpCamp!</h1>
        <h2>View our hand picked campgrounds from all over the country!</h2>
        <button className="addCampground">Add Campground</button>
      </div>
    )
  }
}

export default Banner

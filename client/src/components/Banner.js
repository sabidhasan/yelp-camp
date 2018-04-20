import React from 'react'
import SearchBar from './SearchBar'

class Banner extends React.Component {

  componentDidMount() {
    // fetch('/randomCampground')
    //   .then(res => res.json())
    //   .then(campground => {
    //     console.log(document.styleSheets[0]);
    //   })
    }

  render(props) {
    return (
      <div className="banner">
        <div className="title">
          <h1>Welcome to YelpCamp!</h1>
          <h2>Search for campgrounds ⛺ across Canada 🍁</h2>
        </div>
        <SearchBar />
        <span>
          { this.props.quote }
        </span>
        <i className="fas fa-chevron-down down-arrow"></i>
        {/* 2px solid #e6e6e6 */}
      </div>
    )
  }
}

export default Banner

import React from 'react'
import SearchBar from './SearchBar'

class Banner extends React.Component {
  render(props) {
    return (
      <div className="banner">
        <div className="title">
          <h1>Welcome to YelpCamp!</h1>
          <h2>Search for campgrounds ⛺ across Canada 🍁</h2>
        </div>
        <SearchBar />
        <caption>
          This is the photo caption.
        </caption>
      </div>
    )
  }
}

export default Banner

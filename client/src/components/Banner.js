import React from 'react'
import SearchBar from './SearchBar'

class Banner extends React.Component {
  constructor(props) {
    super(props);
    this.state = {quote: undefined};
  }

  componentDidMount() {
    // Get quote
    fetch('/quote')
      .then(res => res.json())
      .then(quote => this.setState({quote: quote[0]}));
  }

  render(props) {
    return (
      <div className="banner">
        <div className="title">
          <h1>Welcome to YelpCamp!</h1>
          <h2>Search for campgrounds across Canada</h2>
        </div>
        <SearchBar />
        <span>
          { this.state.quote }
        </span>
        <i className="fas fa-chevron-down down-arrow"></i>
      </div>
    )
  }
}

export default Banner

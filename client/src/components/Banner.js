import React from 'react'
import PropTypes from 'prop-types'
import SearchBar from './SearchBar'

class Banner extends React.Component {
  constructor(props) {
    super(props);
    this.state = {quote: undefined};
  }

  static contextTypes = {
    startLoad: PropTypes.func,
    finishLoad: PropTypes.func
  }

  componentDidMount() {
    // Get quote
    this.context.startLoad();
    fetch('/quote')
      .then(res => res.json())
      .then(quote => this.setState({quote: quote[0]}, () => this.context.finishLoad()));
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

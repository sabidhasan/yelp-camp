import React from 'react'
import PropTypes from 'prop-types'
import SearchBar from './SearchBar'
import backgroundImage from '../images/test.jpg';
import logo from '../images/logo.png'

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
      <div className="Banner">
        <div className='Banner__image'>
          <img src={backgroundImage} />
        </div>
        <div className='Banner__content'>
          <div className="Banner__title">
            <h1>
              YelpCamp
              <img className='Banner__logo' src={logo} alt='Logo for YelpCamp' />
            </h1>
            <h2>Search for campgrounds across Canada</h2>
          </div>
          <SearchBar />
          <span className='Banner__quote bold'>
            { this.state.quote }
          </span>
          <i className="fas fa-chevron-down Banner__chevron"></i>
        </div>
      </div>
    )
  }
}

export default Banner

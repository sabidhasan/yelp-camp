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
    // this.context.startLoad(this.constructor.name);
    // this.setState({quote: 'this is some uote'});
    // this.context.finishLoad(this.constructor.name);
    fetch('/quote')
      .then(res => res.json())
      .then(quote => this.setState({quote: quote[0]}));
      // .then(quote => this.setState({quote: quote[0]}, () => this.context.finishLoad(this.constructor.name)));
  }

  render(props) {
    return (
      <div className="Banner">
        <div className='Banner__image-container'>
          <img src={backgroundImage} className='Banner__image' />
        </div>
        <div className='Banner__content'>
          <div className="Banner__title-container">
            <h1 className='Banner__title'>
              YelpCamp
              <img className='Banner__logo' src={logo} alt='Logo for YelpCamp' />
            </h1>
            <h2 className='Banner__subtitle'>Search for campgrounds across Canada</h2>
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

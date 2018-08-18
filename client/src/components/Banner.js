import React from 'react'
import { Route } from 'react-router-dom'
import PropTypes from 'prop-types'
import SearchBar from './SearchBar'
import logo from '../images/logo.png'

// import image1 from '../images/splash1.jpg';
import bg1s from '../images/splash1.800.jpg';
import bg1m from '../images/splash1.1200.jpg';
import bg1l from '../images/splash1.jpg';
import bg2s from '../images/splash2.800.jpg';
import bg2m from '../images/splash2.1200.jpg';
import bg2l from '../images/splash2.jpg';
import bg3s from '../images/splash3.800.jpg';
import bg3m from '../images/splash3.1200.jpg';
import bg3l from '../images/splash3.jpg';
import bg4s from '../images/splash4.800.jpg';
import bg4m from '../images/splash4.1200.jpg';
import bg4l from '../images/splash4.jpg';
import bg5s from '../images/splash5.800.jpg';
import bg5m from '../images/splash5.1200.jpg';
import bg5l from '../images/splash5.jpg';


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
      <div className="Banner" role='banner'>
        <div className='Banner__image-container'>
          <img srcSet={`${bg1s} 800w, ${bg1m} 1200w, ${bg1l}`} src={bg1l} className='Banner__image' alt=''/>
          <img srcSet={`${bg2s} 800w, ${bg2m} 1200w, ${bg2l}`} src={bg2l} className='Banner__image' alt=''/>
          <img srcSet={`${bg3s} 800w, ${bg3m} 1200w, ${bg3l}`} src={bg3l} className='Banner__image' alt=''/>
          <img srcSet={`${bg4s} 800w, ${bg4m} 1200w, ${bg4l}`} src={bg4l} className='Banner__image' alt=''/>
          <img srcSet={`${bg5s} 800w, ${bg5m} 1200w, ${bg5l}`} src={bg5l} className='Banner__image' alt=''/>
        </div>
        <div className='Banner__content'>
          <div className="Banner__title-container">
            <h1 className='Banner__title'>
              YelpCamp
              <img className='Banner__logo' src={logo} alt='YelpCamp' />
            </h1>
            <h2 className='Banner__subtitle'>Search for campgrounds across Canada</h2>
          </div>
          <Route
            path="/"
            render={(props) => <SearchBar {...props} />}
          />
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

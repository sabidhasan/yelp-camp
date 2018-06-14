import React from 'react'
import { Route } from 'react-router-dom'
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
      <div className="Banner" role='banner'>
        <div className='Banner__image-container'>
          <img src={backgroundImage} className='Banner__image' alt=''/>
          <img src='https://images.pexels.com/photos/1061640/pexels-photo-1061640.jpeg' className='Banner__image' alt=''/>
          <img src='https://images.pexels.com/photos/965153/pexels-photo-965153.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940' className='Banner__image' alt=''/>
          <img src='https://images.pexels.com/photos/213807/pexels-photo-213807.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940' className='Banner__image' alt=''/>
          <img src='https://images.pexels.com/photos/93858/pexels-photo-93858.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940' className='Banner__image' alt=''/>
          <img src='https://images.pexels.com/photos/730426/pexels-photo-730426.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940' className='Banner__image' alt=''/>
        </div>
        <div className='Banner__content'>
          <div className="Banner__title-container">
            <h1 className='Banner__title'>
              YelpCamp
              <img className='Banner__logo' src={logo} alt='Logo for YelpCamp' />
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

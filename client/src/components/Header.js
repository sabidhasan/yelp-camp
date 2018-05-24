import React from 'react'
import PropTypes from 'prop-types';

import withStickyBar from './withStickyBar'

class Header extends React.Component {
  constructor(props) {
    super(props);
  }

  static contextTypes = {
    user: PropTypes.object,
    signOut: PropTypes.func,
    stickyClass: PropTypes.string
  };

  render() {
    return (
      <nav className={`${this.context.stickyClass} Header`}>
        <a className='Header__title Header__link' href='/'>YelpCamp</a>
        <a className='Header__discover-icon Header__link btn bold btn--flat' href='/discover'>
          <i className="fas fa-map"></i>Discover
        </a>
        {this.context.user && !this.context.user.loading ?
          <button className='btn bold btn--flat Header__login' onClick={this.context.signOut}>
            <img className='Header__user-image' src={this.context.user.providerData[0].photoURL} />
            Log Out
          </button>
        : <button className='Header__login btn bold btn--flat' onClick={this.props.toggleLoginForm}>Sign In</button>
        }
        <button onClick={this.props.toggleCart} className='Header__cart-icon bold btn btn--flat'>
          <i className="fas fa-shopping-cart"></i>Cart
        </button>
      </nav>
    )
  }
}


export default withStickyBar(Header)

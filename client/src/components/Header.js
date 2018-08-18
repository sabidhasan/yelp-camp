import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types';

import withStickyBar from './withStickyBar'

class Header extends React.Component {
  static contextTypes = {
    user: PropTypes.object,
    signOut: PropTypes.func,
    stickyClass: PropTypes.string
  };

  render() {
    return (
      <nav className={`${this.context.stickyClass} Header`}>
        <Link className='Header__title Header__link' to='/'>
          YelpCamp
        </Link>
        <Link className='Header__discover-icon Header__link btn bold btn--flat' to='/discover'>
          <i className="fas fa-map"></i>Discover
        </Link>
        {this.context.user && !this.context.user.loading ?
          <button className='btn bold btn--flat Header__login' onClick={this.context.signOut}>
            <img
              className='Header__user-image'
              alt=''
              aria-hidden='true'
              src={this.context.user.providerData[0].photoURL}
            />
            Log Out
          </button>
        : <button className='Header__login btn bold btn--flat' onClick={this.props.toggleLoginForm}>Sign In</button>
        }
        <button
          aria-label='View shopping cart'
          onClick={this.props.toggleCart}
          className='Header__cart-icon bold btn btn--flat'
        >
          <i className="fas fa-shopping-cart"></i>Cart
        </button>
      </nav>
    )
  }
}


export default withStickyBar(Header)

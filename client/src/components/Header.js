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
        <a className='Header__title' href='/'>YelpCamp</a>
        <a className='btn btn--flat' href='/discover'>
          <i class="fas fa-map"></i>Discover
        </a>
        {this.context.user && !this.context.user.loading ?
          <a href='#' className='btn btn--flat' onClick={this.context.signOut}>
            <img className='Header__user-image' src={this.context.user.providerData[0].photoURL} />
            Log Out
          </a>
        : <a href='#' className='Header__login btn btn--flat' onClick={this.props.toggleLoginForm}>Sign In</a>
        }
        <a href='#' onClick={this.props.toggleCart} className='Header__cart-icon btn btn--flat'>
          <i className="fas fa-shopping-cart"></i>Cart
        </a>
      </nav>
    )
  }
}


export default withStickyBar(Header)

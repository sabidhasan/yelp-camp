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
      <nav className={this.context.stickyClass}>
        <a className='nav__title' href='/'>YelpCamp</a>
        <a href='/discover'>Discover</a>
        {this.context.user && this.context.user.loading ?
          <div className="lds-spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
          : this.context.user ?
          <a href='#' onClick={this.context.signOut}>
            <img className='nav__user-image' src={this.context.user.providerData[0].photoURL} />
            Log Out
          </a>
        :
          <a href='#' className='login' onClick={this.props.toggleLoginForm}>Sign In</a>
        }
        <a href='#' onClick={this.props.toggleCart}><i className="fas fa-shopping-cart"></i>Cart</a>
      </nav>
    )
  }
}


export default withStickyBar(Header)

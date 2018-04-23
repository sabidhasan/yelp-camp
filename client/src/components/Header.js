import React from 'react'
import PropTypes from 'prop-types';

class Header extends React.Component {
  constructor(props) {
    super(props);
  }

  static contextTypes = {
    user: PropTypes.object,
    signOut: PropTypes.func
  };

  render() {
    // console.log(props);
    return (
      <nav>
        <a className='nav__title' href='/'>YelpCamp</a>
        <a href='#'>Discover</a>
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
        <a href='#' onClick={this.props.toggleCart}><i className="fas fa-shopping-cart nav__cart-icon"></i>Cart</a>
      </nav>
    )
  }
}


export default Header

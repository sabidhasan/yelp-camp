import React from 'react'

class Header extends React.Component {
  render(props) {
    return (
      <header>
        <span className="title">YelpCamp</span>
        <a href="#" className="discover">Discover</a>
        <a href="#" className="Login">Login</a>
        <a href="#" className="Sign Up">Sign Up</a>
      </header>
    )
  }
}

export default Header

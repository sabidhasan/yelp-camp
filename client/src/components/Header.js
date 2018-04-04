import React from 'react'

class Header extends React.Component {
  render(props) {
    return (
      <nav>
        <a className='title' href='/'>YelpCamp</a>
        <a href='#' className='discover'>Discover</a>
        <a href='#' className='Login'>Login</a>
        <a href='#' className='Sign Up'>Sign Up</a>
      </nav>
    )
  }
}

export default Header

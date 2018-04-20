import React from 'react'
// import { auth } from '../firebase'

class Header extends React.Component {
  constructor() {
    super();
    // this.login = this.login.bind(this);
  }

  // login(e) {
  //   e.preventDefault();
  //   auth.doSignInWithEmailAndPassword();
  // }

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

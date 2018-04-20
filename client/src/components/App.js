import React from 'react';
import { Switch, Route } from 'react-router-dom'
import Header from './Header'
import Banner from './Banner'
import Campgrounds from './Campgrounds'
import Footer from './Footer'
import SingleCampground from './SingleCampground'
import LandingText from './LandingText'
import LoginForm from './LoginForm'

import { signInFunc, signOutFunc, auth } from '../firebase/firebase'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showLogin: true
    }
    // this.signUp = this.signUp.bind(this)
    // this.signIn = this.signIn.bind(this)
    // this.signOut = this.signOut.bind(this)
    this.toggleLoginForm = this.toggleLoginForm.bind(this)
  }

  toggleLoginForm() {
    const newLoginState = !this.state.showLogin
    this.setState({showLogin: newLoginState});
  }

  signOut() {
    // Sign out the user
    signOutFunc()
    .then(() => console.log('signed out'))
    .catch((err) => console.log('error occured'))
  }

  signIn() {
    signInFunc()
    .then(val => console.log(val))
    .catch(err => console.log(err))
  }

  componentDidMount() {
    auth.onAuthStateChanged(authUser => {
      if (authUser) {
          console.log('logged in');
          console.log(authUser);
      } else {
        console.log('not logged in');
      }
    });

  }

  render() {
    return (
      <div className="container">
        {/* <a href='#' onClick={this.signUp}>SIGN UP </a><span>------</span>
        <a href='#' onClick={this.signIn}>SIGN IN </a><span>------</span>
        <a href='#' onClick={this.signOut}>SIGNOUT </a> */}
        <Header />

        { this.state.showLogin ?
            <LoginForm toggleLoginForm={this.toggleLoginForm} /> :
            null
        }

        <Switch>
          <Route exact path='/' render={(routerProps) => {
            return (
              <React.Fragment>
                <Banner {...routerProps} />
                <LandingText {...routerProps} />
                <Campgrounds {...routerProps} />
              </React.Fragment>
            );
          }} />

          <Route exact path="/campground/:id" render={(routerProps) => {
              return <SingleCampground {...routerProps} />
          }} />
        </Switch>

        <Footer />

      </div>
    );
  }
}

export default App;

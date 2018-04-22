// Import React and router stuff
import React from 'react';
import { Switch, Route } from 'react-router-dom'

// Import components
import Header from './Header'
import Banner from './Banner'
import Campgrounds from './Campgrounds'
import Footer from './Footer'
import SingleCampground from './SingleCampground'
import LandingText from './LandingText'
import LoginForm from './LoginForm'
import AuthenticationHOC from './AuthenticationHOC'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showLoginOverlay: false
    }
    this.toggleLoginForm = this.toggleLoginForm.bind(this)
  }

  toggleLoginForm() {
    const newLoginState = !this.state.showLoginOverlay
    this.setState({showLoginOverlay: newLoginState});
    if (!newLoginState) {
      document.body.classList.remove('body__lock')
    } else {
      document.body.classList.add('body__lock')
      window.scrollTo(0, 0)
    };
  }

  render() {
    return (
      <div className="container">
        {/* <a href='#' onClick={this.signUp}>SIGN UP </a><span>------</span>
        <a href='#' onClick={this.signIn}>SIGN IN </a><span>------</span>
        <a href='#' onClick={this.signOut}>SIGNOUT </a> */}
        <Header toggleLoginForm={this.toggleLoginForm} />

        {this.state.showLoginOverlay ?
          <LoginForm toggleLoginForm={this.toggleLoginForm} />
          : null
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
              return <SingleCampground toggleLoginForm={this.toggleLoginForm} {...routerProps} />
          }} />
        </Switch>

        <Footer />

      </div>
    );
  }
}

export default AuthenticationHOC(App);

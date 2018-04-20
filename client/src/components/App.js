import React from 'react';
import { Switch, Route } from 'react-router-dom'
import Header from './Header'
import Banner from './Banner'
import Campgrounds from './Campgrounds'
import Footer from './Footer'
import SingleCampground from './SingleCampground'
import { firebaseauth } from '../firebase/firebase';
import { firebase } from '../firebase/firebase'

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      quote: undefined
    }
    this.signUp = this.signUp.bind(this)
    this.signIn = this.signIn.bind(this)
    this.signOut = this.signOut.bind(this)
  }

  signOut() {
    // Sign out the user
    firebaseauth.doSignOut();
  }

  signIn() {
    firebaseauth.doSignInWithEmailAndPassword()
      .then(authUser => {
        console.log('authenticating');
        console.log(authUser);
      })
      .catch(error => {
        console.log(error);
      });
  }
  signUp() {
    firebaseauth.doCreateUserWithEmailAndPassword()
        .then(authUser => {
          console.log(authUser);
        })
        .catch(error => {
          console.log(error);
        });
  }
  componentDidMount() {
    firebase.auth.onAuthStateChanged(authUser => {
      if (authUser) {
          console.log('logged in');
          console.log(authUser);
      } else {
        console.log('not logged in');
      }
    });


    // Get quote
    fetch('/quote')
      .then(res => res.json())
      .then(quote => this.setState({quote: quote[0]}));
  }

  render() {
    return (
      <div className="container">
        <a href='#' onClick={this.signUp}>SIGN UP </a><span>------</span>
        <a href='#' onClick={this.signIn}>SIGN IN </a><span>------</span>
        <a href='#' onClick={this.signOut}>SIGNOUT </a>
        <Header />
        {/* ROUTES:
          1. /
          2. /campground/id
          3. /addreview => campground POST in backend
        */}
        <Switch>
          <Route exact path='/' render={(routerProps) => {
            return (
              <React.Fragment>
                <Banner {...routerProps} quote={this.state.quote} />
                <Campgrounds {...routerProps} //campgrounds={this.state.campgrounds}
                  //newRandoms={this.newRandoms}
                />
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

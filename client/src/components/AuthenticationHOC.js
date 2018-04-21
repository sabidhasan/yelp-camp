import React from 'react'
import PropTypes from 'prop-types';

// Import helper sign in/sign out functions
import { signInFunc, signOutFunc, auth } from '../firebase/firebase'

const AuthenticationHOC = (Component) => {
  // Create a component that will render the passed in component
  class AuthenticationHOC extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        user: null
      }
      this.signInUser = this.signInUser.bind(this)
      this.signOutUser = this.signOutUser.bind(this)
    }

    static childContextTypes = {
      user: PropTypes.object,
      signIn: PropTypes.func,
      signOut: PropTypes.func
    }

    signInUser() {
      signInFunc()
      .then(val => {
        this.setState({user: val})
      })
      .catch(err => console.log(err))
    }

    signOutUser() {
      // Sign out the user
      signOutFunc()
      .then(() => {
        this.setState({user: null})
      })
      .catch((err) => console.log('error occured'))
    }

    getChildContext() {
      return {
        user: this.state.user,
        signIn: this.signInUser,
        signOut: this.signOutUser
      }
    }

    componentDidMount() {
      auth.onAuthStateChanged(authUser => {
        if (authUser) {
            this.setState({user: authUser});
            authUser.getIdToken()
            .then(token => {
              console.log(token);
              fetch('/verifyUser', {
                method: 'post',
                body: JSON.stringify({'a': token}), //JSON.stringify(token.json),
                headers: {
                  'Accept': 'application/json, text/plain, */*',
                  'Content-Type': 'application/json'
                }
              })
              .then(response => response.json())
              .then(result => console.log(result))
            })
        } else {
          this.setState({user: null})
        }
      });
    }

    render() {
      return <Component />
    }
  }
  // AuthenticationHOC.childContextTypes = {
  //   user: PropTypes.object,
  //   signIn: PropTypes.object,
  //   signOut: PropTypes.object
  // };
  return AuthenticationHOC;
}

export default AuthenticationHOC

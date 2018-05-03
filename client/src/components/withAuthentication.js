import React from 'react'
import PropTypes from 'prop-types';

// Import helper sign in/sign out functions
import { signInFunc, signOutFunc, auth } from '../helpers/firebase'

const withAuthentication = (Component) => {
  // Create a component that will render the passed in component
  class withAuthentication extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        user: {loading: true, displayName: "Guest"}
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
      .catch(err => {
        this.setState({user: null})
        console.log(err)
      })
    }

    signOutUser() {
      // Sign out the user
      signOutFunc()
      .then(() => {
        this.setState({user: null})
      })
      .catch((err) => {
        this.setState({user: null})
        console.log('error occured')
      })
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
          // this.setState({user: {loading: true}})
            this.setState({user: authUser});
        } else {
          // this.setState({user: {loading: true}})
          this.setState({user: null})
        }
      });
    }

    render() {
      return <Component />
    }
  }
  // withAuthentication.childContextTypes = {
  //   user: PropTypes.object,
  //   signIn: PropTypes.object,
  //   signOut: PropTypes.object
  // };
  return withAuthentication;
}

export default withAuthentication

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
        user: {loading: true, displayName: "Guest"},
      }
      this.signInUser = this.signInUser.bind(this)
      this.signOutUser = this.signOutUser.bind(this)
    }

    static contextTypes = {
      startLoad: PropTypes.func,
      finishLoad: PropTypes.func
    }

    static childContextTypes = {
      user: PropTypes.object,
      signIn: PropTypes.func,
      signOut: PropTypes.func,
    }

    signInUser() {
      this.context.startLoad();
      signInFunc()
      .then(val => {
        this.setState({user: val}, () => this.context.finishLoad())
      })
      .catch(err => {
        this.setState({user: null}, () => this.context.finishLoad())
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
        signOut: this.signOutUser,
      }
    }

    componentDidMount() {
      this.context.startLoad();
      auth.onAuthStateChanged(authUser => {
        if (authUser) {
          this.setState({user: authUser}, () => this.context.finishLoad());
        } else {
          this.setState({user: null}, () => this.context.finishLoad())
        }
      });
    }

    render() {
      return <Component />
    }
  }
  return withAuthentication;
}

export default withAuthentication

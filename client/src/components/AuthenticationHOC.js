import React from 'react'
import PropTypes from 'prop-types';

import { auth } from '../firebase/firebase'
// import ContextLoggedIn from './ContextLoggedIn'
// import AuthUserContext from './AuthUserContext';

const AuthenticationHOC = (Component) => {
  // Create a component that will render the passed in component
  class AuthenticationHOC extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        user: null
      }
    }

    getChildContext() {
      return this.state;
    }


    componentDidMount() {
      auth.onAuthStateChanged(authUser => {
        if (authUser) {
            console.log('logged in');
            this.setState({user: authUser})
        } else {
          console.log('not logged in');
          this.setState({user: null})
        }
      });
    }

    render() {
      const { authUser } = this.state;
      return (
        // <AuthUserContext.Provider value={authUser}>
          <Component />
        // </AuthUserContext.Provider>
      );

      // return (
      //   <ContextLoggedIn.Provider value={this.state.user}>
      //     <Component />
      //   </ContextLoggedIn.Provider>
      // )
    }

  }
  AuthenticationHOC.childContextTypes = {
    user: PropTypes.object
  };
  return AuthenticationHOC;
}

export default AuthenticationHOC

import React from 'react'
import PropTypes from 'prop-types'

class LoginForm extends React.Component {
  constructor(props) {
    super(props)
  }

  static contextTypes = {
    signIn: PropTypes.func,
  }

  render() {
    return (
      <div className='login-background'>
        <div className='login-form'>
          <h1>Sign Up or Sign In to YelpCamp</h1>
          <a className='login-form__close' onClick={() => this.props.toggleLoginForm()}>X</a>
          <p>We support logging in through Google or Facebook.<br />This is only used for
          verification and spam prevention (no data is given by them to us).</p>

          <button onClick={this.context.signIn}>Google Login</button>
          <button>Facebook Login</button>

        </div>
      </div>
    )
  }
}

export default LoginForm

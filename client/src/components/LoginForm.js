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
          <a className='login-form__close' onClick={() => this.props.toggleLoginForm()}>×</a>
          <p>We support logging in through <a href='https://www.google.com'>Google</a> or <a href='https://www.facebook.com'>Facebook</a>.
          <br />This is used verification, spam prevention and for your name if you choose
          to post a public comment. No other data is given to us by either provider.
          <br />Your data will not be kept on YelpCamp computers.
          </p>

          <button onClick={this.context.signIn}>Google Login</button>
          <button>Facebook Login</button>

        </div>
      </div>
    )
  }
}

export default LoginForm

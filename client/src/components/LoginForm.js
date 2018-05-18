import React from 'react'
import PropTypes from 'prop-types'
import XButton from './XButton'

class LoginForm extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    document.onkeydown = (e) => {if (e.key === 'Escape') this.props.toggleLoginForm()}
  }

  static contextTypes = {
    signIn: PropTypes.func,
  }

  componentWillUnmount() {
    document.onkeydown = null;
  }

  render() {
    return (
      <div className='LoginForm flex-center'>
        <div className='LoginForm__content'>
          <h1 className='LoginForm__title'>Sign Up or Sign In to YelpCamp</h1>
          <XButton className='LoginForm__close bold' onClick={() => this.props.toggleLoginForm()} />
          <p className='LoginForm__text'>We support logging in through <a href='https://www.google.com'>Google</a> or <a href='https://www.facebook.com'>Facebook</a>.
          <br />This is used verification, spam prevention and for your name if you choose
          to post a public comment. No other data is given to us by either provider.
          <br />Your data will not be kept on YelpCamp computers.
          </p>

          <button
            className='LoginForm__login-button btn btn--small'
            onClick={() => this.context.signIn('google')}>
            <i className="fab fa-google"></i>Google Login
          </button>
          <button
            className='LoginForm__login-button btn btn--small'
            onClick={() => this.context.signIn('facebook')}>
            <i className="fab fa-facebook-square"></i>Facebook Login
          </button>
        </div>
      </div>
    )
  }
}

export default LoginForm

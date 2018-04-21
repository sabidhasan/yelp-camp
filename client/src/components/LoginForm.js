import React from 'react'

const LoginForm = (props) => {
  return (
    <div className={props.show ? 'login-background' : 'login-background login-background__hide'}>
      <div className='login-form'>
        <h1>Log In</h1>
        <a className='login-form__close' onClick={() => props.toggleLoginForm()}>X</a>
        <p>We support logging in through Google or Facebook.<br />This is only used for
        verification and spam prevention (no data is given by them to us).</p>

        <button>Google Login</button>
        <button>Facebook Login</button>

      </div>
    </div>
  )
}

export default LoginForm

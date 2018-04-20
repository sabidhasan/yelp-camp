import React from 'react'

const LoginForm = (props) => {
  return (
    <div className='login-background'>
      <div className='login-form'>
        <h1>Log In</h1>
        <a className='login-form__close' onClick={() => props.toggleLoginForm()}>X</a>

        <button>Google Login</button>
        <button>Facebook Login</button>

      </div>
    </div>
  )
}

export default LoginForm

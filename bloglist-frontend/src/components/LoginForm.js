import React from 'react'


const LoginForm = ({ handleLogin, username, password, passwordChange, usernameChange }) => {

  return (
    <form onSubmit={handleLogin}>
      <div>
        username:
        <input id="username"
          type="text"
          value={username}
          name="Username"
          onChange={usernameChange}
        />
      </div>
      <br/>
      <div>
        password:
        <input id="password"
          type="password"
          value={password}
          name="Password"
          onChange={passwordChange}
        />
        <br/>
        <button id="login-button" type="submit">Login</button>
      </div>
    </form>
  )
}

export default LoginForm
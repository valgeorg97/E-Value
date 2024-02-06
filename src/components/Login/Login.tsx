import React from 'react';
import { Link } from 'react-router-dom';
import {LoginProps} from '../../interfaces/index'
import './Login.css';

/**
 * Login component provides a user interface for authentication, allowing users to enter their email and password.
 * It takes `email`, `password`, and handler functions `onEmailChange`, `onPasswordChange`, and `onLogin` as props
 * to manage user input and submission. A link to the registration page is also provided for users without an account.
 *
 */

const Login: React.FC<LoginProps> = ({ email, password, onEmailChange, onPasswordChange, onLogin }) => {
  return (
    <div className="login-container">
      <h2>Login</h2>
      <form>
        <label>
          Email:
          <input type="email" value={email} onChange={(e) => onEmailChange(e.target.value)} />
        </label>
        <br />
        <label>
          Password:
          <input type="password" value={password} onChange={(e) => onPasswordChange(e.target.value)} />
        </label>
        <br />
        <button type="button" onClick={onLogin}>
          Login
        </button>
        <p className="not-registered">
        If you don't have an account, you can <Link to="/register">register here</Link>.
      </p>
      </form>
    </div>
  );
};

export default Login;

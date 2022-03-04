import React, { useState, useEffect } from 'react';
import APIService from '../components/APIService';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useCookies(['mytoken']);
  let navigate = useNavigate();

  useEffect(() => {
    if (token['mytoken']) {
      navigate('/');
    }
  }, [token]);

  const loginBtn = () => {
    APIService.LoginUser({ email, password })
      .then((resp) => setToken('mytoken', resp.auth_token))
      .catch((error) => console.log(error));
  };
  return (
    <div className="Login">
      <br />
      <br />
      <h1>Please login</h1>
      <div className="mb-3">
        <label htmlFor="email" className="form-label">
          Email
        </label>
        <br />
        <input
          type="email"
          className="form-control"
          placeholder="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="password" className="form-label">
          Pasword
        </label>
        <br />
        <input
          type="password"
          className="form-control"
          placeholder="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button onClick={loginBtn} className="Submit">
        Login
      </button>
    </div>
  );
}

export default Login;

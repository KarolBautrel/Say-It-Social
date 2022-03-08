import React, { useState, useEffect } from 'react';
import APIService from '../components/APIService';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useCookies(['mytoken']);
  let navigate = useNavigate();
  const [userData, setUserData] = useCookies(['user']);

  useEffect(() => {
    if (token.mytoken) {
      navigate('/');
    }
  }, [token]);

  const getUserData = async (token) => {
    const response = await fetch('api/users/me', {
      headers: {
        Authorization: `Token ${token}`
      }
    });
    const data = await response.json();
    return data;
  };

  const loginBtn = async () => {
    try {
      const response = await APIService.LoginUser({ email, password });

      if (response.auth_token) {
        setToken('mytoken', response.auth_token);
        console.log(response);
        const data = await getUserData(response.auth_token);
        console.log(data);
        setUserData('user', data);
        navigate('/');
      }
    } catch (error) {
      throw new Error('Error during login', error);
    }
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

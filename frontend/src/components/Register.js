import React, { useState, useEffect } from 'react';
import APIService from '../components/APIService';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';

function Register() {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [re_password, setRe_password] = useState('');
  const [email, setEmail] = useState('');

  const regiserBtn = () => {
    APIService.RegisterUser({ name, username, password, re_password, email })
      .then((resp) => console.log(resp))
      .catch((error) => console.log(error));
  };

  return (
    <div className="Login">
      <br />
      <br />
      <h1>Please Register</h1>
      <div className="mb-3">
        <label htmlFor="name" className="form-label">
          Name
        </label>
        <br />
        <input
          type="name"
          className="form-control"
          placeholder="name"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="username" className="form-label">
          Username
        </label>
        <br />
        <input
          type="username"
          className="form-control"
          placeholder="username"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
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
      <div className="mb-3">
        <label htmlFor="re_password" className="form-label">
          Re - Pasword
        </label>
        <br />
        <input
          type="password"
          className="form-control"
          placeholder="re_password"
          id="re_password"
          value={re_password}
          onChange={(e) => setRe_password(e.target.value)}
        />
      </div>
      <button onClick={regiserBtn} className="Submit">
        Register
      </button>
    </div>
  );
}

export default Register;

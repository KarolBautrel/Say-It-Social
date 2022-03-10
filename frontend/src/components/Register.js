import React, { useState, useEffect } from 'react';
import APIService from '../components/APIService';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';

function Register() {
  const [userRegisterConfiguration, setUserRegisterConfiguration] = useState({
    name: '',
    username: '',
    email: '',
    password: '',
    re_password: ''
  });
  const handleChange = (event) =>
    setUserRegisterConfiguration({
      ...userRegisterConfiguration,
      [event.target.name]: event.target.value
    });
  const registerFormConfiguration = [
    { name: 'name', id: 'name', placeholder: 'Name', type: 'name' },
    { name: 'username', id: 'username', placeholder: 'Username', type: 'username' },
    { name: 'email', id: 'email', placeholder: 'Email', type: 'email' },
    { name: 'password', id: 'password', placeholder: 'Password', type: 'password' },
    { name: 're_password', id: 're_password', placeholder: 'Confirm Password', type: 'password' }
  ];
  const onRegister = () => {
    APIService.RegisterUser(userRegisterConfiguration)
      .then((resp) => console.log(resp))
      .catch((error) => console.log(error));
  };

  return (
    <div className="Login">
      {registerFormConfiguration.map(({ name, id, placeholder, type }) => (
        <div>
          <label htmlFor={name} className="form-label">
            {name}
          </label>
          <input
            type={type}
            className="form-control"
            placeholder={placeholder}
            id={id}
            name={name}
            value={userRegisterConfiguration[name]}
            onChange={handleChange}
          />
        </div>
      ))}
      <button onClick={onRegister} className="Submit">
        Register
      </button>
    </div>
  );
}

export default Register;

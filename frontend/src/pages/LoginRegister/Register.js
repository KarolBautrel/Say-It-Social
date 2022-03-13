import React, { useState } from 'react';
import APIService from '../../components/APIService';
import { useNavigate, Navigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';

function Register() {
  const [userRegisterConfiguration, setUserRegisterConfiguration] = useState({
    name: '',
    username: '',
    email: '',
    password: '',
    re_password: ''
  });

  const [token] = useCookies(['mytoken']);
  const navigate = useNavigate();
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
    {
      name: 're_password',
      id: 're_password',
      placeholder: 'Confirm Password',
      type: 'password'
    }
  ];

  const onRegister = () => {
    APIService.RegisterUser(userRegisterConfiguration)
      .catch((error) => {
        throw new Error(error);
      })
      .then(navigate('/login'));
  };
  if (token.mytoken) {
    return <Navigate to="/" />;
  }
  return (
    <div className="w-full max-w-xs">
      {registerFormConfiguration.map(({ name, id, placeholder, type }) => (
        <div key={id}>
          <label htmlFor={name} className="block text-gray-700 text-sm font-bold mb-2">
            {name}
          </label>
          <input
            type={type}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder={placeholder}
            id={id}
            name={name}
            value={userRegisterConfiguration[name]}
            onChange={handleChange}
          />
        </div>
      ))}
      <button
        onClick={onRegister}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
        Register
      </button>
    </div>
  );
}

export default Register;

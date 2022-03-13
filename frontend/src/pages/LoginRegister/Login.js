import React, { useState, useEffect } from 'react';
import APIService from '../../components/APIService';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import { getUserData } from '../../components/Utils';

function Login() {
  const [userConfiguration, setUserConfiguration] = useState({
    email: '',
    password: ''
  });
  const [token, setToken] = useCookies(['mytoken']);
  const [userData, setUserData] = useCookies(['user']);
  const navigate = useNavigate();

  const handleChange = (event) =>
    setUserConfiguration({
      ...userConfiguration,
      [event.target.name]: event.target.value
    });

  useEffect(() => {
    if (token.mytoken) {
      navigate('/');
    }
  }, [token]);

  const onLogin = async () => {
    try {
      const response = await APIService.LoginUser(userConfiguration);

      if (response.auth_token) {
        setToken('mytoken', response.auth_token);
        console.log(response);
        const data = await getUserData(response.auth_token);
        setUserData('user', data);
        navigate('/');
      }
    } catch (error) {
      throw new Error('Error during login', error);
    }
  };

  return (
    <div className="w-full max-w-xs">
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" forHtml="username">
          Email
        </label>
        <input
          name="email"
          type="email"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          placeholder="email"
          id="email"
          value={userConfiguration.email}
          onChange={handleChange}
        />
      </div>
      <div className="mb-6">
        <label className="block text-gray-700 text-sm font-bold mb-2" forHtml="password">
          Password
        </label>
        <br />
        <input
          name="password"
          type="password"
          className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
          id="password"
          placeholder="Password"
          value={userConfiguration.password}
          onChange={handleChange}
        />
      </div>
      <button
        onClick={onLogin}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        type="button">
        Login
      </button>
    </div>
  );
}

export default Login;

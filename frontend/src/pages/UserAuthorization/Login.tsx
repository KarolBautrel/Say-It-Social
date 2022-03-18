import React, { useState, useEffect, ChangeEvent } from 'react';
import APIService from '../../Utils/Api/APIService';
import { useCookies } from 'react-cookie';
import { useNavigate, Navigate } from 'react-router-dom';
import { getUserData } from '../../Utils/Utils';

function Login() {
  const [userConfiguration, setUserConfiguration] = useState({
    email: '',
    password: ''
  });
  const [token, setToken] = useCookies(['mytoken']);
  const [userData, setUserData] = useCookies(['user']);
  const navigate = useNavigate();

  const handleChange = (event: ChangeEvent<HTMLInputElement>) =>
    setUserConfiguration({
      ...userConfiguration,
      [event.target.name]: event.target.value
    });

  if (token.mytoken && userData.user) {
    return <Navigate to="/" />;
  }

  const onLogin = async () => {
    try {
      const response = await APIService.LoginUser(userConfiguration);

      if (response.auth_token) {
        setToken('mytoken', response.auth_token);
        const data = await getUserData(response.auth_token);
        await setUserData('user', data);
      }
    } catch (error: any) {
      throw new Error('Error during login', error);
    }
  };

  return (
    <div className="w-full max-w-xs">
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Email</label>
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
        <label className="block text-gray-700 text-sm font-bold mb-2">Password</label>
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

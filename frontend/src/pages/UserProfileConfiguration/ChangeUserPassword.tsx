import React, { useState, useEffect, ChangeEvent } from 'react';
import { CheckUserAuth } from 'pages/CheckUserAuth';
import { Navbar } from '../../components/Navbar';
import { useCookies } from 'react-cookie';
import { ChangeUserPassword } from '../../Utils/Utils';

function ChangeUserEmail() {
  const [token] = useCookies(['mytoken']);
  const [userCookie] = useCookies(['user']);
  const tokenId = token.mytoken;
  const userId = userCookie.user.id;
  const [userPasswordChangeConfiguration, setuserPasswordChangeConfiguration] = useState({
    new_password: '',
    re_new_password: '',
    current_password: ''
  });
  const handleChange = (event: ChangeEvent<HTMLInputElement>) =>
    setuserPasswordChangeConfiguration({
      ...userPasswordChangeConfiguration,
      [event.target.name]: event.target.value
    });

  return (
    <CheckUserAuth>
      <Navbar />
      <div className="w-full max-w-xs">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">New Password</label>
          <input
            name="new_password"
            type="password"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="New Password"
            id="new_password"
            value={userPasswordChangeConfiguration.new_password}
            onChange={handleChange}
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Confirm your new Password
          </label>
          <br />
          <input
            name="re_new_password"
            type="password"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="re_new_password"
            placeholder="Confirm Password"
            value={userPasswordChangeConfiguration.re_new_password}
            onChange={handleChange}
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2">Current Password</label>
          <br />
          <input
            name="current_password"
            type="password"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="current_password"
            placeholder="Current Password"
            value={userPasswordChangeConfiguration.current_password}
            onChange={handleChange}
          />
        </div>
        <button
          onClick={() =>
            ChangeUserPassword(tokenId, {
              new_password: userPasswordChangeConfiguration?.new_password,
              re_new_password: userPasswordChangeConfiguration.re_new_password,
              current_password: userPasswordChangeConfiguration.current_password
            })
          }
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="button">
          Change Your Password !
        </button>
      </div>
    </CheckUserAuth>
  );
}

export default ChangeUserEmail;

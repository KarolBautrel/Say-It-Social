import React, { useState, useEffect, ChangeEvent } from 'react';
import { CheckUserAuth } from 'pages/CheckUserAuth';
import { Navbar } from '../../components/Navbar';
import { useCookies } from 'react-cookie';
import { ChangeUserMail } from '../../Utils/Utils';

function ChangeUserEmail() {
  const [token] = useCookies(['mytoken']);
  const [userCookie] = useCookies(['user']);
  const tokenId = token.mytoken;
  const userId = userCookie.user.id;
  const [userEmailChangeConfiguration, setuserEmailChangeConfiguration] = useState({
    email: '',
    email2: ''
  });
  const handleChange = (event: ChangeEvent<HTMLInputElement>) =>
    setuserEmailChangeConfiguration({
      ...userEmailChangeConfiguration,
      [event.target.name]: event.target.value
    });

  return (
    <CheckUserAuth>
      <Navbar />
      <div className="w-full max-w-xs">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Email</label>
          <input
            name="email"
            type="email"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Email"
            id="email"
            value={userEmailChangeConfiguration.email}
            onChange={handleChange}
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2">Confirm your email</label>
          <br />
          <input
            name="email2"
            type="email"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email2"
            placeholder="Confirm Email"
            value={userEmailChangeConfiguration.email2}
            onChange={handleChange}
          />
        </div>
        <button
          onClick={() =>
            ChangeUserMail(userId, tokenId, {
              email: userEmailChangeConfiguration?.email,
              email2: userEmailChangeConfiguration.email2
            })
          }
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="button">
          Change Your Email !
        </button>
      </div>
    </CheckUserAuth>
  );
}

export default ChangeUserEmail;

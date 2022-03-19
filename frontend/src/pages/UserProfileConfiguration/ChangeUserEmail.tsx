import { useState, ChangeEvent } from 'react';
import { CheckUserAuth } from 'pages/CheckUserAuth';
import { Navbar } from '../../components/layout/Navigation/Navbar';
import { useCookies } from 'react-cookie';
import { ChangeUserMail } from '../../Utils/Utils';
import { MainLayout } from 'components/layout/MainLayout/MainLayout';

function ChangeUserEmail() {
  const [token] = useCookies(['mytoken']);
  const [userCookie] = useCookies(['user']);
  const tokenId = token.mytoken;
  const userId = userCookie.user.id;
  const userEmail = userCookie.user.email;
  const [userEmailChangeConfiguration, setuserEmailChangeConfiguration] = useState({
    email: '',
    re_email: ''
  });

  const handleChange = (event: ChangeEvent<HTMLInputElement>) =>
    setuserEmailChangeConfiguration({
      ...userEmailChangeConfiguration,
      [event.target.name]: event.target.value
    });

  const onChangePassword = () =>
    ChangeUserMail(userId, tokenId, {
      email: userEmailChangeConfiguration?.email,
      re_email: userEmailChangeConfiguration.re_email
    });

  return (
    <CheckUserAuth>
      <MainLayout>
        <div className="w-full max-w-xs">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Your current email : {userEmail}
            </label>
          </div>
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
              name="re_email"
              type="email"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="re_email"
              placeholder="Confirm Email"
              value={userEmailChangeConfiguration.re_email}
              onChange={handleChange}
            />
          </div>
          <button
            onClick={onChangePassword}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button">
            Change Your Email !
          </button>
        </div>
      </MainLayout>
    </CheckUserAuth>
  );
}

export default ChangeUserEmail;

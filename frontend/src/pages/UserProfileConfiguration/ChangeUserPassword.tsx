import { useState, ChangeEvent } from 'react';
import { CheckUserAuth } from 'pages/CheckUserAuth';
import { Navbar } from '../../components/layout/Navigation/Navbar';
import { useCookies } from 'react-cookie';
import { ChangeUserPassword } from '../../Utils/Utils';
import { MainLayout } from 'components/layout/MainLayout/MainLayout';

function ChangePassword() {
  const [token] = useCookies(['mytoken']);
  const tokenId = token.mytoken;
  const [userPasswordChangeConfiguration, setuserPasswordChangeConfiguration] = useState<{
    [key: string]: string;
  }>({
    new_password: '',
    re_new_password: '',
    current_password: ''
  });

  const handleChange = (event: ChangeEvent<HTMLInputElement>) =>
    setuserPasswordChangeConfiguration({
      ...userPasswordChangeConfiguration,
      [event.target.name]: event.target.value
    });

  const onChangePassword = () =>
    ChangeUserPassword(tokenId, {
      new_password: userPasswordChangeConfiguration?.new_password,
      re_new_password: userPasswordChangeConfiguration.re_new_password,
      current_password: userPasswordChangeConfiguration.current_password
    });

  const changePasswordFormConfiguration = [
    {
      name: 'current_password',
      id: 'current_password',
      placeholder: 'Current Password',
      type: 'password'
    },
    { name: 'new_password', id: 'new_password', placeholder: 'New Password', type: 'password' },
    {
      name: 're_new_password',
      id: 're_new_password',
      placeholder: 'Confirm New Password',
      type: 'password'
    }
  ];

  return (
    <CheckUserAuth>
      <MainLayout>
        <div
          className="w-full max-w-xs"
          style={{ textAlign: '-webkit-center', marginTop: '50px', marginLeft: '250px' }}>
          {changePasswordFormConfiguration.map(({ name, id, placeholder, type }) => (
            <div key={id}>
              <label htmlFor={name} className="block text-gray-700 text-sm font-bold mb-2">
                {placeholder}
              </label>
              <input
                key={id}
                type={type}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder={placeholder}
                id={id}
                name={name}
                value={userPasswordChangeConfiguration[name]}
                onChange={handleChange}
              />
            </div>
          ))}
          <button
            onClick={onChangePassword}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button">
            Change Your Password !
          </button>
        </div>
      </MainLayout>
    </CheckUserAuth>
  );
}

export default ChangePassword;

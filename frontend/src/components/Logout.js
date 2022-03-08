import React, { useState, useEffect } from 'react';
import { onLogout } from './Utils';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';

function Logout() {
  const [cookies, _, removeCookie] = useCookies(['mytoken']);
  const [user, i, removeCookieUser] = useCookies(['user']);
  return (
    <div>
      <button onClick={() => onLogout(cookies.mytoken, user.user, removeCookie, removeCookieUser)}>
        Logout
      </button>
    </div>
  );
}
export default Logout;

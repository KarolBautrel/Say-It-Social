import React, { useState, useEffect } from 'react';
import { onLogout } from './Utils';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';

function Logout() {
  const [cookies, _, removeCookie] = useCookies(['mytoken']);
  console.log(useCookies(['mytoken']));
  return (
    <div>
      <button onClick={() => onLogout(cookies.mytoken, removeCookie)}>Logout</button>
    </div>
  );
}
export default Logout;

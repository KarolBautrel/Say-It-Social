import React, { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';

function recentActivity() {
  const [activity, setActivity] = useState([]);
  const [token, setToken] = useCookies(['mytoken']);

  const getActivity = async (token) => {
    const response = await fetch('api/messages', {
      headers: {
        Authorization: `Token ${token}`
      }
    });
    const data = await response.json();
    return data;
  };
}

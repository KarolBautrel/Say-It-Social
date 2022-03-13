import React, { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';

export const CheckUserAuth = (props) => {
  const [token] = useCookies(['mytoken']);
  const navigate = useNavigate();
  useEffect(() => {
    if (!token.mytoken) {
      return navigate('/login');
    }
  }, [token]);

  return props.children;
};

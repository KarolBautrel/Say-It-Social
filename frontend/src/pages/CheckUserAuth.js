import React, { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { Navigate } from 'react-router-dom';

export const CheckUserAuth = (props) => {
  const [token] = useCookies(['mytoken']);

  if (!token.mytoken) {
    return <Navigate to="/login" />;
  }

  return props.children;
};

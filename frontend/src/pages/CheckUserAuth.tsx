import { ReactNode } from 'react';
import { useCookies } from 'react-cookie';
import { Navigate } from 'react-router-dom';

type CheckUserAuthProp = {
  children: any;
};

export const CheckUserAuth = (props: CheckUserAuthProp) => {
  const [cookieToken] = useCookies(['mytoken']);
  const auth_token = cookieToken.mytoken;
  if (!auth_token) {
    return <Navigate to="/login" />;
  }

  return props.children;
};

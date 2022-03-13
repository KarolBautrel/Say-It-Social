import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { Navbar } from '../../components/Navbar';
const UserInfo = () => {
  const { id } = useParams();
  const [userInfo, setUserInfo] = useState('');

  useEffect(() => {
    getUserInfo();
  }, [id]);

  const getUserInfo = async () => {
    const response = await fetch(`/api/user/${id}`);
    const data = await response.json();
    setUserInfo(data);
  };

  return (
    <>
      <Navbar />
      <div> {userInfo.name}</div>
    </>
  );
};

export default UserInfo;

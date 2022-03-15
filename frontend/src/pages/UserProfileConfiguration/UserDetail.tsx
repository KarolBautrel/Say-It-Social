import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Navbar } from '../../components/Navbar';
import { UserType } from 'pages/UserProfileConfiguration/types';
import { useCookies } from 'react-cookie';
import { UpdateUserInformations } from 'pages/UserProfileConfiguration/UpdateUserInformations';
import { CheckUserAuth } from '../CheckUserAuth';
const UserDetail = () => {
  const { id } = useParams();
  const [userDetail, setUserDetail] = useState<UserType>();
  const [userCookie] = useCookies(['user']);
  const [token] = useCookies(['mytoken']);
  const user = userCookie.user;
  const tokenId = token.mytoken;
  console.log(user);
  useEffect(() => {
    getUserDetail();
  }, [id]);

  const getUserDetail = async () => {
    const response = await fetch(`/api/user/${id}`);
    const data = await response.json();
    setUserDetail(data);
  };

  return (
    <CheckUserAuth>
      <Navbar />
      {userDetail && <div> @{userDetail?.username}</div>}
      {userDetail && <div> {userDetail?.name}</div>}
      {userDetail && <div> {userDetail?.bio}</div>}

      <UpdateUserInformations user={user} token={tokenId} />
    </CheckUserAuth>
  );
};

export default UserDetail;

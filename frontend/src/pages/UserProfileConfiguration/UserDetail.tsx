import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Navbar } from '../../components/Navbar';
import { UserType } from 'pages/UserProfileConfiguration/types';

const UserDetail = () => {
  const { id } = useParams();
  const [userDetail, setUserDetail] = useState<UserType>();
  console.log(userDetail);
  useEffect(() => {
    getUserDetail();
  }, [id]);

  const getUserDetail = async () => {
    const response = await fetch(`/api/user/${id}`);
    const data = await response.json();
    setUserDetail(data);
  };

  return (
    <>
      <Navbar />
      {userDetail && <div> @{userDetail?.username}</div>}
      {userDetail && <div> {userDetail?.name}</div>}
      {userDetail && <div> {userDetail?.bio}</div>}
    </>
  );
};

export default UserDetail;

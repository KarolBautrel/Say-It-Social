import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { UserType } from 'pages/UserProfileConfiguration/types';
import { useCookies } from 'react-cookie';
import { UpdateUserData } from 'pages/UserProfileConfiguration/UpdateUserData';
import { CheckUserAuth } from '../CheckUserAuth';
import { Link } from 'react-router-dom';
import { MainLayout } from 'components/layout/MainLayout/MainLayout';
import { Button } from 'antd';
const UserDetail = () => {
  const { id } = useParams();
  const [userDetail, setUserDetail] = useState<UserType>();
  const [userCookie] = useCookies(['user']);
  const [token] = useCookies(['mytoken']);
  const user = userCookie.user;
  const tokenId = token.mytoken;

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
      <MainLayout>
        <div>
          <div>
            {userDetail && <div> @{userDetail?.username}</div>}
            {userDetail && <div> {userDetail?.name}</div>}
            {userDetail && <div> {userDetail?.bio}</div>}
            {user.name === userDetail?.name && (
              <UpdateUserData user={user} token={tokenId} currentBio={userDetail?.bio} />
            )}
          </div>
          <div>
            <p className="text-3xl">User rooms ({userDetail?.rooms.length})</p>
            <br />
            {userDetail?.rooms.map((room) => (
              <div>
                <p className=" text-xl">{room.name}</p>
                <Link to={`/room/${room.id}`}>
                  <p>
                    <Button>Get to the room</Button>
                  </p>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </MainLayout>
    </CheckUserAuth>
  );
};

export default UserDetail;

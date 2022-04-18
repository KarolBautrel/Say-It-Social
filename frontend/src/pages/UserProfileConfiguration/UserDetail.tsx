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
    console.log(user.friends);
  };
  return (
    <CheckUserAuth>
      <MainLayout>
        <div className="grid grid-rows-2 grid-flow-col gap-2">
          <div className="grid justify-items-start">
            <div className="row-span-2 ">
              {userDetail && <div> @{userDetail?.username}</div>}
              {userDetail && <div> {userDetail?.name}</div>}
              {userDetail && <div> {userDetail?.bio}</div>}
              <div>
                <p className="text-xl">FRIENDS</p>
              </div>
              {userDetail?.friends.map((friend) => (
                <div>
                  <p className=" text-l">{friend.username}</p>
                </div>
              ))}
              {user.name === userDetail?.name && (
                <UpdateUserData user={user} token={tokenId} currentBio={userDetail?.bio} />
              )}
            </div>
          </div>
          <div className="row-span-3 ">
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

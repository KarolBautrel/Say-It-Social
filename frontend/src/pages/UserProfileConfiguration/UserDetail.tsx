import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Navbar } from '../../components/Navbar';
import { UserType } from 'pages/UserProfileConfiguration/types';
import { useCookies } from 'react-cookie';
import { UpdateUserData } from 'pages/UserProfileConfiguration/UpdateUserData';
import { CheckUserAuth } from '../CheckUserAuth';
import { Link } from 'react-router-dom';
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
      <Navbar />
      <div>
        <div>
          {userDetail && <div> @{userDetail?.username}</div>}
          {userDetail && <div> {userDetail?.name}</div>}
          {userDetail && <div> {userDetail?.bio}</div>}
          <UpdateUserData user={user} token={tokenId} />
          <hr></hr>
        </div>
        <p className="text-xl">User rooms ({userDetail?.rooms.length})</p>
        {userDetail?.rooms.map((room) => (
          <div>
            {room.name}
            <Link to={`/room/${room.id}`}>
              <button className="text-gray-900 hover:text-white border border-gray-800 hover:bg-gray-900 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800">
                Get to the room
              </button>
            </Link>
          </div>
        ))}
      </div>
    </CheckUserAuth>
  );
};

export default UserDetail;

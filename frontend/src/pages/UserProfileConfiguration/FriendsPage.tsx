import { useState, useEffect } from 'react';
import { MainLayout } from 'components/layout/MainLayout/MainLayout';
import { CheckUserAuth } from 'pages/CheckUserAuth';
import { useCookies } from 'react-cookie';
import { Button } from 'antd';
import { Link } from 'react-router-dom';
import { DeleteFromFriends } from 'Utils/Utils';
import { FriendRequests } from './FriendRequests';

export const FriendsPage = () => {
  const [userToken] = useCookies(['mytoken']);
  const token = userToken.mytoken;
  const requestUser = userToken.user;
  const [userFriends, setUserFriends] = useState();

  useEffect(() => {
    getUserFriends();
  }, []);

  const getUserFriends = async () => {
    const response = await fetch(`/api/user/${requestUser.id}`);
    const data = await response.json();
    setUserFriends(data);
  };

  return (
    <CheckUserAuth>
      <MainLayout>
        <div className="grid grid-rows-2 grid-flow-col gap-2">
          <div className="grid justify-items-start">
            <div className="row-span-2 ">
              <p className="text-3xl"> Friends</p>
              {userFriends?.friends.map((friend) => (
                <div>
                  <Link to={`/user/${friend.id}`}>
                    <button>
                      <p className=" text-l">{friend.username}</p>
                    </button>
                  </Link>
                  <Button onClick={() => DeleteFromFriends(token, friend.id)}>
                    Delete from friends
                  </Button>
                </div>
              ))}
            </div>
          </div>

          <div className="row-span-3 ">
            <p className="text-3xl">Request Pending</p>
            <FriendRequests token={token} />
          </div>
        </div>
      </MainLayout>
    </CheckUserAuth>
  );
};

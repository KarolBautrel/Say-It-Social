import { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { CheckUserAuth } from 'pages/CheckUserAuth';
import { MainLayout } from 'components/layout/MainLayout/MainLayout';
import { Link } from 'react-router-dom';
import { Button } from 'antd';
import { AcceptFriendRequest } from 'Utils/Utils';
import { RejectFriendRequest } from 'Utils/Utils';

export const FriendRequests = () => {
  const [userToken] = useCookies(['mytoken']);
  const [invitations, setInvitations] = useState<any[]>([]);

  const token = userToken.mytoken;
  const requestUser = userToken.user;
  useEffect(() => {
    getUserFriends();
  }, []);

  const getUserFriends = async () => {
    const response = await fetch(`/api/friend_requests/`, {
      method: 'GET',
      headers: {
        Authorization: `Token ${token}`
      }
    });
    const data = await response.json();
    setInvitations(data);
  };
  console.log(invitations);
  return (
    <CheckUserAuth>
      <MainLayout>
        <div className="row-span-3 ">
          <p className="text-2xl"> Invites Pending</p>
          {invitations?.map((invitation) => (
            <div>
              <Link to={`/user/${invitation.from_user.id}`}>
                <button>
                  <p className="font-bold">@{invitation.from_user.username} </p>
                </button>
              </Link>
              <Button onClick={() => AcceptFriendRequest(token, invitation.id)}>Accept</Button>
              <Button onClick={() => RejectFriendRequest(token, invitation.id)}> Reject</Button>
            </div>
          ))}
        </div>
      </MainLayout>
    </CheckUserAuth>
  );
};

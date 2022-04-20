import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'antd';
import { AcceptFriendRequest } from 'Utils/Utils';
import { RejectFriendRequest } from 'Utils/Utils';

export const FriendRequests = (token) => {
  const [invitations, setInvitations] = useState<any[]>([]);

  useEffect(() => {
    getUserFriendsRequests();
  }, []);

  const getUserFriendsRequests = async () => {
    const response = await fetch(`/api/friend_requests/`, {
      method: 'GET',
      headers: {
        Authorization: `Token ${token.token}`
      }
    });
    const data = await response.json();
    setInvitations(data);
  };

  console.log(invitations);
  return (
    <div className="row-span-3 ">
      {invitations?.map((invitation) => (
        <div>
          <Link to={`/user/${invitation.from_user.id}`}>
            <button>
              <p className="font-bold">@{invitation.from_user.username} </p>
            </button>
          </Link>
          <Button onClick={() => AcceptFriendRequest(token.token, invitation.id)}>Accept</Button>
          <Button onClick={() => RejectFriendRequest(token.token, invitation.id)}> Reject</Button>
        </div>
      ))}
    </div>
  );
};

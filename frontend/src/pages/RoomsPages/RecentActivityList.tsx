import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { User } from 'pages/RoomsPages/types';
type ActivityType = {
  id: number;
  user: User;
  room: string | number;
  body: string;
  created: string;
};

type Token = {
  token: string;
};
export const RecentActivityList = ({ token }: Token) => {
  const [activities, setActivity] = useState<ActivityType[]>([]);
  console.log(activities);
  useEffect(() => {
    getActivity();
  }, []);
  const getActivity = async () => {
    const response = await fetch('api/messages', {
      headers: {
        Authorization: `Token ${token}`
      }
    });
    const data = await response.json();
    setActivity(data);
  };

  return (
    <div className="row-span-3 ">
      <p className="text-2xl">Recent Activity</p>
      {activities?.map((activity) => (
        <div>
          <Link to={`/user/${activity.user.id}`}>
            <button>
              <p className="font-bold">@{activity.user.name}</p>
            </button>
          </Link>
          <p>To: {activity.room}</p>
          <p className="italic">{activity.body}</p>
        </div>
      ))}
    </div>
  );
};

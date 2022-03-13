import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export const RecentActivityList = ({ token }) => {
  const [activities, setActivity] = useState([]);

  useEffect(() => {
    getActivity();
  }, []);
  const getActivity = async () => {
    const response = await fetch('api/messages', {
      headers: {
        Authorization: `Token ${token.mytoken}`
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

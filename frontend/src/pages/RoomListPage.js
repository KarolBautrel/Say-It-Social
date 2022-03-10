import { useCookies } from 'react-cookie';
import React, { useState, useEffect } from 'react';
import ListItem from '../components/ListItem';
import Logout from '../components/Logout';
import CreateRoom from '../components/CreateRoom';
import { useNavigate } from 'react-router-dom';

const RoomListPage = () => {
  let [rooms, setRooms] = useState([]);
  const [topics, setTopic] = useState([]);
  const [cookies] = useCookies(['mytoken']);
  const navigate = useNavigate();
  const [activities, setActivity] = useState([]);

  useEffect(() => {
    if (cookies?.mytoken) {
      getRooms();
    } else {
      navigate('/login');
    }
  }, []);
  useEffect(() => {
    getTopic();
  }, []);

  useEffect(() => {
    getActivity();
  }, []);

  let getRooms = async () => {
    let response = await fetch('/api/rooms');
    let data = await response.json();
    setRooms(data);
  };

  const getTopic = async () => {
    const response = await fetch('api/topics', {
      headers: {
        Authorization: `Token ${cookies.mytoken}`
      }
    });
    const data = await response.json();
    setTopic(data);
  };

  const getActivity = async (token) => {
    const response = await fetch('api/messages', {
      headers: {
        Authorization: `Token ${cookies.mytoken}`
      }
    });
    const data = await response.json();
    console.log(data);
    setActivity(data);
  };

  if (!cookies.mytoken) {
    navigate('/login');
  }
  return (
    <div className="grid grid-rows-2 grid-flow-col gap-2">
      <Logout />
      <hr></hr>

      <div className="row-span-3 ">
        <p className="text-2xl">Topics</p>
        {topics && topics.map((topic) => <p>{topic.topic}</p>)}
      </div>
      <div className="row-span-3 ">
        <p className="text-2xl">Recent Rooms</p>
        {rooms.map((room, index) => (
          <ListItem key={index} room={room} />
        ))}
      </div>
      <div className="row-span-3 ">
        <p className="text-2xl">Recent Activity</p>
        {activities &&
          activities.map((activity) => (
            <div>
              <p className="font-bold">@{activity.user}</p>
              <p>To: {activity.room}</p>
              <p className="italic">{activity.body}</p>
            </div>
          ))}
      </div>
    </div>
  );
};

export default RoomListPage;

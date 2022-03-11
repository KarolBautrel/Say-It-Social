import { useCookies } from 'react-cookie';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const RoomListPage = () => {
  const [rooms, setRooms] = useState([]);
  let [exactRooms, setExactRooms] = useState([]);
  const [topics, setTopic] = useState([]);
  const [cookies] = useCookies(['mytoken']);
  const navigate = useNavigate();
  const [activities, setActivity] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

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

  const getActivity = async () => {
    const response = await fetch('api/messages', {
      headers: {
        Authorization: `Token ${cookies.mytoken}`
      }
    });
    const data = await response.json();
    setActivity(data);
  };
  const filterRooms = async (topic, token) => {
    const response = await fetch(`api/rooms?topic=${topic}`);
    const data = await response.json();
    setExactRooms(data);
  };

  if (!cookies.mytoken) {
    navigate('/login');
  }
  return (
    <div className="grid grid-rows-2 grid-flow-col gap-2">
      <hr></hr>

      <div className="row-span-3 ">
        <input type="text" value={searchTerm} onChange={handleChange} />

        <p className="text-2xl">Topics</p>
        {topics &&
          topics.map((topic) => (
            <p>
              <button defaultValue="" onClick={() => filterRooms(topic.id, cookies.mytoken)}>
                {topic.topic}
              </button>
            </p>
          ))}
        <button defaultValue="" onClick={() => filterRooms('', cookies.mytoken)}>
          All
        </button>
      </div>
      <div className="row-span-3 ">
        <p className="text-2xl">Recent Rooms</p>
        {exactRooms &&
          exactRooms.map((room) => (
            <div>
              <h2>Topic : {room.topic}</h2>
              <h3>Room name: {room.name}</h3>
              <Link to={`/room/${room.id}`}>
                <button className="btn-white">Get to the room</button>
              </Link>
            </div>
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

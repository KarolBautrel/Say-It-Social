import { useCookies } from 'react-cookie';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const RoomListPage = () => {
  const [exactRooms, setRooms] = useState([]);
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
    setRooms(data);
  };

  if (!cookies.mytoken) {
    navigate('/login');
  }
  return (
    <div className="grid grid-rows-2 grid-flow-col gap-2">
      <hr></hr>

      <div className="row-span-3 ">
        <div className="flex justify-center">
          <input
            type="search"
            className="form-control relative flex-auto min-w-0 block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
            placeholder="Search Rooms"
            aria-label="Search"
            aria-describedby="button-addon2"
          />
          <button
            className="btn inline-block px-2 py-2 border-2 border-blue-600 text-blue-600 font-medium text-xs leading-tight uppercase rounded hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out"
            type="button"
            id="button-addon3">
            Search
          </button>
        </div>
        <p className="text-2xl">Browse Topics</p>
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
        <p className="text-2xl"> Rooms</p>
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
    </div>
  );
};

export default RoomListPage;

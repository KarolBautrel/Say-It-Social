import { useCookies } from 'react-cookie';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { RecentActivityList } from './RecentActivityList';
import { TopicsList } from './TopicsList';
import { RoomFilter } from './RoomFilter';
import { Navbar } from '../../components/Navbar';
const RoomPages = () => {
  const [exactRooms, setRooms] = useState([]);
  const [token] = useCookies(['mytoken']);
  const navigate = useNavigate();

  useEffect(() => {
    if (token?.mytoken) {
      getRooms();
    } else {
      navigate('/login');
    }
  }, []);

  const getRooms = async () => {
    const response = await fetch('/api/rooms');
    const data = await response.json();
    setRooms(data);
  };

  const updateRooms = (rooms) => setRooms(rooms);

  return (
    <>
      <Navbar />
      <div className="grid grid-flow-col gap-2">
        <hr></hr>
        <RoomFilter token={token} onFilterSuccess={updateRooms} />
        <div className="row-span-3 ">
          <TopicsList token={token} onFilterSuccess={updateRooms} />
        </div>
        <div className="row-span-3 ">
          <p className="text-2xl"> Rooms</p>
          {exactRooms?.map((room) => (
            <div>
              <h2>Topic : {room.topic}</h2>
              <h3>Room name: {room.name}</h3>
              <Link to={`/room/${room.id}`}>
                <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                  Get to the room
                </button>
              </Link>
            </div>
          ))}
        </div>
        <RecentActivityList token={token} />
      </div>
    </>
  );
};

export default RoomPages;

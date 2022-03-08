import { useCookies } from 'react-cookie';
import React, { useState, useEffect } from 'react';
import ListItem from '../components/ListItem';
import Logout from '../components/Logout';
import CreateRoom from '../components/CreateRoom';
import { useNavigate } from 'react-router-dom';

const RoomListPage = () => {
  let [rooms, setRooms] = useState([]);
  const [cookies] = useCookies(['mytoken']);
  const navigate = useNavigate();

  useEffect(() => {
    if (cookies?.mytoken) {
      getRooms();
    } else {
      navigate('/login');
    }
  }, []);

  let getRooms = async () => {
    let response = await fetch('/api/rooms');
    let data = await response.json();
    setRooms(data);
  };
  if (!cookies.mytoken) {
    navigate('/login');
  }
  return (
    <div>
      <Logout />
      <CreateRoom />
      <div className="Rooms-list">
        {rooms.map((room, index) => (
          <ListItem key={index} room={room} />
        ))}
      </div>
    </div>
  );
};

export default RoomListPage;

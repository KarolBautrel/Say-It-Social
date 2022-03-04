import React, { useState, useEffect } from 'react';
import ListItem from '../components/ListItem';

const RoomListPage = () => {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    getRooms();
  }, []);

  const getRooms = async () => {
    const response = await fetch('/api/rooms');
    const data = await response.json();
    setRooms(data);
  };

  return (
    <div>
      <div className="Rooms-list">
        {rooms.map((room, index) => (
          <ListItem key={index} room={room} />
        ))}
      </div>
    </div>
  );
};

export default RoomListPage;

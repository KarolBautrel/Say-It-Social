import React from 'react';
import { Link } from 'react-router-dom';

const ListItem = ({ room }) => {
  return (
    <div>
      <h2>Topic : {room.topic}</h2>
      <h3>Room name: {room.name}</h3>
      <Link to={`/room/${room.id}`}>
        <button>Get to the room</button>
      </Link>
    </div>
  );
};

export default ListItem;

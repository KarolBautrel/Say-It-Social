import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ListItem from '../components/ListItem';

const RoomPage = () => {
  const { id } = useParams();
  const [room, setRoom] = useState(null);
  useEffect(() => {
    getNote();
  }, [id]);

  const getNote = async () => {
    const response = await fetch(`/api/room/${id}`);
    const data = await response.json();
    setRoom(data);
  };

  return (
    <div>
      <div className="Room">
        <h3>{room?.name}</h3>
        <p>{room?.description}</p>
      </div>
      <div>
        <h4>Messages</h4>
        {room?.messages.map((messages) => (
          <div>{messages.body}</div>
        ))}
        <button className="btn btn-success">add message</button>
      </div>
      <div>
        <h4>Participants: </h4>
        {room?.participants.map((participants) => (
          <div>{participants.name}</div>
        ))}
      </div>
    </div>
  );
};

export default RoomPage;

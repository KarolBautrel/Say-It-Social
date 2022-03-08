import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { addMessage, deleteMessage } from '../components/Utils';

const RoomPage = () => {
  const { id } = useParams();
  const [room, setRoom] = useState(null);
  useEffect(() => {
    getNote();
  }, [id]);
  const [body, setMessage] = useState('');
  const [cookies, _] = useCookies(['mytoken']);
  const [user] = useCookies(['user']);
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
        <p>{cookies.mytoken}</p>
        <p>{user.user.name}</p>
      </div>
      <div>
        <h4>Messages</h4>
        {room?.messages.map((messages) => (
          <div>
            {' '}
            <p>
              {messages.body}
              {user.user.name === messages.user && (
                <button onClick={() => deleteMessage(messages.id, cookies.mytoken)}>remove</button>
              )}
            </p>
          </div>
        ))}
        <input
          type="text"
          className="form-control"
          placeholder="add your message"
          id="message"
          value={body}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button onClick={() => addMessage({ body, room: room?.id }, cookies.mytoken)}>
          Button
        </button>
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

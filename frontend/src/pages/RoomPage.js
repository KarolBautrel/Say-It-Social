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
    <div className="grid grid-rows-2 grid-flow-col gap-2">
      <div className="grid justify-items-start">
        <div className="row-span-2 ">
          <p className="text-xl">{room?.name}</p>
          <p className="text-lg">{room?.description}</p>
        </div>
        <div className="col-span-2 ">
          <br />
          <p className="text-xl font-bold">Conversation</p>
          {room?.messages.map((messages) => (
            <div>
              <p className="text-light font-bold">@{messages.user}</p>
              <p className="text-light">
                {messages.body}
                {user.user.name === messages.user && (
                  <button
                    className="btn-white"
                    onClick={() => deleteMessage(messages.id, cookies.mytoken)}>
                    {' '}
                    remove
                  </button>
                )}
              </p>
            </div>
          ))}
          <br />
          <input
            type="text"
            className="form-control"
            placeholder="add your message"
            id="message"
            value={body}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button
            className="btn-white"
            onClick={() => addMessage({ body, room: room?.id }, cookies.mytoken)}>
            Add
          </button>
        </div>
      </div>
      <div className="row-span-3 ">
        <p className="text-2xl font-bold">Participants: </p>
        {room?.participants.map((participants) => (
          <div>
            <p className="text-small">
              {participants.name}
              {user.user.name === participants.name && <h> (you)</h>}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RoomPage;

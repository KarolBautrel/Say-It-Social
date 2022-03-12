import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { addMessage, deleteMessage } from '../components/Utils';
import { Link } from 'react-router-dom';
const RoomPage = () => {
  const { id } = useParams();
  const [room, setRoom] = useState(null);
  useEffect(() => {
    getRoom();
  }, [id]);
  const [body, setMessage] = useState('');
  const [cookies, _] = useCookies(['mytoken']);
  const [user] = useCookies(['user']);

  const getRoom = async () => {
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
              <p className="text-light font-bold">@{messages.user.name}</p>
              <p className="text-light">
                {messages.body}
                {user.user.name === messages.user.name && (
                  <button
                    className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                    onClick={() => deleteMessage(messages.id, cookies.mytoken)}>
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
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            onClick={() => addMessage({ body, room: room?.id }, cookies.mytoken)}>
            Add
          </button>
        </div>
      </div>
      <div className="row-span-3 ">
        <p className="text-2xl font-bold">Participants: </p>
        {room?.participants.map((participant) => (
          <div>
            <p className="text-small">
              <Link to={`/user/${participant.id}`}>
                <button>
                  {participant.name}
                  {user.user.name === participant.name && <h> (you)</h>}
                </button>
              </Link>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RoomPage;

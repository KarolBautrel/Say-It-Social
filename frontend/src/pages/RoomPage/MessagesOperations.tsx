import { useState } from 'react';
import { addMessage, deleteMessage } from '../../components/Utils';
import { RoomType, User, Message } from 'pages/RoomPage/types';

type MessageCreationProps = {
  room: RoomType;
  user: User;
  token: string;
};

export const MessagesOperations = ({ room, user, token }: MessageCreationProps) => {
  const [message, setMessage] = useState('');
  return (
    <div className="col-span-2 ">
      <br />
      <p className="text-xl font-bold">Conversation</p>
      {room?.messages.map((messages) => (
        <div key={messages.id}>
          <p className="text-light font-bold">@{messages.user.name}</p>
          <p className="text-light">
            {messages.body}
            {user.name === messages.user.name && (
              <button
                className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                onClick={() => deleteMessage(messages.id, token)}>
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
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        onClick={() => addMessage({ body: message, room: room?.id }, token)}>
        Add
      </button>
    </div>
  );
};

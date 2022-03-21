import { useState } from 'react';
import { addMessage, deleteMessage } from '../../Utils/Utils';
import { RoomType, User, Message } from 'pages/RoomPage/types';
import { Button } from 'antd';

type MessageCreationProps = {
  room: RoomType;
  user: User;
  token: string;
};

export const MessagesOperations = ({ room, user, token }: MessageCreationProps) => {
  const [message, setMessage] = useState('');

  let url = `ws://127.0.0.1:8000/ws/socket-server/`;
  const chatSocket = new WebSocket(url);

  chatSocket.onmessage = function (e) {
    let data = JSON.parse(e.data);
    console.log('Data', data);

    if (data.type === 'chat') {
      let messages = document.getElementById('messages');
      messages?.insertAdjacentHTML('beforeend', `<p>${data.message}</p>`);
    }
  };
  const onAddMessage = () => {
    addMessage({ body: message, room: room?.id }, token),
      chatSocket.send(
        JSON.stringify({
          message: message
        })
      );
  };

  message;
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
              <Button type="link" danger onClick={() => deleteMessage(messages.id, token)}>
                remove
              </Button>
            )}
          </p>
        </div>
      ))}
      <br />
      <textarea
        className="form-control"
        placeholder="add your message"
        id="message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <Button onClick={onAddMessage}>Add</Button>
    </div>
  );
};

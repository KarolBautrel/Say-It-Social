import { useState } from 'react';
import { addMessage, deleteMessage } from '../../Utils/Utils';
import { RoomType, User, Message } from 'pages/RoomPage/types';
import { Button } from 'antd';

type MessageCreationProps = {
  room: RoomType;
  user: User;
  token: string;
};

export const MessagesOperations = ({
  room,
  user,
  token,
  chatSocket,
  messagesFromWeb,
  setStatus
}: MessageCreationProps) => {
  const [message, setMessage] = useState('');

  const onAddMessage = async () => {
    setStatus('pending');
    await addMessage({ body: message, room: room?.id }, token);
    setStatus('success');
  };
  return (
    <div className="col-span-2 ">
      <br />
      <p className="text-xl font-bold">Conversation</p>
      {messagesFromWeb.map((messages) => (
        <div key={messages.id}>
          <p className="text-light font-bold">@{messages.user}</p>
          <p className="text-light">
            {messages.body}
            {user.id === messages.user && (
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

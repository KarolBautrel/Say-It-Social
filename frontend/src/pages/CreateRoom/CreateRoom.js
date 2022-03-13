import React, { useState, useEffect } from 'react';

import { useCookies } from 'react-cookie';
import { TopicList } from './TopicList';
import { CreateRoomForm } from './CreateRoomForm';

function CreateRoom() {
  const [token] = useCookies(['mytoken']);
  const [topicId, setTopicId] = useState('');
  const getTopicId = (topic) => setTopicId(topic);

  return (
    <div className="w-full max-w-xs">
      <h1>Create your room</h1>
      <TopicList token={token} getTopicId={getTopicId} />
      <CreateRoomForm token={token} topicId={topicId} />
    </div>
  );
}
export default CreateRoom;

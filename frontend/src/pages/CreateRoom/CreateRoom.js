import React, { useState, useEffect } from 'react';

import { useCookies } from 'react-cookie';
import { TopicList } from './TopicList';
import { RoomForm } from './RoomForm';

function CreateRoom() {
  const [token] = useCookies(['mytoken']);
  const [topicName, setTopicName] = useState('');

  const getTopicName = (topic) => setTopicName(topic);

  return (
    <div className="w-full max-w-xs">
      <h1>Create your room</h1>
      <TopicList token={token} getTopicName={getTopicName} />
      <RoomForm token={token} topicName={topicName} />
    </div>
  );
}
export default CreateRoom;

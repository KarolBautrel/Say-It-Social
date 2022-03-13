import React, { useState } from 'react';
import { Navbar } from '../../components/Navbar';
import { useCookies } from 'react-cookie';
import { TopicList } from './TopicList';
import { CreateRoomForm } from './CreateRoomForm';
import { CheckUserAuth } from '../../pages/CheckUserAuth';

function CreateRoom() {
  const [token] = useCookies(['mytoken']);
  const [topicId, setTopicId] = useState('');
  const getTopicId = (topic) => setTopicId(topic);

  return (
    <>
      <CheckUserAuth>
        <Navbar />
        <div className="w-full max-w-xs">
          <h1>Create your room</h1>
          <TopicList token={token} getTopicId={getTopicId} />
          <CreateRoomForm token={token} topicId={topicId} />
        </div>
      </CheckUserAuth>
    </>
  );
}
export default CreateRoom;

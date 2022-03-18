import React, { useState } from 'react';
import { Navbar } from '../../components/layout/Navigation/Navbar';
import { useCookies } from 'react-cookie';
import { TopicList } from './TopicList';
import { CreateRoomForm } from './CreateRoomForm';
import { CheckUserAuth } from '../CheckUserAuth';

function CreateRoom() {
  const [token] = useCookies(['mytoken']);
  const [topicId, setTopicId] = useState('');
  const updateTopicId = (topic: string) => setTopicId(topic);
  console.log(topicId);
  const tokenId = token.mytoken;

  return (
    <CheckUserAuth>
      <Navbar />
      <div className="w-full max-w-xs">
        <h1>Create your room</h1>
        <TopicList token={tokenId} updateTopicId={updateTopicId} />
        <CreateRoomForm token={tokenId} topicId={topicId} />
      </div>
    </CheckUserAuth>
  );
}
export default CreateRoom;

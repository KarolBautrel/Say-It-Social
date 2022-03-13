import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { Participants } from './Participants';
import { MessagesOperations } from './MessagesOperations.js';
import { Navbar } from '../../components/Navbar';
import { CheckUserAuth } from '../../pages/CheckUserAuth';

const RoomPage = () => {
  const { id } = useParams();
  const [room, setRoom] = useState(null);
  useEffect(() => {
    getRoom();
  }, [id]);
  const [token] = useCookies(['mytoken']);
  const [user] = useCookies(['user']);
  const tokenId = token.mytoken;
  const getRoom = async () => {
    const response = await fetch(`/api/room/${id}`);
    const data = await response.json();
    setRoom(data);
  };

  return (
    <>
      <CheckUserAuth>
        <Navbar />
        <div className="grid grid-rows-2 grid-flow-col gap-2">
          <div className="grid justify-items-start">
            <div className="row-span-2 ">
              <p className="text-xl">{room?.name}</p>
              <p className="text-lg">{room?.description}</p>
            </div>

            <MessagesOperations token={tokenId} room={room} user={user} />
          </div>
          <div className="row-span-3 ">
            <Participants room={room} user={user} />
          </div>
        </div>
      </CheckUserAuth>
    </>
  );
};

export default RoomPage;

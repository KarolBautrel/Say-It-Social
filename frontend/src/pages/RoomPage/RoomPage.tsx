import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { Participants } from './Participants';
import { MessagesOperations } from 'pages/RoomPage/MessagesOperations';
import { CheckUserAuth } from '../CheckUserAuth';
import { RoomType } from 'pages/RoomPage/types';
import { MainLayout } from 'components/layout/MainLayout/MainLayout';

const RoomPage = () => {
  const { id } = useParams();
  const [room, setRoom] = useState<RoomType>();
  null;
  useEffect(() => {
    getRoom();
  }, [id]);
  const [token] = useCookies(['mytoken']);
  const [userCookie] = useCookies(['user']);
  const tokenId = token.mytoken;
  const user = userCookie.user;
  const getRoom = async () => {
    const response = await fetch(`/api/room/${id}`);
    const data = await response.json();
    setRoom(data);
  };

  return (
    <>
      <CheckUserAuth>
        <MainLayout>
          <div className="grid grid-rows-2 grid-flow-col gap-2">
            <div className="grid justify-items-start">
              <div className="row-span-2 ">
                <p className="text-xl font-bold">{room?.name}</p>
                <p className="text-lg">{room?.description}</p>
              </div>
              {room && <MessagesOperations token={tokenId} room={room} user={user} />}
            </div>
            <div className="row-span-3 ">{room && <Participants room={room} user={user} />}</div>
          </div>
        </MainLayout>
      </CheckUserAuth>
    </>
  );
};

export default RoomPage;

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
  const [data, setData] = useState('');
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
  let url = `ws://127.0.0.1:8000/ws/socket-server/`;
  const chatSocket = new WebSocket(url);
  const [status, setStatus] = useState('idle');

  useEffect(() => {
    if (!chatSocket.readyState) {
      chatSocket.onmessage = function (e) {
        const data = JSON.parse(e.data);
        console.log('Data', data);
        setData(data);
      };
    }
  }, [status]);

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
              {room && (
                <MessagesOperations
                  token={tokenId}
                  room={room}
                  user={user}
                  messagesFromWeb={data.message}
                  setStatus={setStatus}
                />
              )}
            </div>
            <div className="row-span-3 ">{room && <Participants room={room} user={user} />}</div>
          </div>
        </MainLayout>
      </CheckUserAuth>
    </>
  );
};

export default RoomPage;

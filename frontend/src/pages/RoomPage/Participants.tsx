import { Link } from 'react-router-dom';
import { RoomType, User } from 'pages/RoomPage/types';

type ParticipantsType = {
  room: RoomType;
  user: User;
};

export const Participants = ({ user, room }: ParticipantsType) => {
  return (
    <div>
      <p className="text-2xl font-bold">Participants: </p>
      {room?.participants.map((participant) => (
        <div key={participant.id}>
          <p className="text-small">
            <Link to={`/user/${participant.id}`}>
              <button>
                {participant.name}
                {user.name === participant.name && ' (you)'}
              </button>
            </Link>
          </p>
        </div>
      ))}
    </div>
  );
};

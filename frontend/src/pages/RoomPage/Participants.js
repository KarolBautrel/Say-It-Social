import { Link } from 'react-router-dom';

export const Participants = ({ user, room }) => {
  return (
    <div>
      <p className="text-2xl font-bold">Participants: </p>
      {room?.participants.map((participant) => (
        <div>
          <p className="text-small">
            <Link to={`/user/${participant.id}`}>
              <button>
                {participant.name}
                {user.user.name === participant.name && <h> (you)</h>}
              </button>
            </Link>
          </p>
        </div>
      ))}
    </div>
  );
};

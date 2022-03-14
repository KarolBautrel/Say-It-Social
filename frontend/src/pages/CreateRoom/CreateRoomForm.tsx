import { useState } from 'react';
import { createRoom } from '../../components/Utils';
import { useNavigate } from 'react-router-dom';

type RoomFormProp = {
  token: string;
  topicId: string | number;
};

export const CreateRoomForm = ({ token, topicId }: RoomFormProp) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  return (
    <div>
      <div className="mb-3">
        <label htmlFor="name" className="form-label">
          Name
        </label>
        <br />
        <input
          type="name"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          placeholder="name"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="description" className="form-label">
          Description
        </label>
        <br />
        <input
          type="description"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          placeholder="description"
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <button
        onClick={() => createRoom({ name, description, topic: topicId }, token)}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
        Submit
      </button>
    </div>
  );
};
//.then(navigate('/')

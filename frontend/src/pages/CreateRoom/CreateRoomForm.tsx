import { useState } from 'react';
<<<<<<<< HEAD:frontend/src/pages/CreateRoom/CreateRoomForm.js
import { createRoom } from '../../components/Utils';
import { useNavigate } from 'react-router-dom';

export const CreateRoomForm = ({ token, topicId }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const navigate = useNavigate();
========
import { createRoom } from '../../Utils/Utils';

type RoomFormProps = {
  token: string;
  topicId: string | number;
};

export const CreateRoomForm = ({ token, topicId }: RoomFormProps) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

>>>>>>>> typescriptconf:frontend/src/pages/CreateRoom/CreateRoomForm.tsx
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
<<<<<<<< HEAD:frontend/src/pages/CreateRoom/CreateRoomForm.js
        onClick={() => createRoom({ name, description, topic: topicId }, token.mytoken)}
========
        onClick={() => createRoom({ name, description, topic: topicId }, token)}
>>>>>>>> typescriptconf:frontend/src/pages/CreateRoom/CreateRoomForm.tsx
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
        Submit
      </button>
    </div>
  );
};
//.then(navigate('/')

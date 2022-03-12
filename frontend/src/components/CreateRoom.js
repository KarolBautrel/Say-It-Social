import React, { useState, useEffect } from 'react';
import { newRoom } from '../components/Utils';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
function CreateRoom() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [topicsList, setTopicsList] = useState([]);
  const [topicName, setTopicName] = useState('');
  const [token] = useCookies(['mytoken']);
  const navigate = useNavigate();
  useEffect(() => {
    getTopic();
  }, []);

  const getTopic = async () => {
    const response = await fetch('api/topics', {
      headers: {
        Authorization: `Token ${token.mytoken}`
      }
    });
    const data = await response.json();
    setTopicsList(data);
  };
  return (
    <div className="w-full max-w-xs">
      <h1>Create your room</h1>
      <div className="mb-3">
        <label htmlFor="topics" className="form-label"></label>

        <select value={topicName} onChange={(e) => setTopicName(e.target.value)}>
          <option defaultValue="1">---</option>
          {topicsList && topicsList.map((topic) => <option value={topic.id}>{topic.topic}</option>)}
        </select>
        <br />
      </div>
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
        onClick={() =>
          newRoom({ name, description, topic: topicName }, token.mytoken).then(navigate('/'))
        }
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
        Submit
      </button>
    </div>
  );
}

export default CreateRoom;

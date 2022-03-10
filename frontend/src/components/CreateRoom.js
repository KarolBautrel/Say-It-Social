import React, { useState, useEffect } from 'react';
import APIService from '../components/APIService';
import { newRoom } from '../components/Utils';
import { useCookies } from 'react-cookie';
import { useParams } from 'react-router-dom';

function CreateRoom() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [topicsList, setTopicsList] = useState([]);
  const [topic, setTopicname] = useState('');
  const [token] = useCookies(['mytoken']);
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
    <div className="Login">
      <br />
      <br />
      <h1>Create your room</h1>
      <div className="mb-3">
        <label htmlFor="topics" className="form-label"></label>

        <select value={topic} onChange={(e) => setTopicname(e.target.value)}>
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
          className="form-control"
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
          className="form-control"
          placeholder="description"
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <button
        onClick={() => newRoom({ name, description, topic }, token.mytoken)}
        className="Submit">
        Submit
      </button>
    </div>
  );
}

export default CreateRoom;

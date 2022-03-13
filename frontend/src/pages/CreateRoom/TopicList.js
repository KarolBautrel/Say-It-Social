import React, { useState, useEffect } from 'react';

export const TopicList = ({ token, getTopicName }) => {
  const [topicsList, setTopicsList] = useState([]);
  const [topicName, setTopicName] = useState('');
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
    <div className="mb-3">
      <label htmlFor="topics" className="form-label"></label>

      <select value={topicName} onChange={(e) => getTopicName(e.target.value)}>
        <option defaultValue="1">---</option>
        {topicsList && topicsList.map((topic) => <option value={topic.id}>{topic.topic}</option>)}
      </select>
      <br />
    </div>
  );
};

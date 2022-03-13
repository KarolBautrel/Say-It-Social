import React, { useState, useEffect } from 'react';

export const TopicList = ({ token, getTopicId }) => {
  const [topicsList, setTopicsList] = useState([]);
  const [topicId, setTopicName] = useState('');
  useEffect(() => {
    getTopic();
  }, []);

  const onTopicToggle = (event) => {
    console.log(event);
    const { value, topic } = event.target;
    getTopicId(value);
    setTopicName(topic);
  };

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

      <select value={topicId} onChange={(event) => onTopicToggle(event)}>
        <option defaultValue="1">---</option>
        {topicsList?.map((topic) => (
          <option value={topic.id}>{topic.topic}</option>
        ))}
      </select>
      <br />
    </div>
  );
};

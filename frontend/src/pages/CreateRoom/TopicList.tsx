import React, { useState, useEffect, ChangeEvent } from 'react';
import { TopicListType } from 'pages/CreateRoom/types';

export type TopicProp = {
  token: string;
  updateTopicId: (data: string) => void;
};

export const TopicList = ({ token, updateTopicId }: TopicProp) => {
  const [topicsList, setTopicsList] = useState<TopicListType[]>([]);

  useEffect(() => {
    getTopics();
  }, []);

  const onTopicToggle = (event: ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;
    updateTopicId(value);
  };

  const getTopics = async () => {
    const response = await fetch('api/topics', {
      headers: {
        Authorization: `Token ${token}`
      }
    });
    const data = await response.json();
    setTopicsList(data);
  };

  return (
    <div className="mb-3">
      <label htmlFor="topics" className="form-label"></label>

      <select onChange={(event) => onTopicToggle(event)}>
        <option defaultValue="1">---</option>
        {topicsList?.map((topic) => (
          <option key={topic.id} value={topic.id}>
            {topic.topic}
          </option>
        ))}
      </select>
      <br />
    </div>
  );
};

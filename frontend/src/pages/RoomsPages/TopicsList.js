import { useState, useEffect } from 'react';

export const TopicsList = ({ token, onFilterSuccess }) => {
  const [topics, setTopic] = useState([]);

  useEffect(() => {
    getTopic();
  }, []);

  const filterRooms = async (topic) => {
    const response = await fetch(`api/rooms?topic=${topic}`);
    const data = await response.json();
    onFilterSuccess(data);
  };

  const getTopic = async () => {
    const response = await fetch('api/topics', {
      headers: {
        Authorization: `Token ${token.mytoken}`
      }
    });
    const data = await response.json();
    setTopic(data);
  };

  return (
    <div className="row-span-3 ">
      <p className="text-2xl">Browse Topics</p>
      {topics?.map((topic) => (
        <p>
          <button defaultValue="" onClick={() => filterRooms(topic.id, token.mytoken)}>
            {topic.topic}
          </button>
        </p>
      ))}
      <button defaultValue="" onClick={() => filterRooms('', token.mytoken)}>
        All
      </button>
    </div>
  );
};

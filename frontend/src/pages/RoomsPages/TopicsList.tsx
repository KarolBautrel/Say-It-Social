import { useState, useEffect } from 'react';
import { ExactRoom, Token } from 'pages/RoomsPages/types';

type TopicsListType = {
  token: string;
  onFilterSuccess: (data: ExactRoom[]) => void;
};

type Topic = {
  id: number;
  topic: string;
};

export const TopicsList = ({ token, onFilterSuccess }: TopicsListType) => {
  const [topics, setTopic] = useState<Topic[]>([]);

  useEffect(() => {
    getTopic();
  }, []);

  const filterRooms = async (topic: number | string) => {
    const response = await fetch(`api/rooms?topic=${topic}`);
    const data = await response.json();
    onFilterSuccess(data);
  };

  const getTopic = async () => {
    const response = await fetch('api/topics', {
      headers: {
        Authorization: `Token ${token}`
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
          <button defaultValue="" onClick={() => filterRooms(topic.id)}>
            {topic.topic}
          </button>
        </p>
      ))}
      <button defaultValue="" onClick={() => filterRooms('')}>
        All
      </button>
    </div>
  );
};

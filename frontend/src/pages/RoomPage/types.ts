export type User = {
  id: number;
  name: string;
  username: string;
  email: string;
};

export type Message = {
  id: number;
  user: User;
  room: string | number;
  body: string;
  created: string;
};

export type RoomType = {
  id: number;
  name: string;
  description: string;
  topic: string | number;
  host: User;
  messages: Message[];
  participants: User[];
};

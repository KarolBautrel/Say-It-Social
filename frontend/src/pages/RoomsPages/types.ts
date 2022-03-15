export type ExactRoom = {
  id: number;
  name: string;
  description: string;
  topic: string | number;
  host: ExactRoomHost;
  messages: Message[];
  participants: User[];
};

export type ExactRoomHost = {
  id: number;
  name: string;
  email: string;
  bio: string;
};

type Message = {
  id: number;
  user: User;
  room: string | number;
  body: string;
  created: string;
};

export type User = {
  id: number;
  username: string;
  name: string;
  email: string;
};

export type Token = {
  mytoken: string;
  user: User;
};

export type ExactRoom = {
  id: number;
  name: string;
  description: string;
  topic: string | number;
  host: ExactRoomHost;
  messages: Message[];
  participants: Participant[];
};

export type ExactRoomHost = {
  id: number;
  name: string;
  email: string;
  bio: string;
};

type Message = {
  id: number;
  user: any;
  room: string | number;
  body: string;
  created: string;
};

type Participant = {
  id: number;
  username: string;
  name: string;
  email: string;
};

export type Token = {
  mytoken: string;
  user: any;
};

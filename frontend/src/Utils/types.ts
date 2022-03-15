export type LoginProp = {
  email: string;
  password: string;
};

export type RegisterProp = {
  name: string;
  username: string;
  password: string;
  re_password: string;
  email: string;
};

export type CreateMessageProp = {
  body: string;
  room: string | number;
};

export type CreateRoomProp = {
  name: string;
  description: string;
  topic: number | string;
};

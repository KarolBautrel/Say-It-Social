export type LoginConfiguration = {
  email: string;
  password: string;
};

export type RegisterConfiguration = {
  name: string;
  username: string;
  password: string;
  re_password: string;
  email: string;
};

export type CreateMessageConfiguration = {
  body: string;
  room: string | number;
};

export type CreateRoomConfiguration = {
  name: string;
  description: string;
  topic: number | string;
};

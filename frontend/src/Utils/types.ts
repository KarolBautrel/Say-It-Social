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

export type ChangeEmailConfiguration = {
  email: string;
  email2: string;
};

export type ChangePasswordConfiguration = {
  new_password: string;
  re_new_password: string;
  current_password: string;
};

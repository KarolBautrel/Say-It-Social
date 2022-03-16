import APIService from './Api/APIService';
import { CreateRoomConfiguration, CreateMessageConfiguration } from 'Utils/types';

export const onLogout = async (
  token: string,
  onSuccessToken: (name: 'mytoken') => void,
  onSuccessUser: (data: 'user') => void
) => {
  try {
    const response = await APIService.LogoutUser(token);
    console.log(onSuccessToken);
    console.log(onSuccessUser);
    if (response) {
      onSuccessToken('mytoken');
      onSuccessUser('user');
    }
  } catch (error) {
    console.error(error);
  }
};

export const addMessage = async ({ body, room }: CreateMessageConfiguration, token: string) => {
  const response = await APIService.createMessage({ body, room }, token);
  return response;
};

export const deleteMessage = async (messageId: number, token: string) => {
  const response = await APIService.deleteMessage(messageId, token);
  return response;
};

export const createRoom = async (
  { name, description, topic }: CreateRoomConfiguration,
  token: string
) => {
  const response = await APIService.createRoom({ name, description, topic }, token);
  return response;
};

export const getUserData = async (token: string) => {
  const response = await fetch('api/users/me', {
    headers: {
      Authorization: `Token ${token}`
    }
  });
  const data = await response.json();
  return data;
};

export const updateUser = async (id: number, token: string, bio: string) => {
  const response = await APIService.updateUser(id, token, bio);
  return response;
};

import APIService from './APIService';
import { CreateMessageProp, CreateRoomProp } from 'components/types';

export const onLogout = async (token: string, onSuccessToken, onSuccessUser) => {
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

export const addMessage = async ({ body, room }: CreateMessageProp, token: string) => {
  const response = await APIService.createMessage({ body, room }, token);
  return response;
};

export const deleteMessage = async (messageId: number, token: string) => {
  const response = await APIService.deleteMessage(messageId, token);
  return response;
};

export const createRoom = async ({ name, description, topic }: CreateRoomProp, token: string) => {
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

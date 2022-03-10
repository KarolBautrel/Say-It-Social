import APIService from '../components/APIService';
import { useNavigate } from 'react-router-dom';

export const onLogout = async (token, user, onSuccessToken, onSuccessUser) => {
  try {
    console.log(user);
    console.log(token);
    const response = await APIService.LogoutUser(token);
    if (response.ok) {
      onSuccessToken('mytoken');
      onSuccessUser('user');
    }
    console.log(response);
  } catch (error) {
    console.error(error);
  }
};

export const addMessage = async ({ body, room }, token) => {
  const response = await APIService.messageCreation({ body, room }, token);
  return response;
};

export const deleteMessage = async (message, token) => {
  const response = await APIService.messageDelete(message, token);
  return response;
};

export const newRoom = async ({ name, description, topic }, token) => {
  const response = await APIService.roomCreation({ name, description, topic }, token);
  return response;
};

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
  const response = await APIService.createMessage({ body, room }, token);
  return response;
};

export const deleteMessage = async (messageId, token) => {
  const response = await APIService.deleteMessage(messageId, token);
  return response;
};

export const newRoom = async ({ name, description, topic }, token) => {
  const response = await APIService.createRoom({ name, description, topic }, token);
  return response;
};

export const getUserData = async (token) => {
  const response = await fetch('api/users/me', {
    headers: {
      Authorization: `Token ${token}`
    }
  });
  const data = await response.json();
  return data;
};

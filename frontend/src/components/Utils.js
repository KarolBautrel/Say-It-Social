import APIService from '../components/APIService';

export const onLogout = async (token, user, onSuccessToken, onSuccessUser) => {
  try {
    const response = await APIService.LogoutUser(token);
    if (response.ok) {
      onSuccessToken('mytoken');
      onSuccessUser('user');
    }
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

export const createRoom = async ({ name, description, topic }, token) => {
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

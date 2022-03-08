import APIService from '../components/APIService';

export const onLogout = async (cookie, user, onSuccessToken, onSuccessUser) => {
  try {
    console.log(user);
    console.log(cookie);
    const response = await APIService.LogoutUser(cookie);
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

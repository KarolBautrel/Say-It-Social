import APIService from './Api/APIService';
import {
  CreateRoomConfiguration,
  CreateMessageConfiguration,
  ChangeEmailConfiguration,
  ChangePasswordConfiguration
} from 'Utils/types';

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

export const ChangeUserMail = async (
  id: number,
  token: string,
  { email, re_email }: ChangeEmailConfiguration
) => {
  const response = await APIService.ChangeEmail(id, token, { email, re_email });
  return response;
};

export const ChangeUserPassword = async (
  token: string,
  { new_password, re_new_password, current_password }: ChangePasswordConfiguration
) => {
  const response = await APIService.ChangePassword(token, {
    new_password,
    re_new_password,
    current_password
  });
  return response;
};

export const AcceptFriendRequest = async (token: string, id: number) => {
  const response = await APIService.AcceptFriendRequest(token, id);
  return response;
};

export const RejectFriendRequest = async (token: string, id: number) => {
  const response = await APIService.RejectFriendRequest(token, id);
  return response;
};

export const DeleteFromFriends = async (token: string, id: number) => {
  const response = await APIService.DeleteFromFriends(token, id);
  return response;
};

export const getRequestUserData = async () => {
  const response = await fetch(`/api/user/${requestUser}`);
  const data = await response.json();
  return data;
};

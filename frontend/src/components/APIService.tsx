import { LoginProp, RegisterProp, CreateMessageProp, CreateRoomProp } from 'components/types';

export default class APIService {
  static LoginUser({ email, password }: LoginProp) {
    return fetch('/api/token/login/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    })
      .then((resp) => resp.json())
      .catch((error) => console.error(`Login user error: ${error}`));
  }

  static RegisterUser({ name, username, password, re_password, email }: RegisterProp) {
    return fetch('/api/users/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, username, password, re_password, email })
    })
      .then((resp) => resp.json())
      .catch((error) => console.error(`Register user error: ${error}`));
  }

  static LogoutUser(token: string) {
    return fetch('/api/token/logout/', {
      method: 'POST',
      headers: {
        Authorization: `Token ${token}`
      }
    }).catch((error) => console.error(`Logout user error: ${error}`));
  }

  static createMessage({ body, room }: CreateMessageProp, token: string) {
    return fetch('/api/create_message', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${token}`
      },
      body: JSON.stringify({
        body,
        room
      })
    })
      .then((resp) => resp.json())
      .catch((error) => console.error(`Error during message creation: ${error}`));
  }

  static deleteMessage(messageId: string | number, token: string) {
    return fetch(`/api/delete_message/${messageId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Token ${token}`
      }
    }).catch((error) => console.error(`Error during message deleting: ${error}`));
  }

  static createRoom({ name, description, topic }: CreateRoomProp, token: string) {
    return fetch('/api/create_room', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${token}`
      },
      body: JSON.stringify({ name, description, topic })
    }).catch((error) => console.error(`Error during room creation: ${error}`));
  }
}

export default class APIService {
  static LoginUser(body) {
    return fetch('/api/token/login/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    }).then((resp) => resp.json());
  }

  static RegisterUser(body) {
    return fetch('/api/users/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    }).then((resp) => resp.json());
  }

  static LogoutUser(cookie) {
    console.log(cookie);
    return fetch('/api/token/logout/', {
      method: 'POST',
      headers: {
        Authorization: `Token ${cookie}`
      }
    });
  }

  static messageCreation(body, token) {
    console.log(body);
    return fetch('/api/create_message', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${token}`
      },
      body: JSON.stringify({
        room: body.room,
        body: body.body
      })
    }).then((resp) => resp.json());
  }

  static messageDelete(message, token) {
    return fetch(`/api/delete_message/${message}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Token ${token}`
      }
    });
  }

  static roomCreation(body, token) {
    console.log(body);
    return fetch('/api/create_room', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${token}`
      },
      body: JSON.stringify({
        name: body.name,
        description: body.description,
        topic: body.topic
      })
    });
  }
}

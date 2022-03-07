import token from '../components/Login';

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
    return fetch('/api/token/logout/', {
      method: 'POST',
      headers: {
        Authorization: `Token ${cookie}`
      }
    });
  }
}

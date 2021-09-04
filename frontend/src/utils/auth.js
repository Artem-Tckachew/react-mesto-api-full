import {getResponse} from './utils';
class Auth {
  constructor({address, headers, token}) {
    this._address = address;
    this._headers = headers;
    this._token = token;
  }

register(email, password) {
  return fetch(`${this._address}/signup`, {
    method: 'POST',
    headers: this._headers,
    credentials: "include",
    body: JSON.stringify({
      email,
      password
    }),
  })
  .then(getResponse)
};

login(email, password) {
  return fetch(`${this._address}/signin`, {
    method: 'POST',
    headers: this._headers,
    credentials: "include",
    body: JSON.stringify({
      email: email,
      password: password,
    }),
  })
  .then(getResponse)
};

getContent() {
  return fetch(`${this._address}/users/me`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: "include",
  }).then(getResponse)
}

logout() {
  return fetch(`${this._address}/signout`, {
    method: 'DELETE',
    credentials: 'include',
    headers: {
      "Content-Type": "application/json",
    }
  })
}
}

const auth = new Auth({
  address: 'https://artemtkachev.backend.nomoredomains.monster',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

export default auth;
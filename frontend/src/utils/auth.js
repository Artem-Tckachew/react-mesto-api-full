import {getResponse} from './utils';

class Auth {
  constructor({address, headers, token}) {
    this._address = address;
    this._headers = headers;
    this._token = token;
  }

register(email, password) {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
      headers: this._headers,
      credentials: "include",
    body: JSON.stringify({email, password})
  })
  .then(getResponse)
};

login(email, password) {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: this._headers,
    credentials: "include",
    body: JSON.stringify({email, password})
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

signOut = () => {
  return fetch(`${this._address}/signout`, {
    method: "DELETE",
    credentials: "include",
  }).then(getResponse)
};
}

const auth = new Auth({
  address: 'http://artemtkachev.backend.nomoredomains.monster',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

export default auth;
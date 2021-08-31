import {getResponse} from './utils';

class Auth {
  constructor({address}) {
    this._address = address;
    this._headers = headers;
  }

register(email, password) {
  return fetch(`${this._address}/signup`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      "Content-Type": "application/json" 
    },
    body: JSON.stringify({email, password})
  })
  .then(getResponse)
  .then((res) => {
    return res;
})
.catch((err) => console.log(err));
}

login(email, password) {
  return fetch(`${this._address}/signin`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      "Content-Type": "application/json" 
    },
    body: JSON.stringify({email, password})
  })
  .then(getResponse)
};

getContent() {
  return fetch(`${this._address}/users/me`, {
    method: 'GET',
    credentials: 'include',
    headers: {
      'Accept': 'application/json',
      "Content-Type": "application/json",
    }
  }).then(getResponse)
  .then(data => data)
}

signOut = () => {
  return fetch(`${this._address}/signout`, {
    method: 'DELETE',
    credentials: 'include',
    headers: {
      "Content-Type": "application/json",
    }
  }).then(getResponse)
};
}

const auth = new Auth({
  address: 'http://artemtkachev.backend.nomoredomains.monster',
});

export default auth;
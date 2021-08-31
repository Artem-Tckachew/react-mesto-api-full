import {getResponse} from './utils';
const adress = 'http://artemtkachev.backend.nomoredomains.monster',

export const register = (email, password) => {
  return fetch(`${adress}/signup`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      "Content-Type": "application/json" 
    },
    body: JSON.stringify({password, email})
  })
  .then (getResponse)
  .then((res) => {
    return res;
  })
  .catch((err) => console.log(err));
}

export const login = (email, password) => {
  return fetch(`${adress}/signin`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      "Content-Type": "application/json" 
    },
    body: JSON.stringify({password, email})
  })
  .then (getResponse)
}

export const getContent = () => {
  return fetch(`${adress}/users/me`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Accept': 'application/json',
        "Content-Type": "application/json",
      }
    }).then(getResponse)
    .then(data => data)
  }

  export const signOut = () => {
    return fetch(`${BASE_URL}signout`, {
      method: 'DELETE',
      credentials: 'include',
      headers: {
        "Content-Type": "application/json",
      }
    })
  }

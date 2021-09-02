import {getResponse} from './utils';

const BASE_URL = 'https://artemtkachev.backend.nomoredomains.monster';

export const register = (email, password) => {
  return fetch(`${BASE_URL}/signup`, {
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
};
export const login = (email, password) => {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      "Content-Type": "application/json" 
    },
    body: JSON.stringify({email, password})
  })
  .then(getResponse)
};

export const getContent = () => {
  return fetch(`${BASE_URL}/users/me`, {
    credentials: 'include',
    headers: {
      'Accept': 'application/json',
      "Content-Type": "application/json",
    }
  }).then(getResponse)
}

export const logout = () => {
  return fetch(`${BASE_URL}/signout`, {
    method: 'DELETE',
    credentials: 'include',
    headers: {
      "Content-Type": "application/json",
    }
  })
}

export const checkToken = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    }
  })
  .then(getResponse)
}
const BASE_URL = 'http://artemtkachev.backend.nomoredomains.monster',

function checkResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`)
}

export const register = (password, email) => {
  return fetch(`${BASE_URL}signup`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      "Content-Type": "application/json" 
    },
    body: JSON.stringify({password, email})
  })
  
  .then (res=>checkResponse(res))
  .then((res) => {
    return res;
  })
  .catch((err) => console.log(err));
}

export const login = (password, email) => {
  return fetch(`${BASE_URL}signin`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      "Content-Type": "application/json" 
    },
    body: JSON.stringify({password, email})
  })
  .then (res=>checkResponse(res))
}


export const getContent = () => {
  return fetch(`${BASE_URL}users/me`, {
    method: 'GET',
    credentials: 'include',
    headers: {
      'Accept': 'application/json',
      "Content-Type": "application/json",
    }
  }).then(res => checkResponse(res))
  .then(data => data)
}

export const logout = () => {
  return fetch(`${BASE_URL}signout`, {
    method: 'DELETE',
    credentials: 'include',
    headers: {
      "Content-Type": "application/json",
    }
  })
}
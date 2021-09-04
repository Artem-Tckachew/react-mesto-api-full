import {options} from './constants'
import {getResponse} from './utils';
class Api {
  constructor(options) {
    this._headers = options.headers;
    this._url = options.url;
  }

  getInitialCards(token) {
    return fetch(`${this._url}/cards`, {
        headers: {
            'Accept': 'application/json',
            'Content-type': 'application/json',
            Authorization: `Bearer ${token}`
        },
    })
      .then(getResponse)
  }

  addCard(data, token) {
    return fetch(`${this._url}/cards`, {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
            name: data.name,
            link: data.link
        })
    })
    .then(getResponse)
  }

  deleteCard(cardId, token) {
    return fetch(`${this._url}/cards/${cardId}`, {
        method: "DELETE",
        headers: {
            'Accept': 'application/json',
            'Content-type': 'application/json',
            Authorization: `Bearer ${token}`
        },
    })
    .then(getResponse)
  }

  getUserData(token) {
    return fetch(`${this._url}/users/me`, {
      headers: {
          'Accept': 'application/json',
          'Content-type': 'application/json',
          Authorization: `Bearer ${token}`
      },

  })
    .then(getResponse)
  }

  setUserData(data, token) {
    return fetch(`${this._url}/users/me`, {
        method: "PATCH",
        headers: {
            'Accept': 'application/json',
            'Content-type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
            name: data.name,
            about: data.about
        })
    })
    .then(getResponse)
  }

  setUserAvatar(data, token) {
    return fetch(`${this._url}/users/me/avatar`, {
        method: 'PATCH',
        headers: {
            'Accept': 'application/json',
            'Content-type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
            avatar: data.avatar,
        })
    })
    .then(getResponse)
  }

  postLike(cardId, token) {
    return fetch(`${this._url}/cards/${cardId}/likes`,
        {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json',
                Authorization: `Bearer ${token}`
            },
        })
      .then(getResponse)
  }

  deleteLike(cardId, token) {
    return fetch(`${this._url}/cards/${cardId}/likes`,
        {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json',
                Authorization: `Bearer ${token}`
            },
        })
      .then(getResponse)
  }

}

const api = new Api(options);
export default api;

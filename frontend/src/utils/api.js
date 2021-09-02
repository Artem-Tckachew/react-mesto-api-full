import {getResponse} from './utils';
class Api {
  constructor({ address, headers }) {
    this._address = address;
    this._headers = headers;
  }

  getInitialCards() {
    return fetch(`${this._address}/cards`, {
      method: 'GET',
      headers: this._headers,
      credentials: 'include',
    })
      .then(getResponse)
  }

  addCard(card) {
    return fetch(`${this._address}/cards`, {
      method: 'POST',
      headers: this._headers,
      credentials: 'include',
      body: JSON.stringify({
        name: card.name,
        link: card.link
      })
    })
    .then(getResponse)
  }

  deleteCard(cardId) {
    return fetch(`${this._address}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this._headers,
      credentials: 'include',
    })
    .then(getResponse)
  }

  getUserData() {
    return fetch(`${this._address}/users/me`, {
      method: 'GET',
      headers: this._headers,
      credentials: 'include',
    })
    .then(getResponse)
  }

  setUserData({name, about}) {
    return fetch(`${this._address}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      credentials: 'include',
      body: JSON.stringify({
        name,
        about
      })
    })
    .then(getResponse)
  }

  setUserAvatar({avatar}) {
    return fetch(`${this._address}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      credentials: 'include',
      body: JSON.stringify({
        avatar
      })
    })
    .then(getResponse)
  }

  changeLike(cardId, like) {
    return fetch(`${this._address}/cards/${cardId}/likes`, {
      method: like ? 'PUT' : 'DELETE',
      credentials: 'include',
    })
    .then(getResponse)
  }

  postLike(cardId) {
    return fetch(`${this._address}/cards/${cardId}/likes`, {
        method: 'PUT',
        headers: this._headers,
      credentials: 'include',
      })
      .then(getResponse)
  }

  deleteLike(cardId) {
    return fetch(`${this._address}/cards/${cardId}/likes`, {
        method: 'DELETE',
        headers: this._headers,
        credentials: 'include',
      })
      .then(getResponse)
  }

}

const api = new Api({
  address: 'https://artemtkachev.backend.nomoredomains.monster',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;

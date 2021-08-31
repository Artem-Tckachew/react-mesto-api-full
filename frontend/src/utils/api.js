import {options} from './constants'
import {getResponse} from './utils';
class Api {
  constructor({ address }) {
    this._address = address;
  }

  getUserData() {
    return fetch(`${this._address}/users/me`, {
      credentials: 'include',
    })
    .then(getResponse)
  }

  getInitialCards() {
    return fetch(`${this._address}/cards`, {
      credentials: 'include',
    })
      .then(getResponse)
  }

  addCard(card) {
    return fetch(`${this._address}/cards`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
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
      credentials: 'include',
    })
    .then(getResponse)
  }

  setUserData(data) {
    return fetch(`${this._address}/users/me`, {
      method: 'PATCH',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: data.name,
        about: data.about
      })
    })
    .then(getResponse)
  }

  setUserAvatar({avatar}) {
    return fetch(`${this._address}/users/me/avatar`, {
      method: 'PATCH',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        avatar
      })
    })
    .then(getResponse)
  }

  postLike(cardId) {
    return fetch(`${this._address}/cards/${cardId}/likes`,
      {
        method: 'PUT',
        credentials: 'include',
      })
      .then(getResponse)
  }

  deleteLike(cardId) {
    return fetch(`${this._address}/cards/${cardId}/likes`,
      {
        method: 'DELETE',
        credentials: 'include',
      })
      .then(getResponse)
  }
}

const api = new Api(options);
export default api;

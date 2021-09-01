import {options} from './constants'
import {getResponse} from './utils';
class Api {
  constructor({ address }) {

    this._address = address;
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

  getUserData() {
    return fetch(`${this._address}/users/me`, {
      credentials: 'include',
    })
    .then(getResponse)
  }

  setUserData({name, about}) {
    return fetch(`${this._address}/users/me`, {
      method: 'PATCH',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
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
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      },
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

}

const api = new Api(options);
export default api;

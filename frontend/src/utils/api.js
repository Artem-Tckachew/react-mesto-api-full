import {options} from './constants'
import {getResponse} from './utils';
class Api {
  constructor({ address, headers }) {
    this._headers = headers;
    this._address = address;
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

  setUserData(data) {
    return fetch(`${this._address}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      credentials: 'include',
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
      headers: this._headers,
      credentials: 'include',
      body: JSON.stringify({
        avatar
      })
    })
    .then(getResponse)
  }

  changeLike(cardId, like) {
    return fetch(`${this._address}/cards/likes/${cardId}`, {
      method: like ? 'PUT' : 'DELETE',
      headers: this._headers,
      credentials: 'include',
    })
    .then(getResponse)
  }

}

const api = new Api(options);
export default api;

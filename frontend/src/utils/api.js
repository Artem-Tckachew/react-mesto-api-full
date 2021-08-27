import {options} from './constants'
import {getResponse} from './utils';
class Api {
  constructor({ address, token, groupId }) {
    this._token = token;
    this._groupId = groupId;
    this._address = address;
  }

  getInitialCards() {
    return fetch(`${this._address}/${this._groupId}/cards`, {
      headers: {
        authorization: this._token
      }
    })
      .then(getResponse)
  }

  addCard(card) {
    return fetch(`${this._address}/${this._groupId}/cards`, {
      method: 'POST',
      headers: {
        authorization: this._token,
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
    return fetch(`${this._address}/${this._groupId}/cards/${cardId}`, {
      method: 'DELETE',
      headers: {
        authorization: this._token,
      }
    })
    .then(getResponse)
  }

  getUserData() {
    return fetch(`${this._address}/${this._groupId}/users/me`, {
      headers: {
        authorization: this._token
      }
    })
    .then(getResponse)
  }

  setUserData({name, about}) {
    return fetch(`${this._address}/${this._groupId}/users/me`, {
      method: 'PATCH',
      headers: {
        authorization: this._token,
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
    return fetch(`${this._address}/${this._groupId}/users/me/avatar`, {
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
    return fetch(`${this._address}/${this._groupId}/cards/likes/${cardId}`, {
      method: like ? 'PUT' : 'DELETE',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      }
    })
    .then(getResponse)
  }

}

const api = new Api(options);
export default api;

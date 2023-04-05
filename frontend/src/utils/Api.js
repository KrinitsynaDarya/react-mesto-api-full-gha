class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  /*выносим общий кусок для методов*/
  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, { headers: this._headers,
      credentials: 'include', // теперь куки посылаются вместе с запросом
     }).then(
      (res) => this._checkResponse(res)
    );
  }

  addNewCard(cardData) {
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: cardData.name,
        link: cardData.link,
      }),
      credentials: 'include', // теперь куки посылаются вместе с запросом
    }).then((res) => this._checkResponse(res));
  }

  deleteCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
      credentials: 'include', // теперь куки посылаются вместе с запросом
    }).then((res) => this._checkResponse(res));
  }

  addLike(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: "PUT",
      headers: this._headers,
      credentials: 'include', // теперь куки посылаются вместе с запросом
    }).then((res) => this._checkResponse(res));
  }

  removeLike(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: "DELETE",
      headers: this._headers,
      credentials: 'include', // теперь куки посылаются вместе с запросом
    }).then((res) => this._checkResponse(res));
  }

  changeLikeCardStatus(cardId, isLiked) {
    if (isLiked) {
      return this.removeLike(cardId);
    } else {
      return this.addLike(cardId);
    }
  }

  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
      credentials: 'include', // теперь куки посылаются вместе с запросом
    }).then((res) => this._checkResponse(res));
  }

  editUserInfo(userData) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: userData.name,
        about: userData.about,
      }),
      credentials: 'include', // теперь куки посылаются вместе с запросом
    }).then((res) => this._checkResponse(res));
  }

  editUserAvatar(userData) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: userData.avatar,
      }),
      credentials: 'include', // теперь куки посылаются вместе с запросом
    }).then((res) => this._checkResponse(res));
  }
}

const api = new Api({
  baseUrl: "http://api.mestoapp.krinitsyna.nomoredomains.work",
  headers: {
    authorization: "258a83b0-9c97-4384-ab74-1331eb2f1b83",
    "Content-Type": "application/json",
  },
});

export default api;

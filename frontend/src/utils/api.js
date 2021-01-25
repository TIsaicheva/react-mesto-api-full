class Api {
  constructor(config) {
    this._url = config.baseUrl;  
  }

  _handleResponse(res) {
    if (res.ok) {
      return res.json();
    } else return Promise.reject(`Ошибка: ${res.status}`);
  }

  setHeaders() {
    return {
      authorization: `Bearer ${localStorage.getItem("jwt")}`,
      "Content-Type": "application/json",
    };
  }

  getInitialCards() {  
    return fetch(`${this._url}/cards`, {
      method: "GET",
      headers: this.setHeaders(),
    }).then(this._handleResponse);  
  }

  addCard(data) {
    return fetch(`${this._url}/cards`, {
      method: "POST",
      headers: this.setHeaders(),
      body: JSON.stringify(data),
    }).then(this._handleResponse);
  }

  deleteCard(id) {
    return fetch(`${this._url}/cards/${id}`, {
      method: "DELETE",
      headers: this.setHeaders(),
    }).then(this._handleResponse);
  }

  changeAvatar(data) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: "PATCH",
      headers: this.setHeaders(),
      body: JSON.stringify(data),
    }).then(this._handleResponse);
  }

  getUserInfo() {
    return fetch(`${this._url}/users/me`, {
      method: "GET",
      headers: this.setHeaders(),
    }).then(this._handleResponse);
  }

  editUserInfo(data) {
    return fetch(`${this._url}/users/me`, {
      method: "PATCH",
      headers: this.setHeaders(),
      body: JSON.stringify(data),
    }).then(this._handleResponse);
  }

  likeCard(id) {
    return fetch(`${this._url}/cards/${id}/likes`, {
      method: "PUT",
      headers: this.setHeaders(),
    }).then(this._handleResponse);
  }

  disLikeCard(id) {
    return fetch(`${this._url}/cards/${id}/likes`, {
      method: "DELETE",
      headers: this.setHeaders(),
    }).then(this._handleResponse);
  }

  changeLikeCardStatus(cardId, status) {
    if (status) {
      return this.disLikeCard(cardId);
    } else {
      return this.likeCard(cardId);
    }
  }
}

const api = new Api({ baseUrl: 'http://localhost:3000' });

export default api;
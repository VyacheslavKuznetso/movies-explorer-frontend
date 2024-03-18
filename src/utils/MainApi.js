class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
  }
  // Проверка ответа сервера
  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  getFavoredMoves() {
    return fetch(`${this._baseUrl}/movies`, {
      method: "GET",
      headers: {
        'Authorization': `Bearer ${localStorage.jwt}`,
        'Content-Type': 'application/json',
      },
    })
      .then(this._checkResponse);
  }

  removeFavoredMoves(id) {
    return fetch(`${this._baseUrl}/movies/${id}`, {
      method: "DELETE",
      headers: {
        'Authorization': `Bearer ${localStorage.jwt}`,
        'Content-Type': 'application/json',
      },
    })
      .then(this._checkResponse);
  }

  addFavoredMoves(data) {
    return fetch(`${this._baseUrl}/movies`, {
      method: "POST",
      headers: {
        'Authorization': `Bearer ${localStorage.jwt}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        movieId: data.id,
        country: data.country,
        description: data.description,
        director: data.director,
        duration: data.duration,
        image: `https://api.nomoreparties.co${data.image.url}`,
        nameEN: data.nameEN,
        nameRU: data.nameRU,
        trailerLink: data.trailerLink,
        year: data.year,
        thumbnail: `https://api.nomoreparties.co${data.image.formats.thumbnail.url}`,
      }),
    })
      .then(this._checkResponse);
  }

  login({ email, password }) {
    return fetch(`${this._baseUrl}/signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password })
    })
      .then(this._checkResponse)
      .then((response) => {
        if (response.token) {
          localStorage.setItem('jwt', response.token);
          return response;
        }
      })

  }

  register({ name, email, password }) {
    return fetch(`${this._baseUrl}/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, password })
    })
      .then(this._checkResponse);
  }

  update({ name, email }) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${localStorage.jwt}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email })
    })
  }

  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${localStorage.jwt}`,
        'Content-Type': 'application/json',
      },
    })
      .then(this._checkResponse);
  }

}

const api = new Api({
  baseUrl: "https://api.rumovies.nomoredomainsmonster.ru",
});

export default api;
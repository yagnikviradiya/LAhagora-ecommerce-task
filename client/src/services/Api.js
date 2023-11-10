import axios from 'axios';

const client = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL || "http://localhost:3001/api/",
});

class Api {
  static get(path = '') {
    return client({
      method: 'GET',
      url: path,
      headers: { 'x-auth-token': localStorage.getItem('token') || '' },
    });
  }

  static delete(path = '') {
    return client({
      method: 'DELETE',
      url: path,
      headers: { 'x-auth-token': localStorage.getItem('token') || '' },
    });
  }

  static post(path = '', data = {}) {
    return client({
      method: 'POST',
      url: path,
      data,
      headers: { 'x-auth-token': localStorage.getItem('token') || '' },
    });
  }

  static patch(path = '', data = {}) {
    return client({
      method: 'PATCH',
      url: path,
      data: JSON.stringify(data),
      headers: { 'x-auth-token': localStorage.getItem('token') || '' },
    });
  }

  static put(path = '', data = {}) {
    return client({
      method: 'PUT',
      url: path,
      data,
      headers: { 'x-auth-token': localStorage.getItem('token') || '' },
    });
  }
}

export { Api };

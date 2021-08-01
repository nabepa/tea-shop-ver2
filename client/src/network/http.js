import axios from 'axios';

export default class HttpClient {
  constructor(baseURL) {
    this.client = axios.create({
      baseURL: baseURL,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  async fetch(url, options) {
    const { method, body, headers } = options;
    const req = {
      url,
      method,
      headers: { ...headers },
      credentials: 'include',
      data: body,
    };

    try {
      const res = await this.client(req);
      return res.data;
    } catch (err) {
      if (err.response) {
        const data = err.response.data;
        const message =
          data && data.message ? data.message : 'Something went wrong';
        throw new Error(message);
      }
      throw new Error('Connection error');
    }
  }
}

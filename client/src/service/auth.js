export default class AuthService {
  constructor(http, tokenStorage) {
    this.http = http;
    this.tokenStorage = tokenStorage;
  }

  async register(firstName, lastName, email, password) {
    const data = await this.http.fetch('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ firstName, lastName, email, password }),
    });
    this.tokenStorage.saveToken(data.token);
    return data;
  }

  async signin(email, password) {
    const data = await this.http.fetch('/auth/signin', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
    this.tokenStorage.saveToken(data.token);
    return data;
  }

  async me() {
    const token = this.tokenStorage.getToken();
    return this.http.fetch('/auth/me', {
      method: 'GET',
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  async signout() {
    this.tokenStorage.clearToken();
  }
}

export default class AuthService {
  constructor(http) {
    this.http = http;
  }

  async register(firstName, lastName, email, password) {
    return await this.http.fetch('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ firstName, lastName, email, password }),
    });
  }

  async signin(email, password) {
    return await this.http.fetch('/auth/signin', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  }

  async me() {
    return this.http.fetch('/auth/me', {
      method: 'GET',
    });
  }

  async signout() {
    // TODO: nabepa
  }
}

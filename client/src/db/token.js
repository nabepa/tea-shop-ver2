const TOKEN = 'token';

// Todo: localStorage에 token 저장하는 것은 보안 상 좋지 않음. 추후 개선 필요
export default class TokenStorage {
  saveToken(token) {
    localStorage.setItem(TOKEN, token);
  }

  getToken(token) {
    return localStorage.getItem(TOKEN);
  }

  clearToken() {
    localStorage.clear(TOKEN);
  }
}

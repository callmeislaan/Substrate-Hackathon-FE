const ID_TOKEN_KEY = "id_token";
class JwtService {
  constructor() {
    console.log("creating new instance of jwt.service");
  }

  getToken() {
    return window.localStorage.getItem(ID_TOKEN_KEY);
  }

  saveToken(token: string) {
    window.localStorage.setItem(ID_TOKEN_KEY, token);
  }

  destroyToken() {
    window.localStorage.removeItem(ID_TOKEN_KEY);
  }
}

// Export a singleton instance in the global namespace
export const jwtService = new JwtService();

import { anestAxios } from "@/libs/axios";
import { Register } from "@/types/auth/register";
import { UserLogin } from "@/types/auth/user";

const api = "/api";
class AuthService {
  constructor() {
    console.log("creating new instance of auth.service");
  }

  logIn(params: UserLogin) {
    return anestAxios.post(`${api}/auth`, params);
  }

  signup(params: Register) {
    return anestAxios.post(`${api}/register`, params);
  }
}

// Export a singleton instance in the global namespace
export const authService = new AuthService();

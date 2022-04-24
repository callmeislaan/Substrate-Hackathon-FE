import { VuexModule, Module, Mutation, Action } from "vuex-module-decorators";
import { jwtService } from "@/services/auth/jwt.service";
import { authService } from "@/services/auth/auth.service";
import { User, UserLogin } from "@/types/auth/user";
import { Register } from "@/types/auth/register";
import { DecodedJWT } from "@/types/auth/jwttoken";

import JwtDecode from "jwt-decode";

@Module({
  namespaced: true,
  name: "auth"
})
export default class AuthModule extends VuexModule {
  // State
  user: User = null;
  isAuth = !!jwtService.getToken();

  // Getters
  get currentUser(): User {
    return this.user;
  }

  get isAuthenticated(): boolean {
    return this.isAuth;
  }

  // Mutations
  @Mutation
  signinSuccess(data: User): void {
    this.isAuth = true;
    this.user = data;
    if (this.user && this.user.token) {
      const decoded: DecodedJWT = JwtDecode(this.user.token);
      this.user.id = decoded.id;
      jwtService.saveToken(this.user.token);
    }
  }

  @Mutation
  signoutSuccess(): void {
    this.isAuth = false;
    this.user = null;
    jwtService.destroyToken();
    sessionStorage.clear();
  }

  @Mutation
  signupSuccess(): void {
    this.isAuth = false;
  }

  // Actions
  @Action({ commit: "signinSuccess", rawError: true })
  async logIn(credentials: UserLogin) {
    const { data } = await authService.logIn(credentials);
    return data;
  }

  // @Action({ commit: "signoutSuccess", rawError: true })
  // async signout() { }

  @Action({ commit: "signupSuccess", rawError: true })
  async signup(register: Register) {
    await authService.signup(register);
  }

  @Mutation
  _toogleSignUpMentor(isMentor: boolean) {
    if (this.user) {
      if (isMentor) this.user.role = "ROLE_MENTOR";
      else this.user.role = "ROLE_USER";
    }
  }

  @Action({ commit: "_toogleSignUpMentor", rawError: true })
  async toogleSignUpMentor(isMentor: boolean) {
    return isMentor;
  }
}

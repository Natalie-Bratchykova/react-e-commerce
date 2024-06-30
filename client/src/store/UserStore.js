import { makeAutoObservable } from "mobx";
import AuthService from "../services/AuthService";
import { jwtDecode } from "jwt-decode";
export default class UserStore {
  constructor() {
    this._isAuth = false;
    this._user = {};
    makeAutoObservable(this);
  }

  setIsAuth(bool) {
    this._isAuth = bool;
  }

  get isAuth() {
    return this._isAuth;
  }

  setUser(user) {
    this._user = user;
  }

  get user() {
    return this._user;
  }

  registration = async (email, password, roles) => {
    console.log('pass role for registration step1 ');
    console.log(roles);
    const response = await AuthService.registration(email, password, roles);
    console.log("user Store response");
    console.log(response);
    this.setUser(response);
    this.setIsAuth(true);
    return {
      user: this.user,
      isAuth: this.isAuth,
    };
  };

  async login(email, password, role) {
    const response = await AuthService.login(email, password);
    this.setUser(response);
    this.setIsAuth(true);
    return {
      user: this.user,
      isAuth: this.isAuth,
    };
  }


 logout() {
    const token = AuthService.logout();
    this.setUser(null);
    this.setIsAuth(false);
    return {
      user: this.user,
      isAuth: this.isAuth,
    };
  }
}

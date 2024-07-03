import { jwtDecode } from "jwt-decode";
import { $axios } from "../http";
class AuthService {
  async registration(email, password, roles) {
    console.log("pass role for registration step2 ");
    console.log(roles);
    const resp = await $axios.$host.post(`/api/user/registration`, {
      email,
      password,
      roles,
    });

    localStorage.setItem("token", resp.data.token);
    return jwtDecode(resp.data.token);
  }

  async login(email, password) {
    const response = await $axios.$host.post(`/api/user/login`, {
      email,
      password,
    });
    localStorage.setItem("token", response.data.token);
    return jwtDecode(response.data.token);
  }

  async checkAuth() {
    const { data } = await $axios.$authHost.get("/api/user/auth");
    if (data) {
      console.log(data);
      localStorage.setItem("token", data.token);
      const userData = jwtDecode(data.token);
      return userData;
    }
  }

  logout() {
    const removedToken = localStorage.getItem("token");
    localStorage.removeItem("token");
    return removedToken;
  }
}

export default new AuthService();

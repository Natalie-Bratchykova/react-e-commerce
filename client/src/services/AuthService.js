import { jwtDecode } from "jwt-decode";
import { $axios } from "../http";
class AuthService {
  async registration(email, password, role = "user") {
    const resp = await $axios.$host.post(`/api/user/registration`, {
      email,
      password,
      role,
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
    localStorage.setItem("token", data.token);
    const userData = jwtDecode(data.token);
    return userData;
  }

  logout() {
    const removedToken = localStorage.getItem("token");
    localStorage.removeItem("token");
    return removedToken;
  }
}

export default new AuthService();

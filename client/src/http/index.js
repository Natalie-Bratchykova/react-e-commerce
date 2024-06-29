import axios from "axios";
const BASE_URL = import.meta.env.VITE_BASE_URL;

const $host = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

const $authHost = axios.create({
  baseURL: BASE_URL,
});

const authInterceptors = (config) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
  return config;
};

$authHost.interceptors.request.use(authInterceptors);

// 

export const $axios = {
  $host,
  $authHost,
};

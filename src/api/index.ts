import axios from "axios";
import { BASE_URL } from "../constants/base_url";

const API = axios.create({
  baseURL: BASE_URL,
  timeout: 60000,
  headers: {
    "Content-Type": "application/json",
  },
});

API.interceptors.request.use(function (config) {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers["authorization"] = "Bearer " + token;
  }
  return config;
});

export default API;

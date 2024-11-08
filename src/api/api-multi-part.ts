import axios from "axios";
import { BASE_URL } from "../constants/base_url";
import { getTokenFromLocalStorage } from "../utils/local-storage-helper";

const API_MULTI_PART = axios.create({
  baseURL: BASE_URL,
  timeout: 100000,
  headers: {
    "Content-Type": "multipart/form-data",
  },
});

API_MULTI_PART.interceptors.request.use(function (config) {
  const token = getTokenFromLocalStorage();
  if (token) {
    config.headers["authorization"] = "Bearer " + token;
  }
  return config;
});

export default API_MULTI_PART;

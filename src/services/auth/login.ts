import API from "../../api";
import { requestHandler } from "../../api/requestHandler";

interface LoginParams {
  username: string;
  password: string;
}

interface LoginResponse {
  accessToken: string;
  refreshToken: string;
}

export const loginService = requestHandler<LoginParams, LoginResponse>((body) =>
  API.post("auth", body)
);
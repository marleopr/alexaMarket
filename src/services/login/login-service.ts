import API from "../../api";
import { requestHandler } from "../../api/requestHandler";
import { productKey } from "../../constants/base_url";

interface LoginParams {
  login: string;
  password: string;
  account: string;
}

interface LoginResponse {
  id: string;
  expiredPassword: boolean;
  accessToken: string;
  refreshToken: string;
  expiresAt: string;
  blockedUntil: string;
}

export const loginService = requestHandler<LoginParams, LoginResponse>((body) =>
  API.post("Login", { ...body, productKey })
);


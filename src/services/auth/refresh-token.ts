import API from "../../api";
import { requestHandler } from "../../api/requestHandler";

interface RefreshTokenParams {
  refreshToken: string;
}

interface RefreshTokenResponse {
  accessToken: string;
  refreshToken: string;
}

export const refreshTokenService = requestHandler<
  RefreshTokenParams,
  RefreshTokenResponse
>((body) => API.post("auth/refresh-token", body));

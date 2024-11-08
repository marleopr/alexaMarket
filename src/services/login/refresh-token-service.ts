import API from "../../api";
import { requestHandler } from "../../api/requestHandler";

interface RefreshTokenParams {
  refreshToken: string;
}

interface RefreshTokenResponse {
  id: string;
  expiredPassword: boolean;
  accessToken: string;
  refreshToken: string;
  expiresAt: string;
  blockedUntil: string;
}

export const refreshTokenService = requestHandler<
  RefreshTokenParams,
  RefreshTokenResponse
>((body) => API.post("Login/refreshtoken", { ...body }));

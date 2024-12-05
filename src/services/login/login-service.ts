import API from "../../api";
import { requestHandler } from "../../api/requestHandler";
interface LoginParams {
  username: string;
  password: string;
}

interface LoginResponse {
  token: string;
  companyId: string | null;
}

export const loginService = requestHandler<LoginParams, LoginResponse>((body) => {
  console.log('Requisição enviada para login:', body);
  return API.post("/public/v1/login", body);
});
console.log(API.defaults.baseURL)
export type { LoginResponse };
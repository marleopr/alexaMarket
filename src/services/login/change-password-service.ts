import API from "../../api";
import { requestHandler } from "../../api/requestHandler";

//quando não está logado
interface ChangePasswordParams {
  login: string;
  recoveryHash: string;
  password: string;
  confPassword: string;
}

interface ChangePasswordResponse {
  success: boolean;
  message: string;
}

export const changePasswordService = requestHandler<
  ChangePasswordParams,
  ChangePasswordResponse
>((body) => API.post("Login/change", { ...body }));

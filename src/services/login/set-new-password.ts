import API from "../../api";
import { requestHandler } from "../../api/requestHandler";

//já está logado e vai trocar a senha
interface SetNewPasswordParams {
  login: string;
  oldPassword: string;
  newPassword: string;
  confPassword: string;
}

interface SetNewPasswordParamsResponse {
  success: boolean;
  message: string;
}

export const setNewPasswordService = requestHandler<SetNewPasswordParams, SetNewPasswordParamsResponse>((body) =>
  API.post("auth", { ...body })
);

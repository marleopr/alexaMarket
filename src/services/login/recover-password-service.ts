import API from "../../api";
import { requestHandler } from "../../api/requestHandler";

interface RecoverParams {
  login: string;
  recoveryAddress?: string;
}

interface RecoverResponse {
  login: string;
  message: string;
}

export const recoverPasswordService = requestHandler<
  RecoverParams,
  RecoverResponse
>((body) =>
  API.post("Login/recover", {
    ...body,
    recoveryAddress: "localhost:8080/reset-password/",
  })
);

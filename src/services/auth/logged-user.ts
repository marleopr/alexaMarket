import API from "../../api";
import { requestHandler } from "../../api/requestHandler";
import { LoggedUser } from "../../types/logged-user";

interface LoggedUserParams {}



export const loggedUser = requestHandler<LoggedUserParams, LoggedUser>(() =>
  API.get("user/me")
);

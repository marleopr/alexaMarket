import API from "../../api";
import { requestHandler } from "../../api/requestHandler";
import { User } from "../../types/user";

interface UsersParams {}

export const listUsersService = requestHandler<UsersParams, User[]>((body) =>
  API.get("user", body)
);

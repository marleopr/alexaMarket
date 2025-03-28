import API from "../../api";
import { requestHandler } from "../../api/requestHandler";

export interface UsersFromSameCompanyType {
  Email: string;
  ExternalUserID: number;
}

interface GetUsersResponse {
  data: UsersFromSameCompanyType[];
}

export const getUsersService = requestHandler<{}, GetUsersResponse>(() =>
  API.get("User/")
);

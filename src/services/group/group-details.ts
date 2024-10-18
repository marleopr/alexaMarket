import API from "../../api";
import { requestHandler } from "../../api/requestHandler";

interface GroupDetailsParams {
  groupId: string;
}

interface GroupDetailsResponse {
  id: string;
  name: string;
  usersIds: string[];
}

export const groupDetailsService = requestHandler<
  GroupDetailsParams,
  GroupDetailsResponse
>((params) => API.get("group/" + params?.groupId));

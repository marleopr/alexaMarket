import API from "../../api";
import { requestHandler } from "../../api/requestHandler";
import { Group } from "../../types/group";

interface GroupsParams {}

export const listGroupsService = requestHandler<GroupsParams, Group[]>((body) =>
  API.get("group", body)
);

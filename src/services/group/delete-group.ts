import API from "../../api";
import { requestHandler } from "../../api/requestHandler";

interface DeleteGroupParams {
  groupId: string;
}

export interface DeleteGroupResponse {}

export const deleteGroupService = requestHandler<
  DeleteGroupParams,
  DeleteGroupResponse
>((body) => API.delete(`group/${body?.groupId}`));

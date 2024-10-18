import API from "../../api";
import { requestHandler } from "../../api/requestHandler";
import { Group } from "../../types/group";

interface UpdateGroupParams {
  id: string;
  name: string;
  usersIds: string[];
}

export const updateGroupService = requestHandler<UpdateGroupParams, Group>(
  (body) => {
    if (body) {
      const { id, ...rest } = body;
      return API.put(`group/${id}`, rest);
    }

    return Promise.reject("No body provided");
  }
);

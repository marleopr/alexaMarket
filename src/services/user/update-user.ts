import API from "../../api";
import { requestHandler } from "../../api/requestHandler";
import { Group } from "../../types/group";

interface UpdateUserParams {
  id: string;
  groupsIds: string[];
}

export const updateUserService = requestHandler<UpdateUserParams, Group>(
  (body) => {
    if (body) {
      const { id, ...rest } = body;
      return API.put(`user/${id}/group`, rest);
    }

    return Promise.reject("No body provided");
  }
);

import API from "../../api";
import { requestHandler } from "../../api/requestHandler";
import { ApprovalFlow } from "../../types/approval-flow";

export const updateApprovalFlowService = requestHandler<
  ApprovalFlow,
  ApprovalFlow
>((body) => {
  if (body) {
    const { id, ...rest } = body;
    return API.put(`approval-flow/${id}`, rest);
  }

  return Promise.reject("No body provided");
});

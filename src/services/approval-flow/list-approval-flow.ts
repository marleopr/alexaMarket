import API from "../../api";
import { requestHandler } from "../../api/requestHandler";
import { ApprovalFlow } from "../../types/approval-flow";

interface approvalFlowParams {
  active?: boolean;
}

export const listApprovalFlowService = requestHandler<
  approvalFlowParams,
  ApprovalFlow[]
>((body) => API.get("approval-flow", { params: body }));

import API from "../../api";
import { requestHandler } from "../../api/requestHandler";
import { ApprovalFlow } from "../../types/approval-flow";

interface ApprovalFlowDetailsParams {
  id: string;
}

export const approvalFlowDetailsService = requestHandler<
  ApprovalFlowDetailsParams,
  ApprovalFlow
>((body) => {
  return API.get(`approval-flow/${body?.id}`);
});

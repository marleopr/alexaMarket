import API from "../../api";
import { requestHandler } from "../../api/requestHandler";
import { Contract } from "../../types/contract";

interface ContractApprovalParams {
  contractId: string;
}

export const sendContractToApprovalService = requestHandler<
  ContractApprovalParams,
  Contract
>((body) => {
  return API.post(`contract/${body?.contractId}/send-to-approval`);
});

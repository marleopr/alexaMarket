import API from "../../api";
import { requestHandler } from "../../api/requestHandler";
import { Contract } from "../../types/contract";

interface ContractDetailsParams {
  id: string;
}

export const contractToApproveDetailsService = requestHandler<
  ContractDetailsParams,
  Contract
>((params) => API.get("contract/approval/" + params?.id));

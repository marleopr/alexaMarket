import API from "../../api";
import { requestHandler } from "../../api/requestHandler";
import { Contract } from "../../types/contract";

interface ContractParams {}

export const listContractsToApproveService = requestHandler<
  ContractParams,
  Contract[]
>(() => API.get("contract/approval"));

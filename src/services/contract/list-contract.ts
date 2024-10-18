import API from "../../api";
import { requestHandler } from "../../api/requestHandler";
import { Contract } from "../../types/contract";

interface ContractParams {}

export const listContractService = requestHandler<ContractParams, Contract[]>(() =>
  API.get("contract")
);

import API from "../../api";
import { requestHandler } from "../../api/requestHandler";
import { ContractType } from "../../types/contract-type";

interface ContractTypeDetailsParams {
  id: string;
}

export const contractTypeDetailsService = requestHandler<
  ContractTypeDetailsParams,
  ContractType
>((params) => API.get("contract-type/" + params?.id));

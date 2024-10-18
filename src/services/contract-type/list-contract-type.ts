import API from "../../api";
import { requestHandler } from "../../api/requestHandler";
import { ContractType } from "../../types/contract-type";

interface ContractTypeParams {
  available?: boolean;
}

export const listContractTypeService = requestHandler<
  ContractTypeParams,
  ContractType[]
>((body) => API.get(`contract-type${body?.available ? "/available" : ""}`));

import API from "../../api";
import { requestHandler } from "../../api/requestHandler";
import { ContractType } from "../../types/contract-type";



export const updateContractTypeService = requestHandler<ContractType, ContractType>(
  (body) => {
    if (body) {
      const { id, ...rest } = body;
      return API.put(`contract-type/${id}`, rest);
    }

    return Promise.reject("No body provided");
  }
);

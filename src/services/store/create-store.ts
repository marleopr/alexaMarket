import API from "../../api";
import { requestHandler } from "../../api/requestHandler";
import { StoreType } from "./get-stores";

export interface CreateStorePayload {
  pMKTP_INT_DAYPAY: number;
  pMKTP_DAT_INIVIG: string;
  pMKTP_DAT_FIMVIG: string;
  pMKTP_VAL_MAR: number;
  pMKTP_VAL_FLTRAT: number;
  pMKTP_VLR_PERCEN: number;
  pMKTP_COD_MKT: number;
  pMKTP_NOM_NAM: string;
  pACAO: string;
  pMKTP_STR_NAM: string;
}

interface CreateStoreResponse {
  data: StoreType;
}
export const createStoreService = requestHandler<
  CreateStorePayload,
  CreateStoreResponse
>((body) => {
  if (!body) {
    throw new Error("Request body is undefined");
  }

  const parameters = Object.entries(body).map(([key, value]) => ({
    Name: key,
    Value: value,
  }));

  return API.post("Feature/Run/Write", {
    functionLabel: "putStore",
    parameters: parameters,
  });
});

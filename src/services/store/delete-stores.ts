import API from "../../api";
import { requestHandler } from "../../api/requestHandler";
import { StoreType } from "./get-stores";

export interface DeleteStorePayload {
  pMKTP_INT_DAYPAY: number;
  pMKTP_DAT_INIVIG: string;
  pMKTP_DAT_FIMVIG: string;
  pMKTP_VAL_MAR: number;
  pMKTP_VAL_FLTRAT: number;
  pMKTP_VLR_PERCEN: number;
  pMKTP_COD_MKT: number;
  pMKTP_COD: number | null;
  pMKTP_NOM_NAM: string;
  pACAO: string;
}

interface DeleteStoreResponse {
  data: StoreType;
}

export const deleteStoreService = requestHandler<
  DeleteStorePayload,
  DeleteStoreResponse
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

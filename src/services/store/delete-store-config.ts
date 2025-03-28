import API from "../../api";
import { requestHandler } from "../../api/requestHandler";
import { StoreConfigType } from "./get-store-config";

export interface DeleteStoreConfigPayload {
  pID: number;
  pMKTP_COD: number;
  pACAO: "E";
  pMKTP_VLR_PERCEN: number;
  pMKTP_INT_DAYPAY: number;
  pMKTP_DAT_INIVIG: string;
  pMKTP_DAT_FIMVIG: string;
}

interface DeleteStoreResponse {
  data: StoreConfigType;
}
export const deleteStoreConfigService = requestHandler<
  DeleteStoreConfigPayload,
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
    functionLabel: "putStoreConfig",
    parameters,
  });
});

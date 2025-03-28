import API from "../../api";
import { requestHandler } from "../../api/requestHandler";
import { StoreConfigType } from "./get-store-config";

type Payload = {
  pMKTP_DAT_INIVIG: string;
  pMKTP_DAT_FIMVIG: string;
  pMKTP_VAL_MAR: number;
  pMKTP_VAL_FLTRAT: number;
  pMKTP_VLR_PERCEN: number;
  pMKTP_INT_DAYPAY: number;
  pACAO: "A" | "I" | "E";
  pID?: number | null;
  pMKTP_COD: number | string;
};

interface EditStoreResponse {
  data: StoreConfigType;
}
export const editStoreConfigService = requestHandler<
  Payload,
  EditStoreResponse
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
    parameters: parameters,
  });
});

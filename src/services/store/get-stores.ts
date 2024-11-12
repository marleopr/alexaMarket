import API from "../../api";
import { requestHandler } from "../../api/requestHandler";

export interface StoreType {
  MKTP_COD: number;
  MKTP_COD_MKT: string;
  MKTP_NOM_NAM: string;
  MKTP_VLR_PERCEN: number;
  MKTP_DAT_INIVIG: string; // ISO date string
  MKTP_DAT_FIMVIG: string; // ISO date string
  MKTP_VAL_FLTRAT: number;
  MKTP_VAL_MAR: number;
  MKTP_DAT_CRE: string; // ISO date string
  MKTP_DAT_UPD: string; // ISO date string
  MKTP_INT_DAYPAY: number;
  GlobalAccountProductKey: string; // UUID string
  MKTP_NAM_MKTPLC: string;
}

interface GetStoresRequest {
  Params: Param<
    | "MKTP_COD"
    | "MKTP_COD_MKT"
    | "MKTP_NOM_NAM"
    | "MKTP_VLR_PERCEN"
    | "MKTP_VAL_FLTRAT"
    | "MKTP_DAT_INIVIG"
    | "MKTP_DAT_FIMVIG"
    | "MKTP_VAL_MAR"
    | "MKTP_DAT_CRE"
    | "MKTP_DAT_UPD"
    | "MKTP_INT_DAYPAY"
    | "GlobalAccountProductKey"
    | "MKTP_NAM_MKTPLC",
    string | number | Date,
    "<" | ">" | "<=" | ">=" | "<>"
  >[];
}

type Param<T, V, W> = {
  name: T;
  value: V;
  condition: W;
};

interface GetStoreServiceResponse {
  data: {
    records: StoreType[];
    count: number;
  };
}
export const getStoresService = requestHandler<
  GetStoresRequest,
  GetStoreServiceResponse
>((body) => {
  return API.post("Feature/Run/Read", {
    functionLabel: "getStore",
    ...(body?.Params &&
      body?.Params.length > 0 && {
        parameters: [...body?.Params],
      }),
  });
});

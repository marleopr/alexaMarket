import API from "../../api";
import { requestHandler } from "../../api/requestHandler";

export interface ShippingType {
  MKTP_COD: number | null;
  MKTP_NOM_NAM: string;
  storeConfig_Id: number | null;
  storeConfig_startTerm: string;
  storeConfig_endTerm: string;
  shipping_id: number;
  name: string;
  start_track: number;
  end_track: number;
  value: number;
  start_term: string;
  end_term: string;
}

export const defaultShipping: ShippingType = {
  MKTP_COD: null,
  MKTP_NOM_NAM: "",
  storeConfig_Id: null,
  storeConfig_startTerm: "",
  storeConfig_endTerm: "",
  shipping_id: 0,
  name: "",
  start_track: 0,
  end_track: 0,
  value: 0,
  start_term: "",
  end_term: "",
};

interface GetStoresRequest {
  Params: Param<
    "MKTP_COD" | "MKTP_COD_MKT",
    string | number,
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
    records: ShippingType[];
    count: number;
  };
}
export const getShippingService = requestHandler<
  GetStoresRequest,
  GetStoreServiceResponse
>((body) => {
  return API.post("Feature/Run/Read", {
    functionLabel: "getStoreShipping",
    ...(body?.Params &&
      body?.Params.length > 0 && {
        parameters: [...body?.Params],
      }),
  });
});

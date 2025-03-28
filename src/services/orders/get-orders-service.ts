import API from "../../api";
import { requestHandler } from "../../api/requestHandler";

export interface OrderType {
  PEDS_COD: number;
  PEDS_EXT_COD: string;
  PEDS_DAT_DATPDS: string | null;
  PEDS_VAL_VENCAL: number;
  PEDS_VAL_COMACD: number;
  PEDS_VAL_COMPAG: number;
  PEDS_STR_STAPAG: "VERIFY" | "PENDING" | "PAID";
  CONM_DAT_CONMKT: string | null;
  USUS_COD: number;
  EMPR_COD: number;
  PEDS_COD_ERP: string | null;
  PEDS_VAL_VALTOT: number;
  PEDS_VAL_PAGMKT: number;
}

interface GetOrdersRequest {
  Params: Param<
    "mktp_cod" | "name" | "created_at" | "type",
    string | number | Date,
    "<" | ">" | "<=" | ">=" | "<>"
  >[];
}

type Param<T, V, W> = {
  name: T;
  value: V;
  condition: W;
};

interface GetOrdersServiceResponse {
  data: {
    records: OrderType[];
    count: number;
  };
}
export const getOrdersService = requestHandler<
  GetOrdersRequest,
  GetOrdersServiceResponse
>((body) => {
  return API.post("Feature/Run/Read", {
    functionLabel: "getReconciliation",
    ...(body?.Params &&
      body?.Params.length > 0 && {
        parameters: [...body?.Params],
      }),
  });
});

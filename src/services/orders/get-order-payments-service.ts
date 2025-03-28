import API from "../../api";
import { requestHandler } from "../../api/requestHandler";

export interface OrderPaymentType {
  REPP_COD: number;
  REPP_DAT_DATPAG: string | null;
  REPP_STR_BEN: string;
  REPP_VAL_PAG: number;
  PEDS_EXT_COD: string;
  REPP_STR_STA: string;
  REPP_VAL_SAL: number;
  REPP_BIT_CON: boolean;
  USUS_COD: number;
  EMPR_COD: number;
}

interface GetOrdersRequest {
  Params: Param<
    "PEDS_EXT_COD",
    string | number | Date,
    "<" | ">" | "<=" | ">=" | "<>" | "="
  >[];
}

type Param<T, V, W> = {
  name: T;
  value: V;
  condition: W;
};

interface GetOrdersPaymentsServiceResponse {
  data: {
    records: OrderPaymentType[];
    count: number;
  };
}
export const getOrderPaymentsService = requestHandler<
  GetOrdersRequest,
  GetOrdersPaymentsServiceResponse
>((body) => {
  return API.post("Feature/Run/Read", {
    functionLabel: "getPayment",
    ...(body?.Params &&
      body?.Params.length > 0 && {
        parameters: [...body?.Params],
      }),
  });
});

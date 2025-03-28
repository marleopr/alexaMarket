import API from "../../api";
import { requestHandler } from "../../api/requestHandler";

export interface StorePaymentType {
  id: number;
  MKTP_NOM_NAM: string;
  date: string;
  store_ID: number;
  value: number;
  empr_cod: number;
}

interface ServiceRequest {
  Params: Param<
    "mktp_cod" | "name" | "created_at",
    string | number | Date,
    "<" | ">" | "<=" | ">=" | "<>"
  >[];
}

type Param<T, V, W> = {
  name: T;
  value: V;
  condition: W;
};

interface ServiceResponse {
  data: {
    records: StorePaymentType[];
    count: number;
  };
}
export const getStorePaymentService = requestHandler<
  ServiceRequest,
  ServiceResponse
>((body) => {
  return API.post("Feature/Run/Read", {
    functionLabel: "getStorePayment",
    ...(body?.Params &&
      body?.Params.length > 0 && {
        parameters: [...body?.Params],
      }),
  });
});

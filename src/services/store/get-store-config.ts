import API from "../../api";
import { requestHandler } from "../../api/requestHandler";

export const defaultStoreConfig: StoreConfigType = {
  Id: undefined,
  MKTP_COD: 0,
  percent: 0,
  start_term: "",
  end_term: "",
  margin: 0,
  created_at: "",
  updated_at: "",
  payment_day: 0,
  flat_rate: 0,
  EMPR_COD: 0,
};

export type StoreConfigType ={
  Id?: number;
  MKTP_COD: number;
  percent: number;
  start_term: string;
  end_term: string;
  margin: number;
  created_at: string;
  updated_at: string;
  payment_day: number;
  flat_rate: number;
  EMPR_COD: number;
}

interface GetStoreServiceResponse {
  data: {
    records: StoreConfigType[];
    count: number;
  };
}
export const getStoreConfigService = requestHandler<
  { id: number },
  GetStoreServiceResponse
>((body) => {
  if (!body) {
    throw new Error("Invalid request body");
  }

  return API.post("Feature/Run/Read", {
    functionLabel: "getStoreConfig",
    parameters: [
      {
        name: "MKTP_COD",
        value: body.id,
        condition: "=",
      },
    ],
  });
});

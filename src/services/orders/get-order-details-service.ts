import API from "../../api";
import { requestHandler } from "../../api/requestHandler";

export interface OrderDetailsType {
  PEDS_COD: number;
  PEDS_BIT_CON: boolean;
  PEDS_EXT_COD: string;
  PEDS_STR_STAPED: string;
  PEDS_STL_MOTCAN: string;
  PEDS_STL_STADEV: string;
  PEDS_STR_NUMRAS: string;
  PEDS_STR_OPSENV: string;
  PEDS_STR_METENV: string;
  PEDS_DAT_DATPREVENV: string;
  PEDS_DAT_PRZENV: string;
  PEDS_DAT_DATPDS: string;
  PEDS_DAT_HRAPAG: string;
  PEDS_STR_REFSKUPRI: string;
  PEDS_STL_NOMPRO: string;
  PEDS_STR_REFSKU: string;
  PEDS_STR_NOMVAR: string;
  PEDS_VAL_PREORI: number;
  PEDS_VAL_PREACO: number;
  PEDS_INT_QTD: number;
  PEDS_VAL_SUBTOT: number;
  PEDS_VAL_DESVEN: number;
  PEDS_VAL_DESVEN001: number | null;
  PEDS_VAL_REMSHP: number;
  PEDS_PES_PESSKU: number;
  PEDS_INT_NUMPROPED: number;
  PEDS_PES_PESTOT: number;
  PEDS_STL_CODCUP: string;
  PEDS_VAL_CUPVEN: number;
  PEDS_VAL_COICAS: number;
  PEDS_VAL_CUPSHP: number;
  PEDS_BIT_INDLEVMAI: boolean;
  PEDS_VAL_DESLEVMAI: number;
  PEDS_VAL_DESLEVMAIVEN: number;
  PEDS_INT_COMCOIN: number;
  PEDS_VAL_TOTDESCAR: number;
  PEDS_VAL_VALTOT: number;
  PEDS_VAL_TAXENVCOM: number;
  PEDS_VAL_DESFREAPX: number;
  PEDS_VAL_TAXENVREV: number;
  PEDS_VAL_TAXTRA: number;
  PEDS_VAL_TAXCSS: number;
  PEDS_VAL_TAXSER: number;
  PEDS_VAL_TOTGLO: number;
  PEDS_VAL_VALESTFRE: number;
  PEDS_STR_NOMUSRCOM: string;
  PEDS_STR_NOMDES: string;
  PEDS_STR_TEL: string;
  PEDS_STR_CPFCOM: string;
  PEDS_STR_ENDENT: string;
  PEDS_STR_CID: string;
  PEDS_STR_BAI: string;
  PEDS_STR_CID001: string;
  PEDS_STR_EST: string;
  PEDS_STR_PAI: string;
  PEDS_STR_CEP: string;
  PEDS_STR_OBSCOM: string;
  PEDS_STR_HRAPED: string;
  PEDS_STR_NOT: string;
  EMPR_COD: number;
  USUS_COD: number;
  MKTP_COD: number;
}

interface GetOrdersRequest {
  Params: Param<"PEDS_EXT_COD", string | number, "=">[];
}

type Param<T, V, W> = {
  name: T;
  value: V;
  condition: W;
};

interface GetOrdersServiceResponse {
  data: {
    records: OrderDetailsType[];
    count: number;
  };
}
export const getOrderDetailsService = requestHandler<
  GetOrdersRequest,
  GetOrdersServiceResponse
>((body) => {
  return API.post("Feature/Run/Read", {
    functionLabel: "getOrder",
    ...(body?.Params &&
      body?.Params.length > 0 && {
        parameters: [...body?.Params],
      }),
  });
});

import API from "../../api";
import { requestHandler } from "../../api/requestHandler";
import { ShippingType } from "./get-shipping";

export type PutShippingPayload = {
  pstart_term?: any;
  pend_term?: any;
  pstart_track?: any;
  pend_track?: any;
  pvalue?: any;
  pstoreConfig_ID?: any;
  pid?: any;
  pname?: any;
  pACAO?: "A" | "I" | "E";
};

interface EditStoreResponse {
  data: ShippingType;
}

export const putShippingService = requestHandler<PutShippingPayload, EditStoreResponse>(
  (body) => {
    if (!body) {
      throw new Error("Request body is undefined");
    }

    const parameters = Object.entries(body).map(([key, value]) => ({
      Name: key,
      Value: value,
    }));

    return API.post("Feature/Run/Write", {
      functionLabel: "putStoreShipping",
      parameters: parameters,
    });
  }
);

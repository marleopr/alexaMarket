import API from "../../api";
import { requestHandler } from "../../api/requestHandler";
import { StoreType } from "./get-stores";

interface DeleteStorePayload {
  pMKTP_COD: number;
  pACAO: string;
}

interface DeleteStoreResponse {
  data: StoreType;
}

export const deleteStoreService = requestHandler<
  DeleteStorePayload,
  DeleteStoreResponse
>((body) => {
  if (!body || !body.pMKTP_COD) {
    throw new Error("Store ID is required for deletion");
  }

  const parameters = [
    { Name: "pMKTP_COD", Value: body.pMKTP_COD },
    { Name: "pACAO", Value: body.pACAO },
  ];

  return API.post("Feature/Run/Write", {
    functionLabel: "deleteStore",
    parameters: parameters,
  });
});

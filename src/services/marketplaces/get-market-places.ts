import API from "../../api";
import { requestHandler } from "../../api/requestHandler";

export interface MarketPlacesType {
  Nome: string;
  Codigo: number;
}

interface GetMarketplacesResponse {
  data: MarketPlacesType[];
}

export const getMarketplacesService = requestHandler<
  {},
  GetMarketplacesResponse
>(() =>
  API.post("Feature/Run/Read", {
    functionLabel: "getMarketplace",
  })
);

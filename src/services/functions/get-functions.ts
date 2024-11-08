import API from "../../api";
import { requestHandler } from "../../api/requestHandler";

interface GetContractTypeListParams {
}

interface GetContractTypeListResponse {

}

export const getFunctions = requestHandler<
  GetContractTypeListParams,
  GetContractTypeListResponse
>(() => API.get("Feature/"));

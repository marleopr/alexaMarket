import API from "../../api";
import { requestHandler } from "../../api/requestHandler";

interface GetContractTypeListParams {
  id: string;
}

interface GetContractTypeListResponse {
  username: string | undefined;
  globalAccountKey: string;
  productKey: string;
  account: string;
  userAccountID: string;
  email: string;
  active: boolean;
  name: string;
  phone: string;
  celPhone: string;
  mainUser: boolean;
  language: string;
  expiredPassword: boolean;
}

export const getUserInfoService = requestHandler<
  GetContractTypeListParams,
  GetContractTypeListResponse
>((params) => API.get("User/" + params?.id));

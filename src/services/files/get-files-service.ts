import API from "../../api";
import { requestHandler } from "../../api/requestHandler";

export interface FileType {
  id: number;
  name: string;
  content_upl: string;
  mktp_cod: string;
  created_at: string;
  updated_at: string;
  usus_cod: number;
  data_processing: string;
  empr_cod: number;
  error: boolean;
  type: string;
  error_desc: null | string;
}

interface GetFilesRequest {
  Params: Param<
    "mktp_cod" | "name" | "created_at" | "type",
    string | number | Date | boolean,
    "<" | ">" | "<=" | ">=" | "<>"
  >[];
}

type Param<T, V, W> = {
  name: T;
  value: V;
  condition: W;
};

interface GetFilesServiceResponse {
  data: {
    records: FileType[];
    count: number;
  };
}
export const getFilesService = requestHandler<
  GetFilesRequest,
  GetFilesServiceResponse
>((body) => {
  return API.post("Feature/Run/Read", {
    functionLabel: "getFile",
    ...(body?.Params &&
      body?.Params.length > 0 && {
        parameters: [...body?.Params],
      }),
  });
});

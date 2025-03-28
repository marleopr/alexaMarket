import API from "../../api";
import { requestHandler } from "../../api/requestHandler";

interface GetFilesRequest {}

interface GetFilesTypeServiceResponse {
  data: {
    records: {
      type: string;
    }[];
    count: number;
  };
}

export const getFilesTypeService = requestHandler<
  GetFilesRequest,
  GetFilesTypeServiceResponse
>(() => {
  return API.post("Feature/Run/Read", {
    functionLabel: "getFileType",
  });
});

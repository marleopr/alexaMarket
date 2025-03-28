import API_MULTI_PART from "../../api/api-multi-part";

export type UploadFilePayload = {
  formData: FormData;
  MKTP_COD: string;
};

export const uploadFileService = ({
  formData,
  MKTP_COD,
}: UploadFilePayload) => {
  return API_MULTI_PART.post("File/upload", formData, {
    headers: {
      MKTP_COD,
    },
  });
};

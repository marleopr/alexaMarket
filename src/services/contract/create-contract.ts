import API_MULTI_PART from "../../api/api-multi-part";
import { requestHandler } from "../../api/requestHandler";
import { Contract } from "../../types/contract";

export const createContractService = requestHandler<Contract, Contract>(
  (body) => {
    if (!body) {
      return Promise.reject("Body is required");
    }
    const formData = new FormData();

    const files = body.documents.map((doc) =>
      doc.attachments.map((att) => ({ file: att.file, name: att.name }))
    );

    files.forEach((file) => {
      file.forEach((f) => {
        if (f.file) {
          formData.append(f.name, f.file);
        }
      });
    });

    formData.append("data", JSON.stringify(body));

    return API_MULTI_PART.post("contract", formData);
  }
);

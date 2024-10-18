import API from "../../api";

interface ContractAttachmentParams {
  attachmentId: string;
  contractId: string;
}
export const downloadContractAttachmentService = async (
  params: ContractAttachmentParams
) => {
  try {
    const response = await API.get(
      `contract/${params?.contractId}/attachment/${params?.attachmentId}`,
      {
        responseType: "blob",
      }
    );

    const contentDisposition = response.headers["content-disposition"];
    const filename = contentDisposition
      ? contentDisposition.split("filename=")[1].split(";")[0].replace(/"/g, "")
      : "downloaded-file";

    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", filename);
    document.body.appendChild(link);
    link.click();
    link.remove();
  } catch (error) {
    console.error("Error downloading the file", error);
  }
};

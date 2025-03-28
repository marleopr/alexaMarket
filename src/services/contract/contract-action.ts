// import API_MULTI_PART from "../../api/api-multi-part";
// import { requestHandler } from "../../api/requestHandler";
// import { Contract } from "../../types/contract";

// interface ContractActionParams {
//   contractData: Contract;
//   actionId: string;
// }

// export const contractActionService = requestHandler<
//   ContractActionParams,
//   Contract
// >((body) => {
//   if (!body?.contractData) {
//     return Promise.reject("Body is required");
//   }
//   const formData = new FormData();

//   const files = body.contractData.documents.map((doc) =>
//     doc.attachments.map((att) => ({ file: att.file, name: att.name }))
//   );

//   files.forEach((file) => {
//     file.forEach((f) => {
//       if (f.file) {
//         formData.append(f.name, f.file);
//       }
//     });
//   });

//   formData.append(
//     "data",
//     JSON.stringify({ ...body.contractData, actionId: body.actionId })
//   );

//   return API_MULTI_PART.post(
//     `contract/approval/${body.contractData.id}/action`,
//     formData
//   );
// });

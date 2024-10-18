export type DocumentAttachment = {
  name: string;
  multipartReference?: string;
  expirationDate: string;
  file?: File;
  id?: string;
  uploadedBy?: string;
  uploadedAt?: string;
};

export type DocumentsInContract = {
  name: string;
  deadlineDate: string;
  id?: string;
  amount: number;
  restrictedToUsersIds: string[];
  restrictedToGroupsIds: string[];
  availableInStagesIdentifiers: number[];
  mandatoryInStagesIdentifiers: number[];
  attachments: DocumentAttachment[];
};

export type Contract = {
  id?: string;
  number: string;
  contractTypeId: string;
  chargeType: "TO_PAY" | "TO_RECEIVE" | "NO_CHARGE";
  renewalType: "AUTOMATIC" | "WRITTEN" | "CONDITIONAL";
  periodStart: string;
  periodEnd: string;
  signatureDate: string;
  monthlyValue: number;
  periodValue: number;
  status?: "EDITING" | "APPROVING" | "ACTIVE" | "NEGOTIATION" | "CLOSED";
  totalValue: number;
  review: string;
  observation: string;
  approvalFlowId: string;
  approvalStageIdentifier: number;
  supplierName: string;
  supplierDocument: string;
  paymentCondition: "CASH" | "ADVANCED" | "INSTALLMENTS" | "UPON_DELIVERY";
  documents: DocumentsInContract[];
  createdBy?: string;
  createdAt?: string;
  approvalFlowName?: string;
  approvalStageName?: string;
  contractTypeName?: string;
  actions?: Action[];
  companyId?: string;
  companyName?: string;
};

export type Action = {
  id: string;
  name: string;
};

export const defaultDocumentAttachment: DocumentAttachment = {
  name: "",
  multipartReference: "",
  expirationDate: "",
  id: "",
  uploadedBy: "",
  file: undefined,
};

export const defaultDocumentsInContract: DocumentsInContract = {
  name: "",
  deadlineDate: "",
  amount: 0,
  restrictedToUsersIds: [],
  restrictedToGroupsIds: [],
  availableInStagesIdentifiers: [],
  mandatoryInStagesIdentifiers: [],
  attachments: [],
};

export const defaultEmptyContract: Partial<Contract> = {
  contractTypeId: "",
  chargeType: "TO_PAY",
  renewalType: "CONDITIONAL",
  periodStart: "",
  periodEnd: "",
  signatureDate: "",
  monthlyValue: 0,
  periodValue: 0,
  totalValue: 0,
  review: "",
  observation: "",
  approvalFlowId: "",
  supplierName: "",
  supplierDocument: "",
  paymentCondition: "CASH",
  documents: [],
};

export type StatusKey =
  | "EDITING"
  | "APPROVING"
  | "ACTIVE"
  | "NEGOTIATION"
  | "CLOSED";

export const statusLabels = {
  EDITING: "Editando",
  APPROVING: "Em aprovação",
  ACTIVE: "Ativo",
  NEGOTIATION: "Negociação",
  CLOSED: "Fechado",
};

export type PaymentConditionKey =
  | "CASH"
  | "ADVANCED"
  | "INSTALLMENTS"
  | "UPON_DELIVERY";

export const paymentConditionLabels = {
  CASH: "À Vista",
  ADVANCED: "Adiantado",
  INSTALLMENTS: "Parcela",
  UPON_DELIVERY: "Na Entrega",
};

export type ChargeTypeKey = "TO_PAY" | "TO_RECEIVE" | "NO_CHARGE";

export const chargeTypeLabels = {
  TO_PAY: "A Pagar",
  TO_RECEIVE: "A Receber",
  NO_CHARGE: "Sem Cobrança",
};

export type RenewalTypeKey = "AUTOMATIC" | "WRITTEN" | "CONDITIONAL";
export const renewalTypeLabels = {
  AUTOMATIC: "Automático",
  WRITTEN: "Escrito",
  CONDITIONAL: "Condicional",
};

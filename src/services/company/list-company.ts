
import API from "../../api";
import { requestHandler } from "../../api/requestHandler";
import { Company } from "../../types/company";

interface CompanyParams {}

export const listCompanyService = requestHandler<CompanyParams, Company[]>(() =>
  API.get("company")
);

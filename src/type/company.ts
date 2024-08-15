import {Company} from "@prisma/client";
import {BaseOptions} from "./user";

export interface CompanyPayload {
  company: Company | null;
  isLoading: boolean;
  error: null | string;
}
export interface UpdateCompanyPayload extends BaseOptions {
  id?: number;
  name: string;
  email: string;
  city: string;
}

import {Company} from "@prisma/client";

export interface CompanyPayload {
  company: Company[];
  isLoading: boolean;
  error: null | string;
}

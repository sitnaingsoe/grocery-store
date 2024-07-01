import {Company} from "@prisma/client";

export interface CompanyPayload {
  company: Company | null;
  isLoading: boolean;
  error: null | string;
}

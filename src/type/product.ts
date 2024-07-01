import {Product} from "@prisma/client";

export interface ProductPayload {
  product: Product[];
  isLoading: boolean;
  error: string | null;
}

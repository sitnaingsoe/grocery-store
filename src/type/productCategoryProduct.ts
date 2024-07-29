import {ProductCategoryProduct} from "@prisma/client";
import {BaseOptions} from "./user";

export interface AppSlice {
  init: boolean;
  isLoading: boolean;
  error: String | null;
}

export interface ProductCategoryProductPayload extends BaseOptions {
  productCategoryProduct: ProductCategoryProduct[];
  isLoading: boolean;
  error: string | null;
}

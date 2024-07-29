import {Product} from "@prisma/client";
import {BaseOptions} from "./user";

export interface ProductPayload {
  product: Product[];
  isLoading: boolean;
  error: string | null;
}
export interface CreateProductPayload extends BaseOptions {
  name: string | "";
  price: number | 0;
  productCategoryIds: number[];
}
export interface UpdateProductPayload extends BaseOptions {
  id?: number;
  name: string | "";
  price: number | 0;
  productCategoryIds: number[];
}
export interface deleteProductPayload extends BaseOptions {
  productId: number;
}

import {BaseOptions} from "./user";

export interface ProductCategoryPayload extends BaseOptions {
  name: string;
  isAvailable: boolean;
  companyId: number | undefined;
}

export interface UpdateProductCategory extends BaseOptions {
  id?: number;
  companyId: number | undefined;
  name: string;
  isAvailable: boolean;
}
export interface RemoveProductCategory extends BaseOptions{
  id:number
}

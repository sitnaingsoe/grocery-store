import { BaseOptions } from "./user";

export interface ProductCategoryPayload extends BaseOptions {
  name: String;
  isAvailable: boolean;
}

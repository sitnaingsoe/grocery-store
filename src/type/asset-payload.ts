import {BaseOptions} from "./user";

export interface AssetUploadPayload extends BaseOptions {
  file: File;
}

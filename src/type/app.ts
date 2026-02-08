export interface AppSlice {
  init: boolean;
  isLoading: boolean;
  error: String | null;
}
export interface BaseOptions {
  onSuccess?: (data?: any) => void;
  onError?: (error?: any) => void;
}

export interface uploadAssetPayload extends BaseOptions {
  file: File;
}

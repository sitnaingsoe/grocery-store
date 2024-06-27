export interface BaseOptions {
  onSuccess?: (data?: any) => void;
  onError?: (error?: any) => void;
}
export interface CreateUserPayload {
  id?: number;
  name: string;
  email: string;
}
export interface DeleteUserPayload {
  id?: number | undefined;
}

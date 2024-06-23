export interface CreateUserPayload {
  id?: number;
  name: string;
  email: string;
}
export interface DeleteUserPayload {
  id?: number | undefined;
}

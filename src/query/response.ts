type ErrorResponse = {
  status: number;
  success: false;
  error?: string | string[];
}
type SuccessResponse<T> = {
  data?: T;
  status: number;
  success: true;
}
export type Response<T = any> = SuccessResponse<T> | ErrorResponse
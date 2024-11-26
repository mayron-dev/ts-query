export type Response<T = any> = {
  data?: T;
  status: number;
  error?: string | string[];
  success: boolean;
}
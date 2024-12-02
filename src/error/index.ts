export enum ErrorType {
  Build = "build",
  BodyValidation = "body-validation",
  ResponseValidation = "response-validation",
  Response = "response",
}
type ResponseSuccess = {
  status: number;
  data: any;
  sucess: true;
}

export class TsRequestError extends Error {
  errorType: ErrorType;
  error: { [key: string]: string | string[] | undefined } | string | string[];
  status?: number;

  constructor(
    errorType: ErrorType,
    error: { [key: string]: string | string[] | undefined } | string | string[],
    status?: number,
  ) {
    super()
    this.errorType = errorType;
    this.error = error;
    this.status = status;
  }
}

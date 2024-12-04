export enum ErrorType {
  Build = "build",
  BodyValidation = "body-validation",
  ResponseValidation = "response-validation",
  Response = "response",
}

export type ErrorData = { [key: string]: string | string[] | undefined } | string | string[];
export class TsRequestError extends Error {
  errorType: ErrorType;
  error: ErrorData;
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

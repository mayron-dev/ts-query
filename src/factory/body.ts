import { ErrorType, TsRequestError } from '../error';
import { convertFormDataToJSON } from '../utils/body';

export type Body = any | FormData;

export type BodyValidator = (data: Body) => { [key: string]: string | string[] | undefined } | undefined;
type BodyBuilder = {
  validate: (validator: BodyValidator) => {
    build: () => Body;
  };
  build: () => Body;
}
export const body = (value: Body, type: "json" | "form" = "json"): BodyBuilder => {
  const body = type === "json" ? value : convertFormDataToJSON(value as FormData);
  return {
    validate: (validator: BodyValidator) => {
      const errors = validator(body);
      if (errors) {
        throw new TsRequestError(ErrorType.BodyValidation, errors);
      }
      return {
        build: () => body
      };
    },
    build: (): Body => body,
  }
}
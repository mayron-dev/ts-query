import { ErrorType, TsRequestError } from '../error';
import { body, Body } from './body';
import { filter, Filter } from './filter';
import { del, get, HttpMethod, patch, post, put } from './methods';

export type HttpRequest = {
  path: string;
  method?: HttpMethod;
  body?: Body;
  filter?: Filter;
  authorization?: string;
  contentType?: string;
  validateResponse?: (data: any) => { [key: string]: string | string[] | undefined } | undefined;
  abortSignal?: AbortSignal;
}

let defaultBasePath: string;

export const setDefaultBasePath = (path: string) => defaultBasePath = path;


let defaultAuthorization: string;

export const setDefaultAuthorization = (authorization: string) => defaultAuthorization = authorization;

export const http = <T>(basePath?: string) => {
  const base = basePath ?? defaultBasePath;
  if (!base) {
    throw new TsRequestError(ErrorType.Build, "base path is required");
  }

  const req: HttpRequest = {
    path: base,
    authorization: defaultAuthorization
  }
  return {
    get: (path: string) => get<T>(req, path),
    post: (path: string) => post<T>(req, path),
    put: (path: string) => put<T>(req, path),
    delete: (path: string) => del<T>(req, path),
    patch: (path: string) => patch<T>(req, path),
  }
}

export { body, filter };

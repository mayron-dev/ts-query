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
  runner: QueryRunner;
}
export type HttpRequestOptions = {
  path: string;
  method: HttpMethod;
  headers: { [key: string]: string };
  body?: { [key: string]: any };
  abortSignal?: AbortSignal;
}
type QueryRunnerResult<T = any> = {
  data: T;
  status: number;
}

export type QueryRunner<T = any> = (req: HttpRequestOptions) => Promise<QueryRunnerResult<T>>;

type HttpParams<T = any> = {
  basePath: string;
  authorization?: string;
  contentType?: string;
  runner: QueryRunner<T>;
}
export const http = <T>({ basePath, runner, authorization, contentType }: HttpParams<T>) => {
  const path = basePath;
  if (!path) {
    throw new TsRequestError(ErrorType.Build, "base path is required");
  }

  const req: HttpRequest = {
    path,
    authorization,
    contentType: contentType ?? 'application/json',
    runner,
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

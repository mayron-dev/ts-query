import { body, Body } from './body';
import { filter, Filter } from './filter';
import { del, get, HttpMethod, patch, post, put } from './methods';

export type HttpRequest = {
  path: string;
  method?: HttpMethod;
  body?: Body;
  filter?: Filter;
  headers?: { [key: string]: string };
  validateResponse?: (data: unknown) => { [key: string]: string | string[] | undefined } | undefined;
  abortSignal?: AbortSignal;
  runner: QueryRunner;
}
export type HttpRequestOptions = {
  path: string;
  method: HttpMethod;
  headers: { [key: string]: string };
  body?: any;
  abortSignal?: AbortSignal;
}
type QueryRunnerResult<T = any> = {
  data: T;
  status: number;
}

export type QueryRunner<T = any> = (req: HttpRequestOptions) => Promise<QueryRunnerResult<T>>;

export type HttpOptions<T = any> = {
  basePath: string;
  runner: QueryRunner<T>;
}
export const http = <T>({ basePath, runner }: HttpOptions<T>) => {
  const req: HttpRequest = {
    path: basePath,
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

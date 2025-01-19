import { HttpRequest, QueryRunnerResult } from './';
import { BodyValidator } from './body';
import { Filter } from './filter';
import { run } from './run';
import { url, UrlOptions } from './url';

export type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

const buildPath = (basePath: string, path: string) => {
  if (basePath.endsWith("/")) {
    basePath = basePath.substring(0, basePath.length - 1);
  }
  if (path.startsWith("/")) {
    path = path.substring(1);
  }
  return `${basePath}/${path}`;
}
export type InternalRequestBuilder<T> = {
  abortSignal: (signal: AbortSignal) => InternalRequestBuilder<T>;
  filter: (filter: Filter) => InternalRequestBuilder<T>;
  validateResponse: (validator: BodyValidator) => InternalRequestBuilder<T>;
  headers: (value: { [key: string]: string }) => InternalRequestBuilder<T>;
  header: (key: string, value: string) => InternalRequestBuilder<T>;
  body: (value: any) => InternalRequestBuilder<T>;
  url: (opts?: UrlOptions) => string;
  run: () => Promise<QueryRunnerResult<T>>;
};

export type InternalGetRequestBuilder<T> = {
  abortSignal: (signal: AbortSignal) => InternalGetRequestBuilder<T>;
  filter: (filter: Filter) => InternalGetRequestBuilder<T>;
  validateResponse: (validator: BodyValidator) => InternalGetRequestBuilder<T>;
  headers: (value: { [key: string]: string }) => InternalGetRequestBuilder<T>;
  header: (key: string, value: string) => InternalGetRequestBuilder<T>;
  url: (opts?: UrlOptions) => string;
  run: () => Promise<QueryRunnerResult<T>>;
};
const internalGet = <T>(req: HttpRequest, path?: string): InternalGetRequestBuilder<T> => {
  req.path = path ? buildPath(req.path, path) : req.path;
  req.method = "GET";

  return {
    abortSignal: (signal: AbortSignal): InternalGetRequestBuilder<T> => {
      req.abortSignal = signal;
      return internalGet<T>(req, undefined);
    },
    filter: (filter: Filter): InternalGetRequestBuilder<T> => {
      req.filter = filter;
      return internalGet<T>(req, undefined);
    },
    validateResponse: (validator: BodyValidator): InternalGetRequestBuilder<T> => {
      req.validateResponse = validator;
      return internalGet<T>(req, undefined);
    },
    headers: (value: { [key: string]: string }): InternalGetRequestBuilder<T> => {
      req.headers = value;
      return internalGet<T>(req, undefined);
    },
    header: (key: string, value: string): InternalGetRequestBuilder<T> => {
      req.headers = { ...req.headers, [key]: value };
      return internalGet<T>(req, undefined);
    },
    url: (opts?: UrlOptions): string => url(req, opts),
    run: (): Promise<QueryRunnerResult<T>> => run<T>(req),
  }
}
export const get = <T>(req: HttpRequest, path?: string): InternalGetRequestBuilder<T> => internalGet<T>(req, path);

const internalPost = <T>(req: HttpRequest, path?: string): InternalRequestBuilder<T> => {
  req.path = path ? buildPath(req.path, path) : req.path;
  req.method = "POST";
  return {
    abortSignal: (signal: AbortSignal): InternalRequestBuilder<T> => {
      req.abortSignal = signal;
      return internalPost<T>(req, undefined);
    },
    filter: (filter: Filter): InternalRequestBuilder<T> => {
      req.filter = filter;
      return internalPost<T>(req, undefined);
    },
    validateResponse: (validator: BodyValidator): InternalRequestBuilder<T> => {
      req.validateResponse = validator;
      return internalPost<T>(req, undefined);
    },
    body: (value: any): InternalRequestBuilder<T> => {
      req.body = value;
      return internalPost<T>(req, undefined);
    },
    headers: (value: { [key: string]: string }): InternalRequestBuilder<T> => {
      req.headers = value;
      return internalPost<T>(req, undefined);
    },
    header: (key: string, value: string): InternalRequestBuilder<T> => {
      req.headers = { ...req.headers, [key]: value };
      return internalPost<T>(req, undefined);
    },
    url: (opts?: UrlOptions): string => url(req, opts),
    run: (): Promise<QueryRunnerResult<T>> => run<T>(req),
  }
}
export const post = <T>(req: HttpRequest, path?: string): InternalRequestBuilder<T> => internalPost<T>(req, path);

const internalPut = <T>(req: HttpRequest, path?: string): InternalRequestBuilder<T> => {
  req.path = path ? buildPath(req.path, path) : req.path;
  req.method = "PUT";
  return {
    abortSignal: (signal: AbortSignal): InternalRequestBuilder<T> => {
      req.abortSignal = signal;
      return internalPut<T>(req, undefined);
    },
    filter: (filter: Filter): InternalRequestBuilder<T> => {
      req.filter = filter;
      return internalPut<T>(req, undefined);
    },
    validateResponse: (validator: BodyValidator): InternalRequestBuilder<T> => {
      req.validateResponse = validator;
      return internalPut<T>(req, undefined);
    },
    body: (value: any): InternalRequestBuilder<T> => {
      req.body = value;
      return internalPut<T>(req, undefined);
    },
    headers: (value: { [key: string]: string }): InternalRequestBuilder<T> => {
      req.headers = value;
      return internalPut<T>(req, undefined);
    },
    header: (key: string, value: string): InternalRequestBuilder<T> => {
      req.headers = { ...req.headers, [key]: value };
      return internalPut<T>(req, undefined);
    },
    url: (opts?: UrlOptions): string => url(req, opts),
    run: (): Promise<QueryRunnerResult<T>> => run<T>(req),
  }
}
export const put = <T>(req: HttpRequest, path?: string): InternalRequestBuilder<T> => internalPut<T>(req, path);

const internalPatch = <T>(req: HttpRequest, path?: string): InternalRequestBuilder<T> => {
  req.path = path ? buildPath(req.path, path) : req.path;
  req.method = "PATCH";
  return {
    abortSignal: (signal: AbortSignal): InternalRequestBuilder<T> => {
      req.abortSignal = signal;
      return internalPatch<T>(req, undefined);
    },
    filter: (filter: Filter): InternalRequestBuilder<T> => {
      req.filter = filter;
      return internalPatch<T>(req, undefined);
    },
    validateResponse: (validator: BodyValidator): InternalRequestBuilder<T> => {
      req.validateResponse = validator;
      return internalPatch<T>(req, undefined);
    },
    body: (value: any): InternalRequestBuilder<T> => {
      req.body = value;
      return internalPatch<T>(req, undefined);
    },
    headers: (value: { [key: string]: string }): InternalRequestBuilder<T> => {
      req.headers = value;
      return internalPatch<T>(req, undefined);
    },
    header: (key: string, value: string): InternalRequestBuilder<T> => {
      req.headers = { ...req.headers, [key]: value };
      return internalPatch<T>(req, undefined);
    },
    url: (opts?: UrlOptions): string => url(req, opts),
    run: (): Promise<QueryRunnerResult<T>> => run<T>(req),
  }
}
export const patch = <T>(req: HttpRequest, path?: string): InternalRequestBuilder<T> => internalPatch<T>(req, path);

const internalDelete = <T>(req: HttpRequest, path?: string): InternalRequestBuilder<T> => {
  req.path = path ? buildPath(req.path, path) : req.path;
  req.method = "DELETE";
  return {
    abortSignal: (signal: AbortSignal): InternalRequestBuilder<T> => {
      req.abortSignal = signal;
      return internalDelete<T>(req, undefined);
    },
    filter: (filter: Filter): InternalRequestBuilder<T> => {
      req.filter = filter;
      return internalDelete<T>(req, undefined);
    },
    validateResponse: (validator: BodyValidator): InternalRequestBuilder<T> => {
      req.validateResponse = validator;
      return internalDelete<T>(req, undefined);
    },
    body: (value: any): InternalRequestBuilder<T> => {
      req.body = value;
      return internalDelete<T>(req, undefined);
    },
    headers: (value: { [key: string]: string }): InternalRequestBuilder<T> => {
      req.headers = value;
      return internalDelete<T>(req, undefined);
    },
    header: (key: string, value: string): InternalRequestBuilder<T> => {
      req.headers = { ...req.headers, [key]: value };
      return internalDelete<T>(req, undefined);
    },
    url: (opts?: UrlOptions): string => url(req, opts),
    run: (): Promise<QueryRunnerResult<T>> => run<T>(req),
  }
}
export const del = <T>(req: HttpRequest, path: string): InternalRequestBuilder<T> => internalDelete<T>(req, path);
import { HttpRequest } from './';
import { BodyValidator } from './body';
import { Filter } from './filter';
import { run } from './run';

export type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

const buildPath = (basePath: string, path: string) => {
  return basePath.endsWith("/") ? basePath + path : basePath + "/" + path;
}

const internalGet = <T>(req: HttpRequest, path?: string) => {
  req.path = !!path ? buildPath(req.path, path) : req.path;
  req.method = "GET";

  return {
    abortSignal: (signal: AbortSignal) => {
      req.abortSignal = signal;
      return internalGet<T>(req, undefined);
    },
    filter: (filter: Filter) => {
      req.filter = filter;
      return internalGet<T>(req, undefined);
    },
    validateResponse: (validator: BodyValidator) => {
      req.validateResponse = validator;
      return internalGet<T>(req, undefined);
    },
    contentType: (contentType: string) => {
      req.contentType = contentType;
      return internalGet<T>(req, undefined);
    },
    authorization: (authorization: string) => {
      req.authorization = authorization;
      return internalGet<T>(req, undefined);
    },
    run: () => run<T>(req),
  }
}
export const get = <T>(req: HttpRequest, path?: string) => internalGet<T>(req, path);


const internalPost = <T>(req: HttpRequest, path?: string) => {
  req.path = !!path ? buildPath(req.path, path) : req.path;
  req.method = "POST";
  return {
    abortSignal: (signal: AbortSignal) => {
      req.abortSignal = signal;
      return internalPost<T>(req, undefined);
    },
    filter: (filter: Filter) => {
      req.filter = filter;
      return internalPost<T>(req, undefined);
    },
    validateResponse: (validator: BodyValidator) => {
      req.validateResponse = validator;
      return internalPost<T>(req, undefined);
    },
    contentType: (contentType: string) => {
      req.contentType = contentType;
      return internalPost<T>(req, undefined);
    },
    authorization: (authorization: string) => {
      req.authorization = authorization;
      return internalPost<T>(req, undefined);
    },
    body: (value: any) => {
      req.body = value;
      return internalPost<T>(req, undefined);
    },
    run: () => run<T>(req),
  }
}
export const post = <T>(req: HttpRequest, path?: string) => internalPost<T>(req, path);


const internalPut = <T>(req: HttpRequest, path?: string) => {
  req.path = !!path ? buildPath(req.path, path) : req.path;
  req.method = "PUT";
  return {
    abortSignal: (signal: AbortSignal) => {
      req.abortSignal = signal;
      return internalPut<T>(req, undefined);
    },
    filter: (filter: Filter) => {
      req.filter = filter;
      return internalPut<T>(req, undefined);
    },
    validateResponse: (validator: BodyValidator) => {
      req.validateResponse = validator;
      return internalPut<T>(req, undefined);
    },
    contentType: (contentType: string) => {
      req.contentType = contentType;
      return internalPut<T>(req, undefined);
    },
    authorization: (authorization: string) => {
      req.authorization = authorization;
      return internalPut<T>(req, undefined);
    },
    body: (value: any) => {
      req.body = value;
      return internalPut<T>(req, undefined);
    },
    run: () => run<T>(req),
  }
}
export const put = <T>(req: HttpRequest, path?: string) => internalPut<T>(req, path);


const internalPatch = <T>(req: HttpRequest, path?: string) => {
  req.path = !!path ? buildPath(req.path, path) : req.path;
  req.method = "PATCH";
  return {
    abortSignal: (signal: AbortSignal) => {
      req.abortSignal = signal;
      return internalPatch<T>(req, undefined);
    },
    filter: (filter: Filter) => {
      req.filter = filter;
      return internalPatch<T>(req, undefined);
    },
    validateResponse: (validator: BodyValidator) => {
      req.validateResponse = validator;
      return internalPatch<T>(req, undefined);
    },
    contentType: (contentType: string) => {
      req.contentType = contentType;
      return internalPatch<T>(req, undefined);
    },
    authorization: (authorization: string) => {
      req.authorization = authorization;
      return internalPatch<T>(req, undefined);
    },
    body: (value: any) => {
      req.body = value;
      return internalPatch<T>(req, undefined);
    },
    run: () => run<T>(req),
  }
}
export const patch = <T>(req: HttpRequest, path?: string) => internalPatch<T>(req, path);


const internalDelete = <T>(req: HttpRequest, path?: string) => {
  req.path = !!path ? buildPath(req.path, path) : req.path;
  req.method = "DELETE";
  return {
    abortSignal: (signal: AbortSignal) => {
      req.abortSignal = signal;
      return internalDelete<T>(req, undefined);
    },
    filter: (filter: Filter) => {
      req.filter = filter;
      return internalDelete<T>(req, undefined);
    },
    validateResponse: (validator: BodyValidator) => {
      req.validateResponse = validator;
      return internalDelete<T>(req, undefined);
    },
    contentType: (contentType: string) => {
      req.contentType = contentType;
      return internalDelete<T>(req, undefined);
    },
    authorization: (authorization: string) => {
      req.authorization = authorization;
      return internalDelete<T>(req, undefined);
    },
    body: (value: any) => {
      req.body = value;
      return internalDelete<T>(req, undefined);
    },
    run: () => run<T>(req),
  }
}
export const del = <T>(req: HttpRequest, path: string) => internalDelete<T>(req, path);
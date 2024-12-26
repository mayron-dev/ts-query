import { ErrorType, TsRequestError } from '../error';
import { buildFilter } from '../utils';
import { HttpRequest } from './';

export type UrlOptions = {
  type: "url" | "path" | "query";
}
export const url = (req: HttpRequest, options: UrlOptions = { type: "url" }): string => {
  const filter = req.filter ? buildFilter(req.filter) : "";
  switch (options.type) {
    case "url":
      return req.path;
    case 'path':
      if (filter) return new URL(req.path).pathname + "?" + filter;
      return new URL(req.path).pathname;
    case 'query':
      return filter;
    default:
      throw new TsRequestError(ErrorType.Build, `Invalid URL type: ${options.type}`);
  }
}
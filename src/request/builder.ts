import { BodyBuilder, FilterBuilder } from '../builder';
import { HttpClient } from '../http';
import { Response } from './';

export enum HttpMethod {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  DELETE = "DELETE"
}

export abstract class RequestBuilder<T = any> {
  constructor(protected http: HttpClient<T>) { }

  protected abstract _method: HttpMethod;
  protected _path?: string;
  protected _abortSignal?: AbortSignal;
  protected _validator?: (data: T) => boolean;
  protected _filter?: FilterBuilder;
  protected _body?: BodyBuilder<T>;

  path(path: string): this {
    this._path = path;
    return this;
  }

  abortSignal(signal: AbortSignal): this {
    this._abortSignal = signal;
    return this;
  }

  protected validator(callback: (data: T) => boolean, force?: boolean): this {
    if (!this._validator || force) this._validator = callback;
    return this;
  }

  protected filter(): FilterBuilder {
    this._filter = this._filter || new FilterBuilder(this);
    return this._filter;
  }

  protected body(body?: T): BodyBuilder<T> {
    this._body = this._body || new BodyBuilder(this, body);
    return this._body;
  }

  run(): Promise<Response<T>> {
    return this.http.run({
      body: this._body?.value,
      filter: this._filter?.value,
      method: this._method,
      path: this._path,
      abortSignal: this._abortSignal,
      responseValidator: this._validator,
    });
  }
}

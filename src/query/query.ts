
import { Body, BodyBuilder, FilterBuilder } from '../builder';
import { HTTP } from '../http';

export enum Method {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  DELETE = "DELETE"
}

export abstract class Query {
  constructor(protected http: HTTP<any>) { }
  protected abstract _method: Method;

  protected _path?: string;
  path(path: string): this {
    this._path = path;
    return this;
  }

  protected _abortSignal?: AbortSignal;
  abortSignal(signal: AbortSignal): this {
    this._abortSignal = signal;
    return this;
  }

  protected _validator?: (data: any) => boolean;
  validator(callback: (data: any) => boolean, force?: boolean): this {
    if (!this._validator || force) this._validator = callback;
    return this;
  }

  protected _filter?: FilterBuilder;
  protected filter(): FilterBuilder {
    this._filter = new FilterBuilder(this);
    return this._filter;
  }

  protected _body?: BodyBuilder;
  protected body<T = Body>(body?: T): BodyBuilder {
    if (!this._body) {
      this._body = new BodyBuilder(this, body);
    } else if (this._body && body) {
      this._body.set(body);
    }
    return this._body;
  }

  run() {
    return this.http.run({
      body: this._body?.value,
      filter: this._filter?.value,
      method: this._method,
      path: this._path,
      abortSignal: this._abortSignal,
      responseValidator: this._validator
    });
  }
}
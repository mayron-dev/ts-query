import { Body, BodyBuilder, FilterBuilder } from '../builder';
import { Response } from './response';

export enum Method {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  DELETE = "DELETE"
}

export abstract class Query {
  protected abstract _method: Method;

  protected _path?: string;
  path(path: string): this {
    this._path = path;
    return this
  }

  protected _validateResponse = true;
  validateResponse(v: boolean): this {
    this._validateResponse = v;
    return this;
  }

  protected _filter?: FilterBuilder;
  protected filter(): FilterBuilder {
    this._filter = new FilterBuilder(this)
    return this._filter
  }

  protected _body?: BodyBuilder;
  protected body<T = Body>(body?: T): BodyBuilder {
    if (!this._body) {
      this._body = new BodyBuilder(this, body);
    } else if (this._body && body) {
      this._body.set(body)
    }
    return this._body;
  }

  abstract run<T>(): Promise<Response<T>>;
}
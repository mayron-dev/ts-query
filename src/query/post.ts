import { Body } from '../builder';
import { buildFilter } from '../utils';
import { Method, Query } from './';
import { Response } from './response';

export class PostQuery extends Query {
  override readonly _method = Method.POST

  public override body<T = Body>(body?: T) {
    return super.body(body)
  }

  async run<T>(): Promise<Response<T>> {
    console.log({
      method: this._method,
      path: this._path,
      validateResponse: this._validateResponse,
      body: this._body,
      filter: this._filter ? buildFilter(this._filter?.getValue()) : ''
    });
    return {
      status: 200,
      success: true
    }
  }
}
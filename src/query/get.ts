import { FilterBuilder } from '../builder';
import { buildFilter } from '../utils';
import { Method, Query } from './query';
import { Response } from './response';

export class GetQuery extends Query {
  override readonly _method = Method.GET

  public override filter(): FilterBuilder {
    return super.filter()
  }

  async run<T>(): Promise<Response<T>> {
    console.log({
      method: this._method,
      path: this._path,
      validateResponse: this._validateResponse,
      filter: this._filter ? buildFilter(this._filter?.getValue()) : ''
    });
    return {
      status: 200,
      success: true
    }
  }
}
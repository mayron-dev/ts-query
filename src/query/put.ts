import { Body, FilterBuilder } from '../builder';
import { Method, Query } from './';

export class PutQuery extends Query {
  override readonly _method = Method.PUT

  public override body<T = Body>(body?: T) {
    return super.body(body)
  }

  public override filter(): FilterBuilder {
    return super.filter()
  }
}
import { Body, FilterBuilder } from '../builder';
import { Method, Query } from './';

export class DeleteQuery extends Query {
  override readonly _method = Method.DELETE

  public override body<T = Body>(body?: T) {
    return super.body(body)
  }

  public override filter(): FilterBuilder {
    return super.filter()
  }
}
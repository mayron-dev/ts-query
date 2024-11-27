import { Body } from '../builder';
import { Method, Query } from './';

export class PostQuery extends Query {
  override readonly _method = Method.POST

  public override body<T = Body>(body?: T) {
    return super.body(body)
  }
}
import { FilterBuilder } from '../builder';
import { Method, Query } from './query';

export class GetQuery extends Query {
  override readonly _method = Method.GET;

  public override filter(): FilterBuilder {
    return super.filter();
  }
}
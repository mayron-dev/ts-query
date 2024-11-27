import { FilterBuilder } from '../builder';
import { HttpMethod, RequestBuilder } from './builder';

export class GetRequest extends RequestBuilder {
  override readonly _method = HttpMethod.GET;

  public override filter(): FilterBuilder {
    return super.filter();
  }
}

export class PostRequest extends RequestBuilder {
  override readonly _method = HttpMethod.POST

  public override body<T = Body>(body?: T) {
    return super.body(body)
  }
}

export class PutRequest extends RequestBuilder {
  override readonly _method = HttpMethod.PUT

  public override body<T = Body>(body?: T) {
    return super.body(body)
  }

  public override filter(): FilterBuilder {
    return super.filter()
  }
}

export class DeleteRequest extends RequestBuilder {
  override readonly _method = HttpMethod.DELETE

  public override body<T = Body>(body?: T) {
    return super.body(body)
  }

  public override filter(): FilterBuilder {
    return super.filter()
  }
}
import { DeleteQuery, GetQuery, PostQuery, PutQuery } from './query';

export const http = {
  get: () => new GetQuery(),
  post: () => new PostQuery(),
  put: () => new PutQuery(),
  delete: () => new DeleteQuery(),
}
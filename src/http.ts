import { Axios, AxiosError } from 'axios';

import { Body, Filter } from './builder';
import { DeleteQuery, GetQuery, Method, PostQuery, PutQuery } from './query';
import { Response } from './query/response';
import { buildFilter } from './utils';

export type HttpRunOptions = {
  path?: string;
  body?: Body;
  filter?: Filter;
  method: Method;
  responseValidator?: (data: any) => boolean;
  abortSignal?: AbortSignal;
}

export class HTTP<T> {
  private _baseUrl: string;
  private axios: Axios;

  constructor(baseUrl: string) {
    this._baseUrl = baseUrl;
    this.axios = new Axios({
      baseURL: this._baseUrl
    });
  }

  private _get?: GetQuery;
  get() { return this._get = this._get || new GetQuery(this); }

  private _post?: PostQuery;
  post() { return this._post = this._post || new PostQuery(this); }

  private _put?: PutQuery;
  put() { return this._put = this._put || new PutQuery(this); }

  private _delete?: DeleteQuery;
  delete() { return this._delete = this._delete || new DeleteQuery(this); }

  async run(options: HttpRunOptions): Promise<Response<T>> {
    const {
      path,
      body,
      filter,
      method,
      responseValidator,
      abortSignal
    } = options;

    try {
      if (!path) throw new Error('path is required');
      if (!method) throw new Error('method is required');

      const response = await this.axios.request({
        method,
        url: path,
        data: body,
        params: filter ? buildFilter(filter) : undefined,
        signal: abortSignal
      });

      if (responseValidator) {
        const valid = responseValidator(response.data);
        if (!valid) {
          return {
            status: response.status,
            success: false,
            error: "Response is not valid",
          }
        }

        return {
          status: response.status,
          success: true,
          data: response.data
        }
      }
      return {
        status: response.status,
        success: true,
        data: response.data
      }
    } catch (error) {
      console.error(error);
      if (error instanceof AxiosError) {
        if (error.response) {
          return {
            status: error.response.status || 500,
            success: false,
            error: error.response.data.error
          }
        }
        return {
          status: 400,
          success: false,
          error: (error as Error).message
        }
      }
      return {
        status: 500,
        success: false,
        error: (error as Error).message
      }
    }
  }
}
export const http = (baseUrl: string) => new HTTP(baseUrl);
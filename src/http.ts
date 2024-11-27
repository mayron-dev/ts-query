import { Axios, AxiosError } from 'axios';

import { Body, Filter } from './builder';
import {
  DeleteRequest, GetRequest, HttpMethod, PostRequest, PutRequest, Response
} from './request';
import { buildFilter } from './utils';

export type HttpRunOptions = {
  path?: string;
  body?: Body;
  filter?: Filter;
  method: HttpMethod;
  responseValidator?: (data: any) => boolean;
  abortSignal?: AbortSignal;
}

export class HttpClient<T> {
  private baseUrl: string;
  private axios: Axios;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
    this.axios = new Axios({
      baseURL: this.baseUrl
    });
  }

  private _get?: GetRequest;
  get() { return this._get = this._get || new GetRequest(this); }

  private _post?: PostRequest;
  post() { return this._post = this._post || new PostRequest(this); }

  private _put?: PutRequest;
  put() { return this._put = this._put || new PutRequest(this); }

  private _delete?: DeleteRequest;
  delete() { return this._delete = this._delete || new DeleteRequest(this); }

  async run(options: HttpRunOptions): Promise<Response<T>> {
    const { path, body, filter, method, responseValidator, abortSignal } = options;

    if (!method) throw new Error("method is required");

    try {
      const response = await this.axios.request({
        method,
        baseURL: this.baseUrl,
        url: path,
        data: body,
        params: filter ? buildFilter(filter) : undefined,
        signal: abortSignal,
      });

      return this.validateResponse(response, responseValidator);
    } catch (error) {
      return this.handleError(error);
    }
  }

  private validateResponse(response: any, validator?: (data: any) => boolean): Response<T> {
    if (validator && !validator(response.data)) {
      return {
        status: response.status,
        success: false,
        error: "Response is not valid",
      };
    }
    return {
      status: response.status,
      success: true,
      data: response.data,
    };
  }

  private handleError(error: any): Response<T> {
    if (error instanceof AxiosError) {
      return {
        status: error.response?.status || 400,
        success: false,
        error: error.response?.data?.error || error.message,
      };
    }
    return {
      status: 500,
      success: false,
      error: error.message,
    };
  }
}

export const http = (baseUrl: string) => new HttpClient(baseUrl);

export default http;
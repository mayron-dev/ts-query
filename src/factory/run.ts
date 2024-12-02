import axios, { AxiosError } from 'axios';

import { ErrorType, TsRequestError } from '../error';
import { buildFilter } from '../utils';
import { HttpRequest } from './';

export const run = async <T>(req: HttpRequest): Promise<T> => {
  try {
    const response = await axios.request({
      method: req.method,
      url: req.path,
      data: req.body,
      params: req.filter ? buildFilter(req.filter) : undefined,
      signal: req.abortSignal,
      headers: {
        "Content-Type": req.contentType,
        Authorization: req.authorization
      }
    });

    if (req.validateResponse) {
      const res = req.validateResponse(response.data);
      if (res) {
        throw new TsRequestError(ErrorType.ResponseValidation, res);
      }
      return response.data;
    }
    return response.data;
  } catch (error) {
    if (error instanceof TsRequestError) {
      throw error;
    }
    if (error instanceof AxiosError) {
      throw new TsRequestError(
        ErrorType.Response,
        error.response?.data?.error || error.message,
        error.response?.status || 400
      );
    }
    throw new TsRequestError(ErrorType.Response, (error as any).message, 400);
  }
}
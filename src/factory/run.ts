import { ErrorType, TsRequestError } from '../error';
import { buildFilter } from '../utils';
import { HttpRequest, HttpRequestOptions, QueryRunner, QueryRunnerResult } from './';

export const run = async <T = any>(req: HttpRequest, runner?: QueryRunner<T>): Promise<QueryRunnerResult<T>> => {
  try {
    const params = req.filter ? buildFilter(req.filter) : "";
    const options: HttpRequestOptions = {
      path: `${req.path}${params.length ? "?" + params : ''}`,
      method: req.method ?? 'GET',
      abortSignal: req.abortSignal,
      body: req.body,
      headers: {
        ...req.headers,
      }
    }
    const response = runner ? await runner(options) : await req.runner(options);
    if (req.validateResponse) {
      const res = req.validateResponse(response.data);
      if (res) throw new TsRequestError(ErrorType.ResponseValidation, res);
      return response;
    }
    return response;
  } catch (error) {
    if (error instanceof TsRequestError) throw error;

    throw new TsRequestError(ErrorType.Response, (error as any).message, 400);
  }
}
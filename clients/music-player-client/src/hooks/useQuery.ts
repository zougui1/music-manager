import _axios, { AxiosError } from 'axios';
import { useQuery as useReactQuery, UseQueryResult, UseQueryOptions } from 'react-query';

import { axios } from '../utils';

export const useQuery = <TQueryFnData = unknown, TData = TQueryFnData>(key: string, url: string, options?: IUseQueryOptions<TQueryFnData, AxiosError<IError>, TData>): QueryResult<TData> => {
  // TODO register query
  const queryFunction = async (): Promise<TQueryFnData> => {
    const res = await axios.get<TQueryFnData>(url);
    return res.data;
  }

  const cancelableQuery = (): Promise<TQueryFnData> & { cancel: () => void } => {
    const source = _axios.CancelToken.source();
    const promise = queryFunction() as (Promise<TQueryFnData> & { cancel: () => void });
    promise.cancel = () => source.cancel('Query was cancelled.');

    return promise;
  }

  return useReactQuery(key, cancelableQuery, options);
}

interface IError {
  message: string;
  status: number;
  code: string;
}

export interface IUseQueryOptions<TQueryFnData, TError, TData> extends UseQueryOptions<TQueryFnData, TError, TData> {
  basePath?: string;
}

export type QueryResult<TData = unknown, TError = IError> = UseQueryResult<TData, AxiosError<TError>>;

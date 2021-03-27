import { AxiosError } from 'axios';
import { useQuery as useReactQuery, UseQueryResult, UseQueryOptions } from 'react-query';

import { axios } from '../utils';

export const useQuery = <TQueryFnData = unknown, TData = TQueryFnData>(key: string, url: string, options?: IUseQueryOptions<TQueryFnData, AxiosError<IError>, TData>): QueryResult<TData> => {
  const queryFunction = async () => {
    const res = await axios.get(url);
    return res.data;
  }

  return useReactQuery(key, queryFunction, options);
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

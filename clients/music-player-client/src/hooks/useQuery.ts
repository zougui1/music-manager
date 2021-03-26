import { useQuery as useReactQuery, UseQueryResult, UseQueryOptions } from 'react-query';
import { useSelector } from 'react-redux';

import { env } from '../env';
import { State } from '../store';

const okStatusCodes = [100, 102, 103, 200, 201, 202, 203, 204, 205, 206, 207, 208, 226, 307, 308];

export const useQuery = <TQueryFnData = unknown, TError = unknown, TData = TQueryFnData>(key: string, url: string, options?: UseQueryOptions<TQueryFnData, TError, TData>): UseQueryResult<TData, TError> => {
  const language = useSelector((state: State) => state.client.language);

  url = url.startsWith('http') ? url : env.API_SERVER_URL + '/api' + url;

  const queryFunction = async () => {
    const headers = {
      'Content-Language': language,
    };
    const res = await fetch(url, { headers });
    const result = await res.json();

    if (res.ok && okStatusCodes.includes(res.status)) {
      return result;
    }

    throw new Error(JSON.stringify(result));
  }

  return useReactQuery(key, queryFunction, options);
}

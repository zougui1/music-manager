import { useState } from 'react';
import { AxiosResponse, AxiosError } from 'axios';

export const useSubmit = <TData = any, TSuccess = any, TError = any>(options: UseSubmitOptions<TData, TSuccess, TError>): UseSubmitResult<TData, TError> => {
  const [error, setError] = useState<AxiosError<TError> | null>(null);

  const handleSubmit = async (data: TData) => {
    let response: AxiosResponse<TSuccess>;

    try {
      response = await options.onSubmit(data);
    } catch (e) {
      const error = e as AxiosError<TError>;
      options.onError?.(error);
      setError(error);
      return;
    }

    options.onSuccess?.(response);
  }

  return { error, handleSubmit };
}

export interface UseSubmitOptions<TData, TSuccess, TError> {
  onSubmit: (data: TData) => Promise<AxiosResponse<TSuccess>>;
  onSuccess?: (response: AxiosResponse<TSuccess>) => void;
  onError?: (error: AxiosError<TError>) => void;
}

export interface UseSubmitResult<TData, TError> {
  error: AxiosError<TError> | null;
  handleSubmit: (data: TData) => Promise<void>;
}

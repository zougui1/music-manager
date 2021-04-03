export enum QueryStatus {
  idle = 'idle',
  loading = 'loading',
  success = 'success',
  error = 'error',
}

export interface Query {
  key: string;
  queryKey: [string, any];
  status: QueryStatus;
  retryAt: Date;
}

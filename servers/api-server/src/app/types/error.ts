export interface PublicError {
  message: string;
  status: number;
  code: string;
  path: string;
  stack?: string[];
}

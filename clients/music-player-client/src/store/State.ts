import { ObjectLiteral } from 'types-pkg';

import { ConnectionStatus, Query } from '../types';
import { DownloadingStatus } from '../statuses';

export interface State {
  client: {
    user: ObjectLiteral | null | undefined,
    language: string,
    accessToken: string | null | undefined,
    status: ConnectionStatus,
  };
  downloading: {
    totalCount: number,
    downloadedCount: number,
    status: DownloadingStatus;
    progress: {
      percent: number,
      downloadingCount: number,
    },
  };
  http: {
    queries: Record<string, Query>,
  };
}

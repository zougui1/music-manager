import { ConnectionStatus } from '../types';

export const getConnectionStatus = (): ConnectionStatus => {
  return navigator.onLine
    ? ConnectionStatus.online
    : ConnectionStatus.offline;
}

import { ObjectOf } from './types';

export const disconnectOnProcessExit = (disconnect: (signal: string) => () => any): void => {
  process.once('SIGINT', disconnect('SIGINT'));
  process.once('SIGTERM', disconnect('SIGTERM'));
  process.once('exit', disconnect('exit'));
}

const nativeEvents: ObjectOf<boolean> = {
  $connection: true,
  $disconnect: true,
}

export const isNativeEvent = (event: string): boolean => {
  return !!nativeEvents[event];
}

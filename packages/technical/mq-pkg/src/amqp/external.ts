import { on, observe } from './amqp';
import { publish } from './lowAmqpApi';
import {
  ObjectLiteral,
  ConnectionHandler,
  DisconnectHandler,
  MessageHandler,
  QueueActions,
  MessageObserver,
  ConnectionObserver,
  EventObserver,
} from '../types';

export const forQueue = (queueName: string) => {
  const publishQueue = async (content: any, headers?: ObjectLiteral | null | undefined): Promise<void> => {
    await publish(queueName, content, headers);
  }

  const getArgs = <TBody = unknown>(eventNameOrListener: MessageHandler<TBody> | '$connection' | '$disconnect', listenerOrTypes?: ConnectionHandler | DisconnectHandler | string[] | undefined): { queueName: string, listener: MessageHandler<TBody>, types: string[] } => {
    const queue = typeof eventNameOrListener === 'string'
      ? eventNameOrListener
      : queueName;

    const listener = typeof listenerOrTypes === 'function'
      ? listenerOrTypes
      : eventNameOrListener as MessageHandler<TBody>;

    const types = Array.isArray(listenerOrTypes) ? listenerOrTypes : [];

    return {
      queueName: queue,
      listener: listener as MessageHandler<TBody>,
      types,
    };
  }

  function onQueue(eventName: '$connection', listener: ConnectionHandler): QueueActions;
  function onQueue(eventName: '$disconnect', listener: DisconnectHandler): QueueActions;
  function onQueue<TBody = unknown>(listener: MessageHandler<TBody>, forTypes?: string[]): QueueActions;
  function onQueue<TBody = unknown>(eventNameOrListener: MessageHandler<TBody> | '$connection' | '$disconnect', listenerOrTypes?: ConnectionHandler | DisconnectHandler | string[] | undefined): QueueActions {
    const { queueName, listener, types } = getArgs(eventNameOrListener, listenerOrTypes);
    on(queueName, listener, types)

    return queueActions;
  }

  function observeQueue<TBody = unknown>(eventName: '$connection'): ConnectionObserver;
  function observeQueue<TBody = unknown>(eventName: '$disconnect'): ConnectionObserver;
  function observeQueue<TBody = unknown>(forTypes?: string[]): MessageObserver<TBody>;
  function observeQueue<TBody = unknown>(eventNameOrTypes?: string[] | '$connection' | '$disconnect'): EventObserver<TBody> {
    if (Array.isArray(eventNameOrTypes)) {
      return observe(queueName, eventNameOrTypes);
    }

    return observe(queueName as '$connection' & '$disconnect');
  }

  const queueActions = {
    on: onQueue,
  };

  return {
    on: onQueue,
    publish: publishQueue,
    observe: observeQueue,
  };
}

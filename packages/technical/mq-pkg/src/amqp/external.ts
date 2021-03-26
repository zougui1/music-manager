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

  const getArgs = (eventNameOrListener: MessageHandler | '$connection' | '$disconnect', listenerOrTypes?: ConnectionHandler | DisconnectHandler | string[] | undefined): { queueName: string, listener: MessageHandler, types: string[] } => {
    const queue = typeof eventNameOrListener === 'string'
      ? eventNameOrListener
      : queueName;

    const listener = typeof listenerOrTypes === 'function'
      ? listenerOrTypes
      : eventNameOrListener as MessageHandler;

    const types = Array.isArray(listenerOrTypes) ? listenerOrTypes : [];

    return {
      queueName: queue,
      listener: listener as MessageHandler,
      types,
    };
  }

  function onQueue(eventName: '$connection', listener: ConnectionHandler): QueueActions;
  function onQueue(eventName: '$disconnect', listener: DisconnectHandler): QueueActions;
  function onQueue(listener: MessageHandler, forTypes?: string[]): QueueActions;
  function onQueue(eventNameOrListener: MessageHandler | '$connection' | '$disconnect', listenerOrTypes?: ConnectionHandler | DisconnectHandler | string[] | undefined): QueueActions {
    const { queueName, listener, types } = getArgs(eventNameOrListener, listenerOrTypes);
    on(queueName, listener, types)

    return queueActions;
  }

  function observeQueue(eventName: '$connection'): ConnectionObserver;
  function observeQueue(eventName: '$disconnect'): ConnectionObserver;
  function observeQueue(forTypes?: string[]): MessageObserver;
  function observeQueue(eventNameOrTypes?: string[] | '$connection' | '$disconnect'): EventObserver {
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

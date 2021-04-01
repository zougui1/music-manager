import { EventEmitter } from 'events';
import { Observable } from 'rxjs';

import { isConnected, connectionEvent, listenQueue } from './lowAmqpApi';
import { isNativeEvent } from '../utils';
import {
  MessageHandler,
  ConnectionHandler,
  DisconnectHandler,
  Actions,
  MessageObserver,
  ConnectionObserver,
  EventObserver,
  Message,
} from '../types';

let subscribed = false;
const listeners: { messageType: string, listener: MessageHandler }[] = [];
const messageEvent = new EventEmitter();

const consumer = (message: Message<unknown>) => {
  const { messageType } = message.headers;

  messageEvent.emit(messageType ?? '*', message);
}

const subscribe = async (queueName: string, listener: MessageHandler, forTypes: string[] = []): Promise<void> => {
  if (!isConnected()) {
    await new Promise(res => connectionEvent.on('connection', res));
  }

  const messageTypes = forTypes.length ? forTypes : ['*'];

  for (const messageType of messageTypes) {
    listeners.push({ messageType, listener });
    messageEvent.on(messageType, listener);
  }

  if (subscribed) {
    return;
  }

  await listenQueue(queueName, consumer);
  /*await listenQueue(queueName, (message) => {
    const { messageType } = message.headers;

    if (!forTypes.length || (messageType && forTypes.includes(messageType))) {
      listener(message);
    }
  });*/
}

export function on(eventName: '$connection', listener: ConnectionHandler): Actions;
export function on(eventName: '$disconnect', listener: DisconnectHandler): Actions;
export function on<TBody = unknown>(queueName: string, listener: MessageHandler<TBody>, forTypes: string[]): Actions;
export function on<TBody = unknown>(queueNameOrEvent: string | '$connection' | '$disconnect', listener: MessageHandler<TBody> | ConnectionHandler | DisconnectHandler, forTypes: string[] = []): Actions {
  if (isNativeEvent(queueNameOrEvent)) {
    connectionEvent.on(queueNameOrEvent.slice(1), listener);
  } else {
    subscribe(queueNameOrEvent, listener as MessageHandler, forTypes);
  }

  return actions;
}

export function observe(eventName: '$connection'): ConnectionObserver;
export function observe(eventName: '$disconnect'): ConnectionObserver;
export function observe<TBody = unknown>(queueName: string, forTypes: string[]): MessageObserver<TBody>;
export function observe<TBody = unknown>(queueNameOrEvent: string | '$connection' | '$disconnect', forTypes: string[] = []): EventObserver<TBody> {
  return new Observable(subscriber => {
    on(queueNameOrEvent, (msg: Message<TBody>) => {
      subscriber.next(msg);
    }, forTypes);
  });
}

export const actions: Actions = {
  on,
};

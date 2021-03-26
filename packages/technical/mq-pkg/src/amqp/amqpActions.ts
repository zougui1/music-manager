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
} from '../types';

const subscribe = async (queueName: string, listener: MessageHandler, forTypes: string[] = []): Promise<void> => {
  if (!isConnected()) {
    await new Promise(res => connectionEvent.on('connection', res));
  }

  await listenQueue(queueName, (message) => {
    const { messageType } = message.headers;

    if (!forTypes.length || (messageType && forTypes.includes(messageType))) {
      listener(message);
    }
  });
}

export function on(eventName: '$connection', listener: ConnectionHandler): Actions;
export function on(eventName: '$disconnect', listener: DisconnectHandler): Actions;
export function on(queueName: string, listener: MessageHandler, forTypes: string[]): Actions;
export function on(queueNameOrEvent: string | '$connection' | '$disconnect', listener: MessageHandler | ConnectionHandler | DisconnectHandler, forTypes: string[] = []): Actions {
  if (isNativeEvent(queueNameOrEvent)) {
    connectionEvent.on(queueNameOrEvent.slice(1), listener);
  } else {
    subscribe(queueNameOrEvent, listener as MessageHandler, forTypes);
  }

  return actions;
}

export function observe(eventName: '$connection'): ConnectionObserver;
export function observe(eventName: '$disconnect'): ConnectionObserver;
export function observe(queueName: string, forTypes: string[]): MessageObserver;
export function observe(queueNameOrEvent: string | '$connection' | '$disconnect', forTypes: string[] = []): EventObserver {
  return new Observable(subscriber => {
    on(queueNameOrEvent, (msg) => {
      subscriber.next(msg);
    }, forTypes);
  });
}

export const actions: Actions = {
  on,
};

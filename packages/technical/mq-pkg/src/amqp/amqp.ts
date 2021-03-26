import { start } from './lowAmqpApi';
import { on as rawOn, observe as rawObserve } from './amqpActions';
import {
  MessageHandler,
  ConnectionHandler,
  DisconnectHandler,
  Actions,
  MessageObserver,
  ConnectionObserver,
  EventObserver,
} from '../types';

export function on(eventName: '$connection', listener: ConnectionHandler): Actions;
export function on(eventName: '$disconnect', listener: DisconnectHandler): Actions;
export function on(queueName: string, listener: MessageHandler, forTypes: string[]): Actions;
export function on(queueNameOrEvent: string | '$connection' | '$disconnect', listener: MessageHandler | ConnectionHandler | DisconnectHandler, forTypes: string[] = []): Actions {
  start()
  return rawOn(queueNameOrEvent, listener as any, forTypes);
}

export function observe(eventName: '$connection'): ConnectionObserver;
export function observe(eventName: '$disconnect'): ConnectionObserver;
export function observe(queueName: string, forTypes: string[]): MessageObserver;
export function observe(eventName: string | '$connection' | '$disconnect', forTypes: string[] = []): EventObserver {
  start();
  return rawObserve(eventName, forTypes);
}

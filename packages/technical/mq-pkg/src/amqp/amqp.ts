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
export function on<TBody = unknown>(queueName: string, listener: MessageHandler<TBody>, forTypes: string[]): Actions;
export function on<TBody = unknown>(queueNameOrEvent: string | '$connecion' | '$disconnect', listener: MessageHandler<TBody> | ConnectionHandler | DisconnectHandler, forTypes: string[] = []): Actions {
  start()
  return rawOn(queueNameOrEvent, listener as any, forTypes);
}

export function observe(eventName: '$connection'): ConnectionObserver;
export function observe(eventName: '$disconnect'): ConnectionObserver;
export function observe<TBody = unknown>(queueName: string, forTypes: string[]): MessageObserver<TBody>;
export function observe<TBody = unknown>(eventName: string | '$connection' | '$disconnect', forTypes: string[] = []): EventObserver<TBody> {
  start();
  return rawObserve(eventName, forTypes);
}

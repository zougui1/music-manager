import { useState, useReducer, useRef, useEffect } from 'react';

import { env } from '../env';

const tryParse = (data: any): any => {
  try {
    return JSON.parse(data);
  } catch (err) {
    return data;
  }
}

const messageReducer = <TValue extends { totalCount: number }>(state: TValue, action: { type: string, payload: TValue }): TValue => {
  switch (action.type) {
    case 'ADD_TOTAL_COUNT':
      return {
        ...state,
        totalCount: state.totalCount + action.payload.totalCount,
      };

    default:
      return state;
  }
}

const defaultReducer = (state: unknown, action: unknown): unknown => {
  return action;
}

export function useLocalNotification<TMessage = any, TValue = TMessage>(options: UseLocalNotificationOptions<TMessage, TValue> | UseLocalNotificationOptionsWithReducer<TMessage, TValue>, dependencies: any[] = []): TValue {
  //const [message, setMessage] = useState<TValue>(options.defaultValue);
  //! not working
  //const msgRef = useRef<TValue>(options.defaultValue);
  const reducer = 'reducer' in options ? options.reducer : defaultReducer;
  const [message, dispatch] = useReducer<any>(reducer, options.defaultValue);

  useEffect(() => {
    const url = new URL(env.MERCURE_URL);
    const topics = options.topics.filter(topic => topic) as string[];

    if (!topics.length) {
      return;
    }

    for (const topic of topics) {
      url.searchParams.append('topic', topic);
    }

    const eventSource = new EventSource(url.toString());

    eventSource.onopen = () => options.onOpen?.();
    eventSource.onerror = () => options.onError?.();
    eventSource.onmessage = e => {
      const data = tryParse(e.data);
      const newMessage = options.onMessage
        ? options.onMessage(data, message as any)
        : data;
      //msgRef.current = newMessage;
      // @ts-ignore
      dispatch(newMessage);
    };

    return () => {
      eventSource.close();
    }
  }, dependencies);

  return message as TValue;
}

export interface UseLocalNotificationOptions<TMessage, TValue> {
  topics: (string | undefined)[];
  onOpen?: (() => void) | undefined | null;
  onError?: (() => void) | undefined | null;
  onMessage?: ((data: TMessage, state: TValue) => TValue) | undefined | null;
  defaultValue: TValue;
}

export interface UseLocalNotificationOptionsWithReducer<TMessage, TValue> {
  topics: (string | undefined)[];
  onOpen?: (() => void) | undefined | null;
  onError?: (() => void) | undefined | null;
  onMessage: ((data: TMessage, state: TValue) => { type: string, payload: unknown }) | undefined | null;
  defaultValue: TValue;
  reducer: ((state: TValue, action: { type: string, payload: unknown }) => TValue) | undefined;
}

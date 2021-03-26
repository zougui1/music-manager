import { useState, useEffect } from 'react';

import { env } from '../env';

const tryParse = (data: any): any => {
  try {
    return JSON.parse(data);
  } catch (err) {
    return data;
  }
}

export function useNotification<TMessage = any, TValue = TMessage>(options: UseNotificationOptionsWithDefault<TMessage, TValue>, dependencies?: any[]): TValue;
export function useNotification<TMessage = any>(options: UseNotificationOptions<TMessage>, dependencies?: any[]): TMessage | undefined;
export function useNotification<TMessage = any, TValue = TMessage>(options: UseNotificationOptions<TMessage>, dependencies: any[] = []): TValue | undefined {
  const [message, setMessage] = useState<TValue>();

  useEffect(() => {
    const url = new URL(env.MERCURE_URL);

    for (const topic of options.topics) {
      url.searchParams.append('topic', topic);
    }

    const eventSource = new EventSource(url.toString());

    eventSource.onopen = () => options.onOpen?.();
    eventSource.onerror = () => options.onError?.();
    eventSource.onmessage = e => {
      const data = tryParse(e.data);
      const newMessage = options.onMessage
        ? options.onMessage(data)
        : data;
      setMessage(newMessage);
    };

    return () => {
      eventSource.close();
    }
  }, dependencies);

  return message;
}

export interface UseNotificationOptions<TMessage> {
  topics: string[];
  onOpen?: (() => void) | undefined | null;
  onError?: (() => void) | undefined | null;
  onMessage?: ((data: TMessage) => void) | undefined | null;
}

export interface UseNotificationOptionsWithDefault<TMessage, TValue> extends UseNotificationOptions<TMessage> {
  defaultValue: TValue;
}

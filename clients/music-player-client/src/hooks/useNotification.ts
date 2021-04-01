import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { env } from '../env';
import { tryParseJson } from '../utils';
import { State } from '../store';

export const useNotification = <TMessage = unknown, TState = unknown>(options: UseNotificationOptions<TMessage, TState> & { selector: (state: State) => TState }, dependencies: any[] = []): TState => {
  const state = useSelector(options.selector);
  const dispatch = useDispatch();

  useEffect(() => {
    const topics = options.topics.filter(topic => topic) as string[];

    if (!topics.length) {
      return;
    }

    const url = new URL(env.MERCURE_URL);

    for (const topic of topics) {
      url.searchParams.append('topic', topic);
    }

    const eventSource = new EventSource(url.toString());

    eventSource.onopen = () => options.onOpen?.();
    eventSource.onerror = () => options.onError?.();
    eventSource.onmessage = (e) => {
      const data = tryParseJson(e.data);
      options.onMessage?.(data, { state, dispatch });
    }

    return () => {
      eventSource.close();
    }
  }, dependencies);

  return state;
}

export interface UseNotificationOptions<TMessage, TState> {
  //selector: (state: State) => TState;
  topics: (string | undefined)[];
  onOpen?: (() => void) | undefined;
  onMessage?: ((message: TMessage, store: { state: TState, dispatch: (value: any) => void }) => void) | undefined;
  onError?: (() => void) | undefined;
}

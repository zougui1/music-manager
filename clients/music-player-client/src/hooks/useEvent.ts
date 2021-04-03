import { useEffect } from 'react';
import { toArray } from 'utils-pkg';

export function useEvent<K extends keyof WindowEventMap>(event: K, listener: (this: Window, event: WindowEventMap[K]) => void, dependencies?: any[]): void;
export function useEvent<K extends keyof WindowEventMap>(events: K[], listener: (this: Window, event: WindowEventMap[K]) => void, dependencies?: any[]): void;
export function useEvent<K extends keyof WindowEventMap>(event: K | K[], listener: (this: Window, event: WindowEventMap[K]) => void, dependencies: any[] = []): void {
  const events = toArray(event);

  useEffect(() => {

    for (const event of events) {
      window.addEventListener(event, listener);
    }

    return () => {
      for (const event of events) {
        window.removeEventListener(event, listener);
      }
    }
  }, [event, listener, ...dependencies]);
}

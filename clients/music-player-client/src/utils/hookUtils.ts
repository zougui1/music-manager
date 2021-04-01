import { useDispatch } from 'react-redux';

export function createUseDispatchAction(action: () => void): (() => () => void);
export function createUseDispatchAction<T>(action: (payload: T) => void): (() => (payload: T) => void);
export function createUseDispatchAction<T>(action: (payload?: T) => void): (() => (payload?: T) => void)  {
  return function useDispatchAction() {
    const dispatch = useDispatch();
    return (payload?: T) => dispatch(action(payload));
  }
}

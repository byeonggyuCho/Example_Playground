import type { RootState } from '@/store';
import { useSelector } from 'react-redux';

type StateSelector<T> = (state: RootState) => T;
type EqualityFn<T> = (left: T, right: T) => boolean;

/**
 * 
 * @param selector 
 * @param equalityFn 
 * @example
  function MyComponent() {
	  const something = useRootState(state => state.some.thing);
  }
 */
export function useRootState<T>(
  selector: StateSelector<T>,
  equalityFn?: EqualityFn<T>
): ReturnType<StateSelector<T>> {
  return useSelector(selector, equalityFn);
}

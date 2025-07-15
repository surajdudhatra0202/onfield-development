import { useEffect, useCallback } from 'react';
export default function useDebounce(effect: never, dependencies: never, delay: number) {
  const callback = useCallback(effect, dependencies);
  useEffect(() => {
    const timeout = setTimeout(callback, delay);
    return () => clearTimeout(timeout);
  }, [callback, delay]);
}

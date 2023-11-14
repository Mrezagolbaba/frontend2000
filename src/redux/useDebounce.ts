import { useEffect, useRef, EffectCallback } from 'react';

const useDebounce = <T extends any[]>(callback: (...args: T) => void, delay: number): ((...args: T) => void) => {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect((): any => {
    // Cleanup the previous timeout on re-render
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const debouncedCallback = (...args: T) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      callback(...args);
    }, delay);
  };

  return debouncedCallback;
};

export default useDebounce;
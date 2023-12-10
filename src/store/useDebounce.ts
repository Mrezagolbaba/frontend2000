import { useEffect, useRef } from 'react';

type CallbackFunction<T extends any[]> = (...args: T) => void;

const useDebounce = <T extends any[]>(callback: CallbackFunction<T>, delay: number): CallbackFunction<T> => {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Cleanup the previous timeout on re-render
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const debouncedCallback: CallbackFunction<T> = (...args: T) => {
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

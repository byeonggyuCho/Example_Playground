import { useCallback, useEffect, useRef } from 'react';

type Option = {
  limit: number;
};

const DefaultOption: Option = {
  limit: 1000 * 60 * 5,
};

const useAutoLogout = (doLogout: () => void, option?: Option) => {
  const { limit } = option || DefaultOption;
  const timeId = useRef<number>();

  const start = useCallback(() => {
    timeId.current = window.setTimeout(doLogout, limit);
  }, [timeId, limit, doLogout]);

  const reset = useCallback(() => {
    if (timeId.current) {
      window.clearTimeout(timeId.current);
      timeId.current = undefined;
    }

    start();
  }, [start, timeId]);

  useEffect(() => {
    const handler = () => {
      reset();
    };

    window.addEventListener('mousemove', handler);

    return () => {
      window.removeEventListener('mousemove', handler);
    };
  }, [doLogout, reset]);

  return {
    reset,
  };
};

export default useAutoLogout;

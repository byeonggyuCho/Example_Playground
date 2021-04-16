import { loadScript } from '@/libs/utils/commonUtils';
import { useEffect, useRef } from 'react';

type Option = {
  url: string;
  loadSuccess?: (args?: any) => void;
  loadFailure?: (args?: any) => void;
};

type DependencyArray = any[];

const useLoadScript = (
  { url, loadSuccess, loadFailure }: Option,
  arr: DependencyArray = []
): void => {
  const isLoaded = useRef<boolean>(false);

  useEffect(() => {
    if (isLoaded.current) return;

    (async () => {
      try {
        const result = await loadScript(url);

        isLoaded.current = true;

        loadSuccess && loadSuccess(result);
      } catch (e) {
        console.error(e);

        loadFailure && loadFailure(e);
      }
    })();
  }, [url, loadSuccess, loadFailure, isLoaded, ...arr]);
};

export default useLoadScript;

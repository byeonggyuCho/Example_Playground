type FunctonType = (...args: any) => any;

type Debounce = <CallbackFunction extends FunctonType>(
  func: CallbackFunction,
  waitFor: number
) => (...args: Parameters<CallbackFunction>) => any;

/**
 * 디바운스 함수
 * @param func 콜백함수
 * @param waitFor 지연시간
 */
export const debounce: Debounce = (func, waitFor = 300) => {
  let timeout: ReturnType<typeof setTimeout>;
  const debounced = (...args: any[]) => {
    if (timeout !== undefined) {
      // console.log('🐽 debounce Clear');
      clearTimeout(timeout);
    }

    timeout = setTimeout(() => {
      func(...args);
    }, waitFor);
  };

  return debounced;
};

export default {
  debounce,
};

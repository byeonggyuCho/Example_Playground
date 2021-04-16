import { useReducer, useEffect } from 'react';


type ActionType ={

    type:string;
    payload:any;
    error?: Error
}


const  reducer = <State,Action extends ActionType>(state:State, action:Action) =>{
  switch (action.type) {
    case 'LOADING':
      return {
        loading: true,
        data: null,
        error: null
      };
    case 'SUCCESS':
      return {
        loading: false,
        data: action.payload,
        error: null
      };
    case 'ERROR':
      return {
        loading: false,
        data: null,
        error: action.error
      };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
}

/**
 *
 * callback { function } 실행할 비동기 함수
 * deps { Array } 데이터 요청을 해야하는 의존성배열
 * skip { boolean} 초기 랜더링시 요청 여부
 */
function useAsync(callback, deps = [], skip = false) {
  const [state, dispatch] = useReducer(reducer, {
    loading: false,
    data: null,
    error: false
  });

  const fetchData = async () => {
    dispatch({ type: 'LOADING' });
    try {
      const data = await callback();
      dispatch({ type: 'SUCCESS', data });
    } catch (e) {
      dispatch({ type: 'ERROR', error: e });
    }
  };

  useEffect(() => {
    if (skip) {
         return;
    }
    fetchData();
  }, deps);

  return [state, fetchData];
}

export default useAsync;
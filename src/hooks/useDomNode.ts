import { useCallback, useState } from 'react';
/**
 * React에서 node 생성시점을 캣치하기 위해 사용합니다.
 * @see https://reactjs.org/docs/hooks-faq.html#how-can-i-measure-a-dom-node
 */
const useDomNode = <ElementType>(initValue = null) => {
  const [node, setNode] = useState<ElementType | null>(initValue);
  const ref = useCallback((instance: ElementType) => {
    if (instance !== null) {
      setNode(instance);
    }
  }, []);
  return { node, ref };
};

export default useDomNode;

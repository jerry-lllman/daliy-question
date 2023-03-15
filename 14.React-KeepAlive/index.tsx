import { useEffect, useRef, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  cacheKey: string;
  disabled?: boolean;
}

function KeepAlive({ children, cacheKey, disabled = false }: Props) {
  const cacheRef = useRef<{ [key: string]: ReactNode }>({});
  const cacheChildren = cacheRef.current[cacheKey]
  const isRenderChildren = disabled || !cacheChildren

  useEffect(() => {
    if (!disabled) {
      if (!cacheChildren) {
        cacheRef.current[cacheKey] = children
      }
    }
  }, [children, cacheKey, disabled])


  return isRenderChildren ? <>{children}</> : <>{cacheChildren}</>;
}

export default KeepAlive;


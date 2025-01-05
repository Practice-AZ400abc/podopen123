import { useEffect, useRef } from 'react';
import LocomotiveScroll from 'locomotive-scroll';

export const useLocomotiveScroll = (options) => {
  const containerRef = useRef(null);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    scrollRef.current = new LocomotiveScroll({
      el: containerRef.current,
      ...options,
    });

    return () => {
      if (scrollRef.current) {
        scrollRef.current.destroy();
      }
    };
  }, [options]);


  
  return { containerRef, scrollRef };
};

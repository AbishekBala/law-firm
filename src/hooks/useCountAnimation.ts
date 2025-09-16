import { useState, useEffect, useRef } from 'react';

interface UseCountAnimationOptions {
  end: number;
  duration?: number;
  start?: number;
  decimals?: number;
}

export const useCountAnimation = ({ 
  end, 
  duration = 2000, 
  start = 0, 
  decimals = 0 
}: UseCountAnimationOptions) => {
  const [count, setCount] = useState(start);
  const [isInView, setIsInView] = useState(false);
  const countRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          setIsInView(true);
          hasAnimated.current = true;
        }
      },
      { threshold: 0.1 }
    );

    if (countRef.current) {
      observer.observe(countRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isInView) return;

    let startTime: number;
    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      
      const currentCount = start + (end - start) * easeOutCubic(progress);
      setCount(Number(currentCount.toFixed(decimals)));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [isInView, end, duration, start, decimals]);

  const easeOutCubic = (t: number): number => {
    return 1 - Math.pow(1 - t, 3);
  };

  return { count, countRef };
};
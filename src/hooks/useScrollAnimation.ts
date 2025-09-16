import { useState, useEffect, useRef } from 'react';

interface UseScrollAnimationOptions {
  threshold?: number;
  rootMargin?: string;
  delay?: number;
}

export const useScrollAnimation = ({ 
  threshold = 0.1, 
  rootMargin = '0px',
  delay = 0
}: UseScrollAnimationOptions = {}) => {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          setTimeout(() => {
            setIsVisible(true);
            hasAnimated.current = true;
          }, delay);
        }
      },
      { threshold, rootMargin }
    );

    const currentElement = elementRef.current;
    if (currentElement) {
      observer.observe(currentElement);
    }

    return () => {
      if (currentElement) {
        observer.unobserve(currentElement);
      }
    };
  }, [threshold, rootMargin, delay]);

  return { isVisible, elementRef };
};
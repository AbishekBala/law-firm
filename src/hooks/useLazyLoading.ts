import { useState, useEffect, useRef } from 'react';

interface UseLazyLoadingOptions {
  threshold?: number;
  rootMargin?: string;
}

export const useLazyLoading = ({ 
  threshold = 0.1, 
  rootMargin = '50px' 
}: UseLazyLoadingOptions = {}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasLoaded) {
          setIsVisible(true);
          setHasLoaded(true);
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
  }, [threshold, rootMargin, hasLoaded]);

  return { isVisible, elementRef, hasLoaded };
};
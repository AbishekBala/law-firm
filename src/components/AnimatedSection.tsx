import React from 'react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { cn } from '@/lib/utils';

interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  animation?: 'fadeInUp' | 'fadeInLeft' | 'fadeInRight' | 'scaleIn' | 'slideInUp';
  delay?: number;
}

const animationClasses = {
  fadeInUp: 'translate-y-10 opacity-0',
  fadeInLeft: '-translate-x-10 opacity-0',
  fadeInRight: 'translate-x-10 opacity-0',
  scaleIn: 'scale-95 opacity-0',
  slideInUp: 'translate-y-full opacity-0',
};

const visibleClasses = {
  fadeInUp: 'translate-y-0 opacity-100',
  fadeInLeft: 'translate-x-0 opacity-100',
  fadeInRight: 'translate-x-0 opacity-100',
  scaleIn: 'scale-100 opacity-100',
  slideInUp: 'translate-y-0 opacity-100',
};

export const AnimatedSection = ({ 
  children, 
  className, 
  animation = 'fadeInUp',
  delay = 0
}: AnimatedSectionProps) => {
  const { isVisible, elementRef } = useScrollAnimation({ delay });

  return (
    <div
      ref={elementRef}
      className={cn(
        'transition-all duration-700 ease-out',
        isVisible ? visibleClasses[animation] : animationClasses[animation],
        className
      )}
    >
      {children}
    </div>
  );
};
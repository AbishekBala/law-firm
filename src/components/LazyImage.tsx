import { useState } from 'react';
import { useLazyLoading } from '@/hooks/useLazyLoading';
import { cn } from '@/lib/utils';

interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
  placeholder?: string;
  onLoad?: () => void;
}

export const LazyImage = ({ 
  src, 
  alt, 
  className, 
  placeholder = "data:image/svg+xml,%3Csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='100%25' height='100%25' fill='%23f3f4f6'/%3E%3C/svg%3E",
  onLoad
}: LazyImageProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const { isVisible, elementRef } = useLazyLoading();

  const handleImageLoad = () => {
    setImageLoaded(true);
    onLoad?.();
  };

  return (
    <div ref={elementRef} className={cn("overflow-hidden", className)}>
      {isVisible && (
        <>
          {!imageLoaded && (
            <img
              src={placeholder}
              alt=""
              className={cn("w-full h-full object-cover transition-opacity duration-300", className)}
            />
          )}
          <img
            src={src}
            alt={alt}
            onLoad={handleImageLoad}
            className={cn(
              "w-full h-full object-cover transition-opacity duration-300",
              imageLoaded ? "opacity-100" : "opacity-0 absolute inset-0",
              className
            )}
            style={imageLoaded ? {} : { position: 'absolute', top: 0, left: 0 }}
          />
        </>
      )}
    </div>
  );
};
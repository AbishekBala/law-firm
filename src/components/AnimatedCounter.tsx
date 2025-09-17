import { useCountAnimation } from '@/hooks/useCountAnimation';

interface AnimatedCounterProps {
  value: string;
  label: string;
  className?: string;
  duration?: number;
  size?: 'sm' | 'md' | 'lg';
}

export const AnimatedCounter = ({ value, label, className = '', duration = 2000, size = 'lg' }: AnimatedCounterProps) => {
  // Extract number from value (e.g., "98%" -> 98, "500+" -> 500)
  const numericValue = parseInt(value.replace(/[^\d]/g, ''));
  const suffix = value.replace(/[\d]/g, '');
  
  const { count, countRef } = useCountAnimation({ 
    end: numericValue, 
    duration,
    decimals: value.includes('.') ? 1 : 0
  });

  const formatCount = (num: number) => {
    if (value.includes('+')) {
      return `${Math.floor(num)}+`;
    }
    if (value.includes('%')) {
      return `${Math.floor(num)}%`;
    }
    if (value.includes('.')) {
      return num.toFixed(1);
    }
    return Math.floor(num).toString();
  };

  const getNumberStyles = () => {
    switch (size) {
      case 'sm':
        return 'text-lg md:text-xl font-bold text-accent';
      case 'md':
        return 'text-2xl md:text-3xl font-bold text-accent';
      case 'lg':
      default:
        return 'text-4xl md:text-5xl font-bold text-accent';
    }
  };

  const getLabelStyles = () => {
    switch (size) {
      case 'sm':
        return 'text-xs font-medium text-neutral-300 uppercase tracking-wider';
      case 'md':
        return 'text-sm font-medium text-neutral-300 uppercase tracking-wider';
      case 'lg':
      default:
        return 'text-sm font-medium text-neutral-300 uppercase tracking-wider';
    }
  };

  return (
    <div ref={countRef} className={`text-center ${className}`}>
      <div className={`count-animation ${getNumberStyles()}`}>
        {formatCount(count)}
      </div>
      <div className={getLabelStyles()}>{label}</div>
    </div>
  );
};
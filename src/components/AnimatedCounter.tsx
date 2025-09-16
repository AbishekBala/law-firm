import { useCountAnimation } from '@/hooks/useCountAnimation';

interface AnimatedCounterProps {
  value: string;
  label: string;
  className?: string;
  duration?: number;
}

export const AnimatedCounter = ({ value, label, className = '', duration = 2000 }: AnimatedCounterProps) => {
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

  return (
    <div ref={countRef} className={`text-center ${className}`}>
      <div className="stat-number count-animation">
        {formatCount(count)}
      </div>
      <div className="stat-label">{label}</div>
    </div>
  );
};
import React, { useState, useEffect } from 'react';

export const easingFunctions = {
  linear: (t: number): number => t,
  easeOutExpo: (t: number): number => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t)),
  easeOutQuad: (t: number): number => 1 - (1 - t) * (1 - t),
  easeOutCubic: (t: number): number => 1 - Math.pow(1 - t, 3),
  easeOutQuart: (t: number): number => 1 - Math.pow(1 - t, 4),
};

const useCountAnimation = (
  targetValue: number,
  duration: number,
  easing: (t: number) => number
): number => {
  const [count, setCount] = useState<number>(0);

  useEffect(() => {
    let startTime: number | null = null;
    let startValue = count;
    let frameId: number;

    const animate = (currentTime: number): void => {
      if (!startTime) startTime = currentTime;
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      const easedProgress = easing(progress);
      const currentValue = Math.round(startValue + (targetValue - startValue) * easedProgress);
      
      setCount(currentValue);

      if (progress < 1) {
        frameId = requestAnimationFrame(animate);
      }
    };

    frameId = requestAnimationFrame(animate);
    
    return () => cancelAnimationFrame(frameId);
  }, [targetValue, duration, easing, count]);

  return count;
};

interface AnimatedCounterProps {
  value: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  class?: string;
  formatNumber?: boolean;
  easingFunction?: (t: number) => number;
}

export const AnimatedCounter = ({
  value,
  duration = 2000,
  prefix = '',
  suffix = '',
  class: className = '',
  formatNumber = true,
  easingFunction = easingFunctions.easeOutExpo
}: AnimatedCounterProps) => {
  const animatedValue = useCountAnimation(value, duration, easingFunction);
  
  const formattedValue = formatNumber 
    ? animatedValue.toLocaleString()
    : animatedValue.toString();

  const baseClasses = "tabular-nums inline-flex items-center";
  const finalClassName = className ? `${baseClasses} ${className}` : baseClasses;

  return (
    <span className={finalClassName}>
      {prefix && <span className="mr-1">{prefix}</span>}
      <span>{formattedValue}</span>
      {suffix && <span className="ml-1">{suffix}</span>}
    </span>
  );
};

export default AnimatedCounter;
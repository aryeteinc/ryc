// types/counter.ts

export type EasingFunction = (t: number) => number;

export interface AnimatedCounterProps {
  /**
   * The target value to animate to
   */
  value: number;
  
  /**
   * Duration of the animation in milliseconds
   * @default 2000
   */
  duration?: number;
  
  /**
   * Text to show before the number
   * @default ''
   */
  prefix?: string;
  
  /**
   * Text to show after the number
   * @default ''
   */
  suffix?: string;
  
  /**
   * Additional CSS classes
   * @default ''
   */
  className?: string;
  
  /**
   * Whether to format the number with thousand separators
   * @default true
   */
  formatNumber?: boolean;
  
  /**
   * Custom easing function for the animation
   * @default easeOutExpo
   */
  easingFunction?: EasingFunction;
}

export interface EasingFunctions {
  linear: EasingFunction;
  easeOutExpo: EasingFunction;
  easeOutQuad: EasingFunction;
  easeOutCubic: EasingFunction;
  easeOutQuart: EasingFunction;
}
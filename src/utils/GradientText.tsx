import React from 'react';

interface GradientTextProps {
  children: React.ReactNode;
  from?: string;
  to?: string;
  className?: string;
  direction?: 'left' | 'right' | 'top' | 'bottom' | 'diagonal';
  animated?: boolean;
  animationDuration?: 'slow' | 'normal' | 'fast';
}

const GradientText: React.FC<GradientTextProps> = ({
  children,
  from = 'from-blue-500',
  to = 'to-indigo-500',
  direction = 'right',
  className = '',
  animated = false,
  animationDuration = 'normal'
}) => {
  const getGradientDirection = () => {
    switch (direction) {
      case 'left':
        return 'bg-gradient-to-l';
      case 'top':
        return 'bg-gradient-to-t';
      case 'bottom':
        return 'bg-gradient-to-b';
      case 'diagonal':
        return 'bg-gradient-to-br';
      default:
        return 'bg-gradient-to-r';
    }
  };

  const getAnimationDuration = () => {
    switch (animationDuration) {
      case 'slow':
        return 'animate-[gradient_8s_ease_infinite]';
      case 'fast':
        return 'animate-[gradient_2s_ease_infinite]';
      default:
        return 'animate-[gradient_4s_ease_infinite]';
    }
  };

  const baseStyles = `
    ${getGradientDirection()}
    ${from}
    ${to}
    text-transparent
    bg-clip-text
    bg-size-200
    ${animated ? getAnimationDuration() : ''}
    ${className}
  `.trim();

  const style = animated ? {
    backgroundSize: '200% 200%'
  } : undefined;

  return (
    <span
      className={baseStyles}
      style={style}
    >
      {children}
    </span>
  );
};

// Define the animation keyframes in a style tag
const AnimationStyles = () => (
  <style>{`
    @keyframes gradient {
      0% { background-position: 0% 50%; }
      50% { background-position: 100% 50%; }
      100% { background-position: 0% 50%; }
    }
    .bg-size-200 {
      background-size: 200% 200%;
    }
  `}</style>
);

// Export both components
export { AnimationStyles };
export default GradientText;
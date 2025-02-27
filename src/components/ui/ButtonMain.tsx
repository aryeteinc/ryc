import React from 'react';

type TailwindColor = 
  | 'slate' | 'gray' | 'zinc' | 'neutral' | 'stone' 
  | 'red' | 'orange' | 'amber' | 'yellow' | 'lime' 
  | 'green' | 'emerald' | 'teal' | 'cyan' | 'sky' 
  | 'blue' | 'indigo' | 'violet' | 'purple' | 'fuchsia' 
  | 'pink' | 'rose';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  rounded?: 'none' | 'sm' | 'md' | 'lg' | 'full';
  backgroundColor?: TailwindColor | string;
  hoverColor?: TailwindColor | string;
  textColor?: string;
  href?: string;
  target?: '_blank' | '_self' | '_parent' | '_top';
  // Para navegación programática
  navigate?: () => void;
}

const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary',
  size = 'md',
  className = '',
  onClick,
  type = 'button',
  disabled = false,
  rounded = 'full',
  backgroundColor,
  hoverColor,
  textColor,
  href,
  target,
  navigate
}) => {
  const baseStyles = 'font-semibold transition-all duration-300';
  
  const getColorClasses = () => {
    if (backgroundColor || hoverColor) {
      const bgClass = backgroundColor?.startsWith('bg-') 
        ? backgroundColor 
        : `bg-${backgroundColor}-500`;
      
      const hoverClass = hoverColor?.startsWith('hover:bg-') 
        ? hoverColor 
        : `hover:bg-${hoverColor || backgroundColor}-600`;

      return `${bgClass} ${hoverClass} ${textColor || 'text-white'}`;
    }

    const variantStyles = {
      primary: 'bg-gray-100 hover:bg-gray-200 text-gray-900',
      secondary: 'bg-white border-2 border-gray-200 hover:border-gray-300 text-gray-600'
    };

    return variantStyles[variant];
  };
  
  const sizeStyles = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg'
  };
  
  const roundedStyles = {
    none: 'rounded-none',
    sm: 'rounded',
    md: 'rounded-md',
    lg: 'rounded-lg',
    full: 'rounded-full'
  };

  const handleClick = (e: React.MouseEvent) => {
    if (disabled) return;
    
    if (navigate) {
      navigate();
    }
    
    if (onClick) {
      onClick();
    }
  };

  const commonProps = {
    className: `
      ${baseStyles}
      ${getColorClasses()}
      ${sizeStyles[size]}
      ${roundedStyles[rounded]}
      ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105'}
      ${className}
    `,
    onClick: handleClick,
    disabled
  };

  // Si hay un href, renderiza un enlace
  if (href) {
    return (
      <a 
        href={href}
        target={target}
        rel={target === '_blank' ? 'noopener noreferrer' : undefined}
        {...commonProps}
      >
        {children}
      </a>
    );
  }

  // Si no hay href, renderiza un botón
  return (
    <button 
      type={type}
      {...commonProps}
    >
      {children}
    </button>
  );
};

export default Button;
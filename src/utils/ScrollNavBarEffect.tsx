// src/components/ScrollNavbarEffect.tsx
import React from 'react';
import type { ReactNode } from 'react';
import { useScrollEffect } from '../components/hooks/useScrollEffect';

interface ScrollNavbarEffectProps {
  children: ReactNode;
  threshold?: number;
  className?: string;
  scrolledClassName?: string;
  atTopClassName?: string;
}

export const ScrollNavbarEffect: React.FC<ScrollNavbarEffectProps> = ({
  children,
  threshold = 50,
  className = '',
  scrolledClassName = 'bg-transparent backdrop-blur-md shadow-md',
  atTopClassName = 'bg-white'
}) => {
  const { isScrolled, isAtTop } = useScrollEffect(threshold);

  const navClasses = `
    fixed top-0 left-0 right-0 w-full z-50
    transition-all duration-300 ease-in-out
    ${className}
    ${isScrolled ? scrolledClassName : ''}
    ${isAtTop ? atTopClassName : ''}
  `;

  // Clonamos el children (Navbar) y le pasamos la prop isScrolled
  const childrenWithProps = React.Children.map(children, child => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, { isScrolled });
    }
    return child;
  });

  return (
    <div className={navClasses}>
      {childrenWithProps}
    </div>
  );
};
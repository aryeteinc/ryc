// src/hooks/useScrollEffect.ts
import { useState, useEffect } from 'react';

interface ScrollState {
  isScrolled: boolean;
  isAtTop: boolean;
  scrollDirection: 'up' | 'down' | null;
  lastScrollY: number;
}

export const useScrollEffect = (threshold: number = 50) => {
  const [scrollState, setScrollState] = useState<ScrollState>({
    isScrolled: false,
    isAtTop: true,
    scrollDirection: null,
    lastScrollY: 0,
  });

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      setScrollState(prevState => {
        const newState = { ...prevState };
        newState.isScrolled = currentScrollY > threshold;
        newState.isAtTop = currentScrollY === 0;
        newState.scrollDirection = currentScrollY > prevState.lastScrollY ? 'down' : 'up';
        newState.lastScrollY = currentScrollY;
        return newState;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [threshold]);

  return scrollState;
};
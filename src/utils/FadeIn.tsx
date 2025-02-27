import React, { useEffect, useRef, useState } from 'react';

interface FadeInProps {
  children: React.ReactNode;
  duration?: number;          // Duración de la animación en ms
  delay?: number;            // Retraso antes de iniciar la animación en ms
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';  // Dirección del fade
  distance?: number;         // Distancia del movimiento en px
  threshold?: number;        // Porcentaje del elemento visible para activar
  className?: string;       // Clases adicionales
  once?: boolean;           // Si la animación debe ejecutarse solo una vez
  disabled?: boolean;       // Deshabilitar la animación
  easing?: string;         // Función de timing para la animación
}

const FadeIn: React.FC<FadeInProps> = ({
  children,
  duration = 800,
  delay = 0,
  direction = 'up',
  distance = 20,
  threshold = 0.1,
  className = '',
  once = true,
  disabled = false,
  easing = 'cubic-bezier(0.4, 0, 0.2, 1)'
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (disabled) return;
    
    const element = elementRef.current;
    if (!element) return;

    const shouldAnimate = !once || !hasAnimated;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && shouldAnimate) {
          setIsVisible(true);
          setHasAnimated(true);
          if (once) {
            observer.disconnect();
          }
        } else if (!once) {
          setIsVisible(false);
        }
      },
      {
        threshold: threshold,
        rootMargin: '10px'
      }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [disabled, once, threshold, hasAnimated]);

  const getDirectionTransform = () => {
    if (!isVisible) {
      switch (direction) {
        case 'up':
          return `translateY(${distance}px)`;
        case 'down':
          return `translateY(-${distance}px)`;
        case 'left':
          return `translateX(${distance}px)`;
        case 'right':
          return `translateX(-${distance}px)`;
        default:
          return 'none';
      }
    }
    return 'none';
  };

  const getStyles = (): React.CSSProperties => ({
    opacity: isVisible ? 1 : 0,
    transform: direction === 'none' ? 'none' : getDirectionTransform(),
    transition: `opacity ${duration}ms ${easing} ${delay}ms, transform ${duration}ms ${easing} ${delay}ms`,
    willChange: 'opacity, transform'
  });

  if (disabled) {
    return <>{children}</>;
  }

  return (
    <div
      ref={elementRef}
      className={`fade-in ${className}`}
      style={getStyles()}
    >
      {children}
    </div>
  );
};

export default FadeIn;
import React from 'react';
import { Badge } from 'lucide-react';

interface StatusBadgeProps {
  status: 'completado' | 'en-proceso' | 'planificacion';
  className?: string;
  showIcon?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

const StatusBadge = ({
  status,
  className = '',
  showIcon = true,
  size = 'sm'
}: StatusBadgeProps) => {
  const statusConfig = {
    'completado': {
      color: 'bg-green-500/80',
      textColor: 'text-white',
      text: 'Completado',
      icon: '✓'
    },
    'en-proceso': {
      color: 'bg-blue-500/80',
      textColor: 'text-white',
      text: 'En Proceso',
      icon: '⚡'
    },
    'planificacion': {
      color: 'bg-gray-500/80',
      textColor: 'text-white',
      text: 'Planificado',
      icon: '🔜'
    }
  };

  const sizeClasses = {
    sm: 'px-3 py-1 text-sm',
    md: 'px-4 py-1.5 text-base',
    lg: 'px-5 py-2 text-lg'
  };

  const config = statusConfig[status];

  if (status === 'completado') return null;

  return (
    <span 
      className={`
        ${sizeClasses[size]} 
        rounded-full 
        font-medium 
        backdrop-blur-md 
        ${config.color} 
        ${config.textColor} 
        ${className}
        transition-all
        duration-200
        flex
        items-center
        gap-1
      `}
    >
      {showIcon && <span className="mr-1">{config.icon}</span>}
      {config.text}
    </span>
  );
};

export default StatusBadge;
import React, { ReactNode } from 'react';

type CardVariant = 'default' | 'glass' | 'bordered';

interface CardProps {
  children: ReactNode;
  variant?: CardVariant;
  className?: string;
  hoverEffect?: boolean;
}

const variantClasses: Record<CardVariant, string> = {
  default: 'bg-white shadow-lg',
  glass: 'bg-white/70 backdrop-blur-sm shadow-lg',
  bordered: 'bg-white/80 backdrop-blur-sm shadow-md border-2 border-sky-200',
};

const Card: React.FC<CardProps> = ({
  children,
  variant = 'glass',
  className = '',
  hoverEffect = true,
}) => {
  const baseClasses = 'rounded-xl p-6';
  const hoverClasses = hoverEffect
    ? 'hover:shadow-xl transition-shadow duration-300'
    : '';

  return (
    <div
      className={`${baseClasses} ${variantClasses[variant]} ${hoverClasses} ${className}`}
    >
      {children}
    </div>
  );
};

export default Card;

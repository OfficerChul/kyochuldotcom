import React from 'react';

interface FancyButtonSmallProps {
  href?: string;
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
  borderColor?: string;
  borderWidth?: number;
  ariaLabel?: string;
  hoverBg?: string;
  noSvgBorder?: boolean;
  shineColor?: string;
}

const FancyButtonSmall: React.FC<FancyButtonSmallProps> = ({
  href,
  onClick,
  children,
  className = '',
  borderColor = '#b5ff0893',
  borderWidth = 2,
  ariaLabel,
  hoverBg,
  noSvgBorder = false,
  shineColor = 'from-transparent via-white/20 to-transparent'
}) => {
  const buttonContent = (
    <button
      onClick={onClick}
      className={`relative overflow-hidden cursor-pointer bg-transparent outline-none transition-all duration-1000 ease-in-out group/btn ${className}`}
      style={{
        border: borderColor === 'transparent' ? 'none' : `${borderWidth}px solid ${borderColor}`
      }}
      aria-label={ariaLabel}
    >
      {hoverBg && (
        <span className={`absolute inset-0 ${hoverBg} opacity-0 group-hover/btn:opacity-100 transition-opacity duration-500`}></span>
      )}
      {!noSvgBorder && (
        <svg
          className="absolute left-0 top-0 w-full h-full fill-none stroke-current stroke-dasharray-[150_480] stroke-dashoffset-150 transition-all duration-1000 ease-in-out group-hover/btn:stroke-dashoffset-[-480]"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <polyline points="99,1 99,99 1,99 1,1 99,1" className="bg-line" />
          <polyline points="99,1 99,99 1,99 1,1 99,1" className="hl-line" />
        </svg>
      )}
      <span className="relative z-10 flex items-center justify-center gap-2">
        {children}
      </span>
      <span className="absolute inset-0 overflow-hidden z-20 pointer-events-none">
        <span className={`absolute inset-0 -translate-x-full bg-gradient-to-r ${shineColor} group-hover/btn:translate-x-full transition-transform duration-700 ease-out`}></span>
      </span>
    </button>
  );

  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer">
        {buttonContent}
      </a>
    );
  }

  return buttonContent;
};

export default FancyButtonSmall;

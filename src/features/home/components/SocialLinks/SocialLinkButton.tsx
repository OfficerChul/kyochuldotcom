import React from 'react';

interface SocialLinkButtonProps {
  href?: string;
  onClick?: () => void;
  children: React.ReactNode;
  isPortfolio?: boolean;
  ariaLabel: string;
  target?: string;
  rel?: string;
  isInternalLink?: boolean;
  sonarColor?: string;
}

const SocialLinkButton: React.FC<SocialLinkButtonProps> = ({
  href,
  onClick,
  children,
  isPortfolio = false,
  ariaLabel,
  target = '_blank',
  rel = 'noopener noreferrer',
  isInternalLink = false,
  sonarColor
}) => {
  const className = `
    cursor-pointer mx-1 md:mx-2.5 w-[70px] h-[70px] rounded-full
    text-center relative z-10 text-white bg-white shadow-lg
    transition-all duration-100 ease-out hover:bg-[#5DDCFF]
    hover:scale-[0.93] hover:text-white
    after:absolute after:w-full after:h-full after:rounded-full
    after:content-[''] after:box-border after:top-0 after:left-0
    after:p-0 after:-z-10 after:shadow-[0_0_0_2px_rgba(178,221,76,1)]
    after:opacity-0 after:scale-90
    hover:after:animate-[sonarEffect_1.6s_ease-out]
    flex justify-center items-center
    ${isPortfolio ? 'animate-[blink-outline_1s_linear_infinite,bounce_5s_infinite] outline-3 outline-transparent' : ''}
  `.trim();

  const style = sonarColor
    ? ({ ['--sonar-color' as any]: sonarColor } as React.CSSProperties)
    : undefined;

  if (onClick) {
    return (
      <button
        onClick={onClick}
        className={className}
        style={style}
        aria-label={ariaLabel}
        type="button"
      >
        {children}
      </button>
    );
  }

  if (!href) {
    return null;
  }

  if (isInternalLink) {
    return (
      <div className={className} aria-label={ariaLabel} style={style}>
        {children}
      </div>
    );
  }

  return (
      <a
      href={href}
      target={target}
      rel={rel}
        className={className}
        style={style}
      aria-label={ariaLabel}
    >
      {children}
    </a>
  );
};

export default SocialLinkButton;
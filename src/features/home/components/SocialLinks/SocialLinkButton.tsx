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
}

const SocialLinkButton: React.FC<SocialLinkButtonProps> = ({
  href,
  onClick,
  children,
  isPortfolio = false,
  ariaLabel,
  target = '_blank',
  rel = 'noopener noreferrer',
  isInternalLink = false
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
    hover:after:animate-[sonarEffect_1.3s_ease-out_75ms]
    flex justify-center items-center
    ${isPortfolio ? 'animate-[blink-outline_1s_linear_infinite,bounce_5s_infinite] outline-3 outline-transparent' : ''}
  `.trim();

  if (onClick) {
    return (
      <button
        onClick={onClick}
        className={className}
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
      <div className={className} aria-label={ariaLabel}>
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
      aria-label={ariaLabel}
    >
      {children}
    </a>
  );
};

export default SocialLinkButton;
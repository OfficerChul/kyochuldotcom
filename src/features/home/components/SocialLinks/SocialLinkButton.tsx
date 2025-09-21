import React from 'react';
import './SocialLinkButton.css';

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
    social-link-button
    ${isPortfolio ? 'portfolio-button' : ''}
  `.trim();

  const style = {
    '--border-color': sonarColor || 'rgba(93, 220, 255, 1)',
    '--glow-color': sonarColor ? sonarColor.replace('0.6', '0.8') : 'rgba(93, 220, 255, 0.8)',
    '--inner-glow': sonarColor ? sonarColor.replace('0.6', '0.2') : 'rgba(93, 220, 255, 0.2)',
  } as React.CSSProperties;

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
import React from 'react';
import { Link } from 'react-router-dom';
import './SocialLinkButton.css';
import '../../../../shared/styles/animations.css';

interface SocialLinkButtonProps {
  href?: string;
  onClick?: () => void;
  children: React.ReactNode;
  isPortfolio?: boolean;
  ariaLabel: string;
  target?: string;
  rel?: string;
  sonarColor?: string;
  /**
   * Internal navigation target. When provided, the button renders
   * a React Router Link instead of an anchor tag.
   */
  to?: string;
  /**
   * @deprecated Use `to` instead. Kept for backwards compatibility.
   */
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
  sonarColor,
  to,
  isInternalLink = false
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

  const content = <span className="social-link-button__surface">{children}</span>;

  if (onClick) {
    return (
      <button
        onClick={onClick}
        className={className}
        style={style}
        aria-label={ariaLabel}
        type="button"
      >
        {content}
      </button>
    );
  }

  const internalDestination = to ?? (isInternalLink ? href : undefined);

  if (internalDestination) {
    return (
      <Link to={internalDestination} className={className} style={style} aria-label={ariaLabel}>
        {content}
      </Link>
    );
  }

  if (!href) {
    return null;
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
      {content}
    </a>
  );
};

export default React.memo(SocialLinkButton);

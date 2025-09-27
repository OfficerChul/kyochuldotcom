import React, { useEffect, useRef } from 'react';
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
  const portfolioRef = useRef<HTMLAnchorElement | HTMLButtonElement | null>(null);
  const setPortfolioRef = (node: HTMLAnchorElement | HTMLButtonElement | null) => {
    portfolioRef.current = node;
  };

  useEffect(() => {
    if (!isPortfolio) {
      return;
    }

    if (!portfolioRef.current) {
      return;
    }

    const node = portfolioRef.current;

    const randomizeJumpProfile = () => {
      const target = portfolioRef.current ?? node;
      if (!target) {
        return;
      }

      const jumpHeight = 15 + Math.random() * 9; // vary apex 15px~24px for subtle randomness
      const apex = -jumpHeight;
      const secondary = apex * 0.6;
      const float = apex * 0.3;
      const load = Math.min(5.5, Math.max(3, Math.abs(apex) * 0.2));
      // Randomize landing softness and depth per iteration
      const landingFactor = 0.18 + Math.random() * 0.08; // 0.18 ~ 0.26
      const landingMax = 6.2; // cap for stability
      const landing = Math.min(landingMax, Math.max(3, Math.abs(apex) * landingFactor));
      const rebound = -landing * (0.22 + Math.random() * 0.1); // 0.22 ~ 0.32

      const surfaceLoad = Math.min(3.6, load * 0.66);
      const surfaceApex = apex * 0.35;
      const surfaceFloat = float * 0.6;
      const surfaceLanding = landing * (0.46 + Math.random() * 0.08); // 0.46~0.54
      const surfaceRebound = rebound * 0.5;

      const style = target.style;
      style.setProperty('--jump-apex', `${apex.toFixed(2)}px`);
      style.setProperty('--jump-secondary', `${secondary.toFixed(2)}px`);
      style.setProperty('--jump-float', `${float.toFixed(2)}px`);
      style.setProperty('--jump-load', `${load.toFixed(2)}px`);
      style.setProperty('--landing-depth', `${landing.toFixed(2)}px`);
      style.setProperty('--landing-rebound', `${rebound.toFixed(2)}px`);

      style.setProperty('--surface-load', `${surfaceLoad.toFixed(2)}px`);
      style.setProperty('--surface-apex', `${surfaceApex.toFixed(2)}px`);
      style.setProperty('--surface-float', `${surfaceFloat.toFixed(2)}px`);
      style.setProperty('--surface-landing', `${surfaceLanding.toFixed(2)}px`);
      style.setProperty('--surface-rebound', `${surfaceRebound.toFixed(2)}px`);
    };

    randomizeJumpProfile();
    node.addEventListener('animationiteration', randomizeJumpProfile);

    return () => {
      node.removeEventListener('animationiteration', randomizeJumpProfile);
    };
  }, [isPortfolio]);

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
        ref={isPortfolio ? setPortfolioRef : undefined}
        type="button"
      >
        {content}
      </button>
    );
  }

  const internalDestination = to ?? (isInternalLink ? href : undefined);

  if (internalDestination) {
    return (
      <Link
        to={internalDestination}
        className={className}
        style={style}
        aria-label={ariaLabel}
        ref={isPortfolio ? setPortfolioRef : undefined}
      >
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
      ref={isPortfolio ? setPortfolioRef : undefined}
    >
      {content}
    </a>
  );
};

export default React.memo(SocialLinkButton);

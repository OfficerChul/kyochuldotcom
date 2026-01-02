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
  /**
   * Label text displayed below the button
   */
  label?: string;
  /**
   * Visual variant for light/dark backgrounds
   */
  variant?: 'light' | 'dark';
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
  isInternalLink = false,
  label,
  variant = 'light'
}) => {
  const portfolioRef = useRef<HTMLAnchorElement | HTMLButtonElement | null>(null);
  const surfaceRef = useRef<HTMLSpanElement>(null);

  // Liquid Glass light tracking effect (mouse + touch)
  useEffect(() => {
    const surface = surfaceRef.current;
    if (!surface) return;

    let rafId: number;

    // Calculate highlight position based on light source position
    const updateHighlight = (lightX: number, lightY: number) => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        const rect = surface.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        // Calculate direction from button to light source
        const dx = lightX - centerX;
        const dy = lightY - centerY;

        // Convert to percentage (light comes from that direction)
        // Clamp to reasonable range
        const x = Math.max(0, Math.min(100, 50 + (dx / rect.width) * 50));
        const y = Math.max(0, Math.min(100, 50 + (dy / rect.height) * 50));

        surface.style.setProperty('--highlight-x', `${x}%`);
        surface.style.setProperty('--highlight-y', `${y}%`);
      });
    };

    // Mouse events (desktop)
    const handleMouseMove = (e: MouseEvent) => {
      const rect = surface.getBoundingClientRect();
      // Only track if mouse is near the button
      const distance = Math.hypot(
        e.clientX - (rect.left + rect.width / 2),
        e.clientY - (rect.top + rect.height / 2)
      );
      if (distance < 150) {
        updateHighlight(e.clientX, e.clientY);
      }
    };

    // Touch events (mobile) - track any touch on screen
    const handleTouchMove = (e: TouchEvent) => {
      const touch = e.touches[0];
      if (touch) {
        updateHighlight(touch.clientX, touch.clientY);
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      const touch = e.touches[0];
      if (touch) {
        updateHighlight(touch.clientX, touch.clientY);
      }
    };

    const handleEnd = () => {
      cancelAnimationFrame(rafId);
      // Smoothly return to default position
      surface.style.setProperty('--highlight-x', '50%');
      surface.style.setProperty('--highlight-y', '30%');
    };

    // Desktop: track mouse near button
    surface.addEventListener('mousemove', handleMouseMove);
    surface.addEventListener('mouseleave', handleEnd);

    // Mobile: track touch anywhere on screen
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchend', handleEnd);

    return () => {
      cancelAnimationFrame(rafId);
      surface.removeEventListener('mousemove', handleMouseMove);
      surface.removeEventListener('mouseleave', handleEnd);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleEnd);
    };
  }, []);
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

  // Extract RGB values from sonarColor for highlight
  const extractRGB = (color: string) => {
    const match = color.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
    return match ? `${match[1]}, ${match[2]}, ${match[3]}` : '93, 220, 255';
  };
  const highlightRGB = sonarColor ? extractRGB(sonarColor) : '93, 220, 255';

  const style = {
    '--border-color': sonarColor || 'rgba(93, 220, 255, 1)',
    '--glow-color': sonarColor ? sonarColor.replace('0.6', '0.8') : 'rgba(93, 220, 255, 0.8)',
    '--inner-glow': sonarColor ? sonarColor.replace('0.6', '0.2') : 'rgba(93, 220, 255, 0.2)',
    '--highlight-rgb': highlightRGB,
  } as React.CSSProperties;

  const content = (
    <span className="social-link-button__surface" ref={surfaceRef}>
      {children}
    </span>
  );

  const renderButton = () => {
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

  const button = renderButton();
  if (!button) return null;

  const labelClass = variant === 'dark'
    ? 'social-link-label social-link-label--dark'
    : 'social-link-label';

  return (
    <div className="social-link-wrapper">
      {button}
      {label && <span className={labelClass}>{label}</span>}
    </div>
  );
};

export default React.memo(SocialLinkButton);

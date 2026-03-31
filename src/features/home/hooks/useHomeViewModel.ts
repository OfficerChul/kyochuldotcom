import { useMemo, useRef, useState } from 'react';
import { CLOUD_CLASSES, STARS } from '../services/animationService';
import { useResponsive } from './useResponsive';
import { useSkyAnimation } from './useSkyAnimation';

export const useHomeViewModel = () => {
  const searchInputRef = useRef<HTMLInputElement | null>(null);
  const [logoLoaded, setLogoLoaded] = useState(false);
  const { isMobile } = useResponsive();
  const { timeStage, sunPosition, moonPosition, moonOpacity, starOpacity } = useSkyAnimation();

  // WebP is universally supported in modern browsers — no JS detection needed
  const supportsWebP = true;

  const socialVariant: 'light' | 'dark' = useMemo(
    () => (timeStage.stage === 'night' ? 'dark' : 'light'),
    [timeStage.stage]
  );

  return {
    searchInputRef,
    logoLoaded,
    setLogoLoaded,
    supportsWebP,
    isMobile,
    socialVariant,
    timeStage,
    sunPosition,
    moonPosition,
    moonOpacity,
    starOpacity,
    cloudClasses: CLOUD_CLASSES,
    stars: STARS,
  };
};

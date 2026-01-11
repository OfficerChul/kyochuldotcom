import { useEffect, useMemo, useRef, useState } from 'react';
import { CLOUD_CLASSES, STARS } from '../services/animationService';
import { useResponsive } from './useResponsive';
import { useSkyAnimation } from './useSkyAnimation';

export const useHomeViewModel = () => {
  const searchInputRef = useRef<HTMLInputElement | null>(null);
  const [logoLoaded, setLogoLoaded] = useState(false);
  const [supportsWebP, setSupportsWebP] = useState(false);
  const { isMobile } = useResponsive();
  const { timeStage, sunPosition, moonPosition, moonOpacity, starOpacity } = useSkyAnimation();

  useEffect(() => {
    const webP = new Image();
    webP.onload = webP.onerror = () => {
      setSupportsWebP(webP.height === 2);
    };
    webP.src =
      'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
  }, []);

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

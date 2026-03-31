import React, { useEffect, useMemo, useState } from 'react';
import { clamp } from '../services/timeService';
import { Position, TimeStage } from '../types/time';

type HandMode = 'idle' | 'covering' | 'point-cloud' | 'shade-sun' | 'flashlight' | 'waving';

interface HandModeOptions {
  logoLoaded: boolean;
  stage: TimeStage;
  isClapping: boolean;
  isFlashlightOn: boolean;
  isTypingInSearch: boolean;
  sunPosition: Position;
  logoContainerRef: React.RefObject<HTMLDivElement | null>;
  pointerRef: React.RefObject<{ x: number; y: number; lastMoveAt: number }>;
}

export const useHandMode = ({
  logoLoaded,
  stage,
  isClapping,
  isFlashlightOn,
  isTypingInSearch,
  sunPosition,
  logoContainerRef,
  pointerRef,
}: HandModeOptions) => {
  const [handMode, setHandMode] = useState<HandMode>('idle');
  const [handMotion, setHandMotion] = useState({
    pointAngle: -20,
    beamAngle: 8,
    beamLength: 240,
  });

  useEffect(() => {
    if (!logoLoaded) return;
    const staticCloudElements = Array.from(document.querySelectorAll<HTMLElement>('.cloud-layer .cloud'));
    const setHandModeIfChanged = (nextMode: HandMode) => {
      setHandMode((prevMode) => (prevMode === nextMode ? prevMode : nextMode));
    };

    const updateHandMode = () => {
      const logoRect = logoContainerRef.current?.getBoundingClientRect();
      if (!logoRect) return;

      if (isClapping) {
        setHandModeIfChanged('waving');
        return;
      }

      if (isTypingInSearch) {
        setHandModeIfChanged('covering');
        return;
      }

      const logoCenterX = logoRect.left + logoRect.width / 2;
      const logoCenterY = logoRect.top + logoRect.height / 2;
      const now = Date.now();

      if (stage === 'night') {
        if (isFlashlightOn) {
          const sweep = Math.sin(now / 960);
          const pulse = (Math.cos(now / 1280) + 1) / 2;
          const nextBeamAngle = clamp(sweep * 44, -44, 44);
          const nextBeamLength = clamp(220 + pulse * 190, 220, 430);

          setHandMotion((prev) => {
            if (
              Math.abs(prev.beamAngle - nextBeamAngle) < 1 &&
              Math.abs(prev.beamLength - nextBeamLength) < 6
            ) {
              return prev;
            }
            return { ...prev, beamAngle: nextBeamAngle, beamLength: nextBeamLength };
          });
          setHandModeIfChanged('flashlight');
          return;
        }

        setHandMotion((prev) => {
          if (Math.abs(prev.beamAngle - 8) < 0.5 && Math.abs(prev.beamLength - 260) < 4) {
            return prev;
          }
          return { ...prev, beamAngle: 8, beamLength: 260 };
        });
        setHandModeIfChanged('idle');
        return;
      }

      const pointer = pointerRef.current;
      const pointerDistanceToLogo = Math.hypot(
        pointer.x - logoCenterX,
        pointer.y - logoCenterY
      );
      const userInteracting = now - pointer.lastMoveAt < 3000 || pointerDistanceToLogo < 320;

      if (userInteracting) {
        const cloudElements =
          staticCloudElements.length > 0
            ? staticCloudElements
            : document.querySelectorAll<HTMLElement>('.cloud-layer .cloud');
        let closestCloud: { x: number; y: number; distance: number } | null = null;

        for (const cloud of cloudElements) {
          const cloudRect = cloud.getBoundingClientRect();
          const nearLogo =
            cloudRect.right > logoRect.left - 80 &&
            cloudRect.left < logoRect.right + 80 &&
            cloudRect.bottom > logoRect.top - 70 &&
            cloudRect.top < logoRect.bottom + 40;

          if (!nearLogo) continue;

          const cloudCenterX = cloudRect.left + cloudRect.width / 2;
          const cloudCenterY = cloudRect.top + cloudRect.height / 2;
          const distance = Math.hypot(cloudCenterX - logoCenterX, cloudCenterY - logoCenterY);

          if (!closestCloud || distance < closestCloud.distance) {
            closestCloud = { x: cloudCenterX, y: cloudCenterY, distance };
          }
        }

        if (closestCloud) {
          const originX = logoRect.left + logoRect.width * 0.58;
          const originY = logoRect.top + logoRect.height * 0.56;
          const nextPointAngle = clamp(
            (Math.atan2(closestCloud.y - originY, closestCloud.x - originX) * 180) / Math.PI,
            -75,
            35
          );

          setHandMotion((prev) => {
            if (Math.abs(prev.pointAngle - nextPointAngle) < 1) return prev;
            return { ...prev, pointAngle: nextPointAngle };
          });
          setHandModeIfChanged('point-cloud');
          return;
        }
      }

      const sunX = (sunPosition.left / 100) * window.innerWidth;
      const sunY = (sunPosition.top / 100) * window.innerHeight;
      const sunIsAboveLogo =
        Math.abs(sunX - logoCenterX) < logoRect.width * 0.95 &&
        sunY < logoRect.top - 8 &&
        sunY > logoRect.top - window.innerHeight * 0.55;

      setHandModeIfChanged(sunIsAboveLogo ? 'shade-sun' : 'idle');
    };

    updateHandMode();
    const intervalId = window.setInterval(updateHandMode, 240);
    window.addEventListener('resize', updateHandMode);

    return () => {
      window.clearInterval(intervalId);
      window.removeEventListener('resize', updateHandMode);
    };
  }, [isClapping, isFlashlightOn, isTypingInSearch, logoLoaded, sunPosition.left, sunPosition.top, stage, logoContainerRef, pointerRef]);

  const handStyle = useMemo(
    () =>
      ({
        '--point-angle': `${handMotion.pointAngle}deg`,
        '--beam-angle': `${handMotion.beamAngle}deg`,
        '--beam-length': `${handMotion.beamLength}px`,
      }) as React.CSSProperties,
    [handMotion.beamAngle, handMotion.beamLength, handMotion.pointAngle]
  );

  return { handMode, handStyle };
};

export type { HandMode };

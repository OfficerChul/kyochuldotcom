import { useEffect, useRef, useState } from 'react';
import { TimeStage } from '../types/time';

export const useFlashlightCycle = (logoLoaded: boolean, stage: TimeStage) => {
  const flashlightTimerRef = useRef<number | null>(null);
  const [isFlashlightOn, setIsFlashlightOn] = useState(false);

  useEffect(() => {
    if (flashlightTimerRef.current !== null) {
      window.clearTimeout(flashlightTimerRef.current);
    }

    if (!logoLoaded || stage !== 'night') {
      setIsFlashlightOn(false);
      return;
    }

    let cancelled = false;
    const scheduleCycle = () => {
      const onDuration = 6500 + Math.random() * 8500;
      const offDuration = 9000 + Math.random() * 9000;

      setIsFlashlightOn(true);
      flashlightTimerRef.current = window.setTimeout(() => {
        if (cancelled) return;
        setIsFlashlightOn(false);

        flashlightTimerRef.current = window.setTimeout(() => {
          if (!cancelled) {
            scheduleCycle();
          }
        }, offDuration);
      }, onDuration);
    };

    scheduleCycle();

    return () => {
      cancelled = true;
      if (flashlightTimerRef.current !== null) {
        window.clearTimeout(flashlightTimerRef.current);
      }
    };
  }, [logoLoaded, stage]);

  useEffect(
    () => () => {
      if (flashlightTimerRef.current !== null) {
        window.clearTimeout(flashlightTimerRef.current);
      }
    },
    []
  );

  return isFlashlightOn;
};

import { useEffect, useRef } from 'react';

export const useEyeTracking = (logoLoaded: boolean) => {
  const leftEyeRef = useRef<HTMLDivElement | null>(null);
  const rightEyeRef = useRef<HTMLDivElement | null>(null);
  const pointerRef = useRef({ x: 0, y: 0, lastMoveAt: 0 });

  useEffect(() => {
    if (!logoLoaded) return;

    const eyes = [leftEyeRef.current, rightEyeRef.current].filter(Boolean) as HTMLDivElement[];
    if (eyes.length === 0) return;

    let rafId: number | null = null;
    pointerRef.current = {
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
      lastMoveAt: Date.now(),
    };

    const updatePupilPosition = (eye: HTMLDivElement) => {
      const rect = eye.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const deltaX = pointerRef.current.x - centerX;
      const deltaY = pointerRef.current.y - centerY;
      const distance = Math.hypot(deltaX, deltaY);
      const maxOffset = rect.width * 0.22;
      const ratio = distance > maxOffset ? maxOffset / distance : 1;

      eye.style.setProperty('--pupil-x', `${deltaX * ratio}px`);
      eye.style.setProperty('--pupil-y', `${deltaY * ratio}px`);
    };

    const render = () => {
      eyes.forEach(updatePupilPosition);
      rafId = null;
    };

    const queueRender = () => {
      if (rafId !== null) return;
      rafId = window.requestAnimationFrame(render);
    };

    const handleMouseMove = (event: MouseEvent) => {
      pointerRef.current.x = event.clientX;
      pointerRef.current.y = event.clientY;
      pointerRef.current.lastMoveAt = Date.now();
      queueRender();
    };

    const handleTouchMove = (event: TouchEvent) => {
      if (!event.touches[0]) return;
      pointerRef.current.x = event.touches[0].clientX;
      pointerRef.current.y = event.touches[0].clientY;
      pointerRef.current.lastMoveAt = Date.now();
      queueRender();
    };

    queueRender();
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('resize', queueRender);

    return () => {
      if (rafId !== null) {
        window.cancelAnimationFrame(rafId);
      }
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('resize', queueRender);
    };
  }, [logoLoaded]);

  return { leftEyeRef, rightEyeRef, pointerRef };
};

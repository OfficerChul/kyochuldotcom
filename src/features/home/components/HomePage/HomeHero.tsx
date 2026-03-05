import React, { ReactNode, useEffect, useMemo, useRef, useState } from 'react';
import Navigation from '../../../../shared/components/ui/Navigation';
import HomeSkyCanvas from './HomeSkyCanvas';
import HomeSearchBar from './HomeSearchBar';
import logo from '../../../../assets/images/logos/triangle-skyblue.png';
import { Position, StageState } from '../../types/time';
import './animations.css';

interface CloudClass {
  id: string;
  className: string;
}

interface Star {
  top: number;
  left: number;
  size: number;
  delay: number;
}

interface HomeHeroProps {
  timeStage: StageState;
  sunPosition: Position;
  moonPosition: Position;
  moonOpacity: number;
  starOpacity: number;
  cloudClasses: readonly CloudClass[];
  stars: readonly Star[];
  logoLoaded: boolean;
  setLogoLoaded: (loaded: boolean) => void;
  supportsWebP: boolean;
  searchInputRef: React.RefObject<HTMLInputElement | null>;
  isMobile: boolean;
  socialLinks: ReactNode;
}

type HandMode = 'idle' | 'covering' | 'point-cloud' | 'shade-sun' | 'flashlight' | 'clapping';
type EyeMood = 'normal' | 'heart' | 'star';

interface SparklePoint {
  x: number;
  y: number;
  dx: number;
  dy: number;
  delay: number;
}

const SPARKLE_POINTS: readonly SparklePoint[] = [
  { x: 32, y: 36, dx: -24, dy: -28, delay: 0 },
  { x: 46, y: 26, dx: -10, dy: -36, delay: 40 },
  { x: 58, y: 24, dx: 0, dy: -38, delay: 70 },
  { x: 72, y: 30, dx: 16, dy: -30, delay: 110 },
  { x: 78, y: 44, dx: 26, dy: -12, delay: 140 },
  { x: 76, y: 58, dx: 22, dy: 8, delay: 170 },
  { x: 66, y: 68, dx: 12, dy: 20, delay: 210 },
  { x: 52, y: 72, dx: 0, dy: 26, delay: 240 },
  { x: 38, y: 66, dx: -14, dy: 18, delay: 270 },
  { x: 26, y: 54, dx: -26, dy: 4, delay: 300 },
] as const;

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

const HomeHero: React.FC<HomeHeroProps> = ({
  timeStage,
  sunPosition,
  moonPosition,
  moonOpacity,
  starOpacity,
  cloudClasses,
  stars,
  logoLoaded,
  setLogoLoaded,
  supportsWebP,
  searchInputRef,
  isMobile,
  socialLinks,
}) => {
  const leftEyeRef = useRef<HTMLDivElement | null>(null);
  const rightEyeRef = useRef<HTMLDivElement | null>(null);
  const logoContainerRef = useRef<HTMLDivElement | null>(null);
  const pointerRef = useRef({ x: 0, y: 0, lastMoveAt: 0 });
  const hoverEasterEggTimerRef = useRef<number | null>(null);
  const eyeResetTimerRef = useRef<number | null>(null);
  const clapTimerRef = useRef<number | null>(null);
  const flashlightTimerRef = useRef<number | null>(null);
  const [isTypingInSearch, setIsTypingInSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [eyeMood, setEyeMood] = useState<EyeMood>('normal');
  const [isClapping, setIsClapping] = useState(false);
  const [isFlashlightOn, setIsFlashlightOn] = useState(false);
  const [sparkleBurstId, setSparkleBurstId] = useState(0);
  const [handMode, setHandMode] = useState<HandMode>('idle');
  const [handMotion, setHandMotion] = useState({
    pointAngle: -20,
    beamAngle: 8,
    beamLength: 240,
  });

  useEffect(
    () => () => {
      if (hoverEasterEggTimerRef.current !== null) {
        window.clearTimeout(hoverEasterEggTimerRef.current);
      }
      if (eyeResetTimerRef.current !== null) {
        window.clearTimeout(eyeResetTimerRef.current);
      }
      if (clapTimerRef.current !== null) {
        window.clearTimeout(clapTimerRef.current);
      }
      if (flashlightTimerRef.current !== null) {
        window.clearTimeout(flashlightTimerRef.current);
      }
    },
    []
  );

  useEffect(() => {
    if (flashlightTimerRef.current !== null) {
      window.clearTimeout(flashlightTimerRef.current);
    }

    if (!logoLoaded || timeStage.stage !== 'night') {
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
  }, [logoLoaded, timeStage.stage]);

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
        setHandModeIfChanged('clapping');
        return;
      }

      if (isTypingInSearch) {
        setHandModeIfChanged('covering');
        return;
      }

      const logoCenterX = logoRect.left + logoRect.width / 2;
      const logoCenterY = logoRect.top + logoRect.height / 2;
      const now = Date.now();

      if (timeStage.stage === 'night') {
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

            return {
              ...prev,
              beamAngle: nextBeamAngle,
              beamLength: nextBeamLength,
            };
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

      const pointerDistanceToLogo = Math.hypot(
        pointerRef.current.x - logoCenterX,
        pointerRef.current.y - logoCenterY
      );
      const userInteracting = now - pointerRef.current.lastMoveAt < 3000 || pointerDistanceToLogo < 320;

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
  }, [
    isClapping,
    isFlashlightOn,
    isTypingInSearch,
    logoLoaded,
    sunPosition.left,
    sunPosition.top,
    timeStage.stage,
  ]);

  const handStyle = useMemo(
    () =>
      ({
        '--point-angle': `${handMotion.pointAngle}deg`,
        '--beam-angle': `${handMotion.beamAngle}deg`,
        '--beam-length': `${handMotion.beamLength}px`,
      }) as React.CSSProperties,
    [handMotion.beamAngle, handMotion.beamLength, handMotion.pointAngle]
  );

  const handleLogoMouseEnter = () => {
    if (!logoLoaded) return;

    if (hoverEasterEggTimerRef.current !== null) {
      window.clearTimeout(hoverEasterEggTimerRef.current);
    }

    hoverEasterEggTimerRef.current = window.setTimeout(() => {
      const nextMood: EyeMood = Math.random() > 0.5 ? 'heart' : 'star';
      setEyeMood(nextMood);

      if (eyeResetTimerRef.current !== null) {
        window.clearTimeout(eyeResetTimerRef.current);
      }
      eyeResetTimerRef.current = window.setTimeout(() => {
        setEyeMood('normal');
      }, 1100);
    }, 3000);
  };

  const handleLogoMouseLeave = () => {
    if (hoverEasterEggTimerRef.current !== null) {
      window.clearTimeout(hoverEasterEggTimerRef.current);
    }
    if (eyeResetTimerRef.current !== null) {
      window.clearTimeout(eyeResetTimerRef.current);
    }
    setEyeMood('normal');
  };

  const handleLogoDoubleClick = () => {
    if (clapTimerRef.current !== null) {
      window.clearTimeout(clapTimerRef.current);
    }

    setSparkleBurstId((prev) => prev + 1);
    setIsClapping(true);
    setHandMode('clapping');
    clapTimerRef.current = window.setTimeout(() => {
      setIsClapping(false);
    }, 920);
  };

  const showHelloBubble = /hello/i.test(searchQuery.trim());
  const pupilClassName = useMemo(
    () => (eyeMood === 'normal' ? 'logo-eye-pupil' : `logo-eye-pupil logo-eye-pupil--${eyeMood}`),
    [eyeMood]
  );

  return (
    <>
      <HomeSkyCanvas
        timeStage={timeStage}
        sunPosition={sunPosition}
        moonPosition={moonPosition}
        moonOpacity={moonOpacity}
        starOpacity={starOpacity}
        cloudClasses={cloudClasses}
        stars={stars}
      />

      <div className="relative z-20">
        <Navigation />
      </div>

      <main className="relative z-20 h-screen flex flex-col items-center justify-center pointer-events-none">
        <div className="text-center relative pointer-events-none">
          {!logoLoaded && (
            <div
              className="mx-auto h-40 sm:h-52 md:h-60 bg-gradient-to-br from-blue-200 to-cyan-200 rounded-full animate-pulse"
              style={{ width: '160px', height: '160px' }}
            />
          )}
          <div
            className="logo-with-eyes pointer-events-auto hover:animate-[shake_3s_infinite]"
            ref={logoContainerRef}
            onMouseEnter={handleLogoMouseEnter}
            onMouseLeave={handleLogoMouseLeave}
            onDoubleClick={handleLogoDoubleClick}
          >
            <picture>
              {supportsWebP && <source srcSet="/logo-optimized.webp" type="image/webp" />}
              <source srcSet="/logo-optimized.png" type="image/png" />
              <img
                className={`relative z-40 mx-auto h-40 sm:h-52 md:h-60 transition-opacity duration-300 ${
                  logoLoaded ? 'opacity-100' : 'opacity-0 absolute top-0 left-1/2 -translate-x-1/2'
                }`}
                src={logo}
                alt="Kyochul Portfolio Logo"
                id="main-logo"
                loading="eager"
                onLoad={() => setLogoLoaded(true)}
                fetchPriority="high"
              />
            </picture>

            {logoLoaded && showHelloBubble && (
              <div className="logo-speech-bubble" role="status" aria-live="polite">
                <span>hi,</span>
                <span>there</span>
              </div>
            )}

            {logoLoaded && (
              <div className="logo-eyes" aria-hidden="true">
                <div className="logo-eye" ref={leftEyeRef}>
                  <span className={pupilClassName} />
                </div>
                <div className="logo-eye" ref={rightEyeRef}>
                  <span className={pupilClassName} />
                </div>
              </div>
            )}

            {logoLoaded && (
              <div className={`logo-hands logo-hands--${handMode}`} style={handStyle} aria-hidden="true">
                <div className="logo-hand logo-hand--left" />
                <div className="logo-hand logo-hand--right">
                  {timeStage.stage === 'night' && (
                    <div className="logo-flashlight">
                      {isFlashlightOn && <div className="logo-flashlight-beam" />}
                    </div>
                  )}
                </div>
              </div>
            )}

            {logoLoaded && sparkleBurstId > 0 && (
              <div key={sparkleBurstId} className="logo-sparkles" aria-hidden="true">
                {SPARKLE_POINTS.map((sparkle, index) => (
                  <span
                    key={`${sparkleBurstId}-${index}`}
                    className="logo-sparkle"
                    style={
                      {
                        '--sparkle-x': `${sparkle.x}%`,
                        '--sparkle-y': `${sparkle.y}%`,
                        '--sparkle-dx': `${sparkle.dx}px`,
                        '--sparkle-dy': `${sparkle.dy}px`,
                        '--sparkle-delay': `${sparkle.delay}ms`,
                      } as React.CSSProperties
                    }
                  />
                ))}
              </div>
            )}
          </div>
        </div>

        <HomeSearchBar
          searchInputRef={searchInputRef}
          isMobile={isMobile}
          onTypingChange={setIsTypingInSearch}
          onQueryChange={setSearchQuery}
        />

        <div className="mt-4 sm:mt-8 pointer-events-auto">{socialLinks}</div>
      </main>
    </>
  );
};

export default HomeHero;

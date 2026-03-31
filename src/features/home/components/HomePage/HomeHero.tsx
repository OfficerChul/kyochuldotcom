import React, { ReactNode, useMemo, useRef, useState } from 'react';
import HomeSkyCanvas from './HomeSkyCanvas';
import HomeSearchBar from './HomeSearchBar';
import logo from '../../../../assets/images/logos/triangle-skyblue.png';
import { CloudClass, Position, StageState, Star } from '../../types/time';
import { useEyeTracking } from '../../hooks/useEyeTracking';
import { useFlashlightCycle } from '../../hooks/useFlashlightCycle';
import { useHandMode } from '../../hooks/useHandMode';
import './animations.css';

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
  const logoContainerRef = useRef<HTMLDivElement | null>(null);
  const hoverEasterEggTimerRef = useRef<number | null>(null);
  const eyeResetTimerRef = useRef<number | null>(null);
  const clapTimerRef = useRef<number | null>(null);
  const [isTypingInSearch, setIsTypingInSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [eyeMood, setEyeMood] = useState<EyeMood>('normal');
  const [isClapping, setIsClapping] = useState(false);
  const [sparkleBurstId, setSparkleBurstId] = useState(0);

  const isFlashlightOn = useFlashlightCycle(logoLoaded, timeStage.stage);
  const { leftEyeRef, rightEyeRef, pointerRef } = useEyeTracking(logoLoaded);
  const { handMode, handStyle } = useHandMode({
    logoLoaded,
    stage: timeStage.stage,
    isClapping,
    isFlashlightOn,
    isTypingInSearch,
    sunPosition,
    logoContainerRef,
    pointerRef,
  });

  // Cleanup timers on unmount
  React.useEffect(
    () => () => {
      if (hoverEasterEggTimerRef.current !== null) window.clearTimeout(hoverEasterEggTimerRef.current);
      if (eyeResetTimerRef.current !== null) window.clearTimeout(eyeResetTimerRef.current);
      if (clapTimerRef.current !== null) window.clearTimeout(clapTimerRef.current);
    },
    []
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
    clapTimerRef.current = window.setTimeout(() => {
      setIsClapping(false);
    }, 1400);
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

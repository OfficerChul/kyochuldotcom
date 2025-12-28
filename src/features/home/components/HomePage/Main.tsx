import React, { useEffect, useMemo, useRef, lazy, Suspense, useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import logo from '../../../../assets/images/logos/triangle-skyblue.png';
import Navigation from '../../../../shared/components/ui/Navigation';
import NavBar from '../../../../shared/components/ui/NavBar';
import WorldClock from '../WorldClock';
import './animations.css';

const SocialLinks = lazy(() => import('../SocialLinks'));

const CLOUD_CLASSES = [
  { id: 'cloud-one', className: 'cloud--one' },
  { id: 'cloud-two', className: 'cloud--two' },
  { id: 'cloud-three', className: 'cloud--three' },
  { id: 'cloud-four', className: 'cloud--four' }
];

type TimeStage = 'sunrise' | 'day' | 'sunset' | 'night';

interface StageState {
  stage: TimeStage;
  progress: number;
}

interface Position {
  top: number;
  left: number;
}

// Percentage-based key points for the sun's path across the home sky.
const SUN_PATHS: Record<Exclude<TimeStage, 'night'>, { start: Position; end: Position }> = {
  sunrise: { start: { top: 76, left: 6 }, end: { top: 35, left: 32 } },
  day: { start: { top: 35, left: 32 }, end: { top: 24, left: 60 } },
  sunset: { start: { top: 24, left: 60 }, end: { top: 78, left: 88 } }
};

// Night path for the moon from rise to set.
const MOON_PATH: { start: Position; end: Position } = {
  start: { top: 80, left: 82 },
  end: { top: 26, left: 18 }
};

const STARS = [
  { top: 12, left: 22, size: 3, delay: 0 },
  { top: 18, left: 46, size: 4, delay: 1.1 },
  { top: 25, left: 70, size: 3, delay: 0.6 },
  { top: 34, left: 32, size: 4, delay: 1.7 },
  { top: 28, left: 58, size: 3, delay: 0.8 },
  { top: 16, left: 82, size: 4, delay: 1.4 },
  { top: 38, left: 68, size: 3, delay: 0.3 },
  { top: 22, left: 90, size: 4, delay: 2.2 },
  { top: 14, left: 12, size: 3, delay: 1.5 },
  { top: 32, left: 14, size: 4, delay: 0.4 },
  { top: 10, left: 60, size: 3, delay: 1.8 },
  { top: 40, left: 24, size: 3, delay: 2.6 }
] as const;

const clamp = (value: number, min = 0, max = 1): number => Math.min(max, Math.max(min, value));

const lerp = (start: number, end: number, progress: number): number => start + (end - start) * progress;

const getKSTDate = (): Date => {
  const now = new Date();
  const utc = now.getTime() + now.getTimezoneOffset() * 60000;
  return new Date(utc + 9 * 60 * 60000);
};

const getStageState = (): StageState => {
  const date = getKSTDate();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();
  const totalMinutes = hours * 60 + minutes + seconds / 60;

  if (totalMinutes >= 300 && totalMinutes < 480) {
    return { stage: 'sunrise', progress: clamp((totalMinutes - 300) / (480 - 300)) };
  }

  if (totalMinutes >= 480 && totalMinutes < 1020) {
    return { stage: 'day', progress: clamp((totalMinutes - 480) / (1020 - 480)) };
  }

  if (totalMinutes >= 1020 && totalMinutes < 1140) {
    return { stage: 'sunset', progress: clamp((totalMinutes - 1020) / (1140 - 1020)) };
  }

  const nightMinutes = totalMinutes >= 1140 ? totalMinutes - 1140 : totalMinutes + (1440 - 1140);
  return { stage: 'night', progress: clamp(nightMinutes / 600) };
};

const Main: React.FC = () => {
  const searchInputRef = useRef<HTMLInputElement>(null);
  const [logoLoaded, setLogoLoaded] = useState(false);
  const [supportsWebP, setSupportsWebP] = useState(false);
  const [timeStage, setTimeStage] = useState<StageState>(() => getStageState());
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < 640);

  // Compute animated element positions and intensity based on current KST.
  const { sunPosition, moonPosition, moonOpacity, starOpacity } = useMemo(() => {
    const stage = timeStage.stage;
    const progress = timeStage.progress;

    const computedSun: Position =
      stage === 'night'
        ? { top: 108, left: 50 }
        : {
            top: lerp(SUN_PATHS[stage].start.top, SUN_PATHS[stage].end.top, progress),
            left: lerp(SUN_PATHS[stage].start.left, SUN_PATHS[stage].end.left, progress)
          };

    let moonProgress: number;
    if (stage === 'night') {
      moonProgress = progress;
    } else if (stage === 'sunrise') {
      moonProgress = clamp(1 - progress);
    } else if (stage === 'sunset') {
      moonProgress = clamp(progress * 0.7);
    } else {
      moonProgress = 0;
    }

    const computedMoon: Position = {
      top: lerp(MOON_PATH.start.top, MOON_PATH.end.top, moonProgress),
      left: lerp(MOON_PATH.start.left, MOON_PATH.end.left, moonProgress)
    };

    const computedMoonOpacity =
      stage === 'night'
        ? 1
        : stage === 'sunrise'
          ? clamp(1 - progress * 1.6)
          : stage === 'sunset'
            ? clamp((progress - 0.55) * 2.2)
            : 0;

    const computedStarsOpacity =
      stage === 'night'
        ? 1
        : stage === 'sunrise'
          ? clamp(0.75 - progress)
          : stage === 'sunset'
            ? clamp(progress - 0.6)
            : 0;

    return {
      sunPosition: computedSun,
      moonPosition: computedMoon,
      moonOpacity: computedMoonOpacity,
      starOpacity: computedStarsOpacity
    };
  }, [timeStage]);

  // Check WebP support (used by the logo source set)
  useEffect(() => {
    const webP = new Image();
    webP.onload = webP.onerror = () => {
      setSupportsWebP(webP.height === 2);
    };
    webP.src =
      'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
  }, []);

  // Disable auto-focus on mount to avoid mobile keyboard popping up
  useEffect(() => {
    // Intentionally do not focus the search input on load
  }, []);

  // Track mobile viewport for responsive placeholder
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 640);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    // Refresh the stage every 30 seconds to keep animation aligned with real time.
    const interval = window.setInterval(() => setTimeStage(getStageState()), 30000);
    return () => window.clearInterval(interval);
  }, []);

  return (
    <div className="relative h-screen overflow-hidden bg-[#c9ebf5]">
      <WorldClock />
      <div className={`sky-layer stage-${timeStage.stage}`} aria-hidden="true">
        <div className="time-gradient" />
        <div
          className="sun-halo"
          style={{
            top: `${sunPosition.top}%`,
            left: `${sunPosition.left}%`,
            opacity: timeStage.stage === 'night' ? 0 : 0.85
          }}
        />
        <div
          className="sun"
          style={{
            top: `${sunPosition.top}%`,
            left: `${sunPosition.left}%`,
            opacity: timeStage.stage === 'night' ? 0 : 1
          }}
        />
        <div
          className="moon"
          style={{
            top: `${moonPosition.top}%`,
            left: `${moonPosition.left}%`,
            opacity: moonOpacity
          }}
        />
        <div className="stars" style={{ opacity: starOpacity }}>
          {STARS.map((star, index) => (
            <span
              key={`star-${index}`}
              className="star"
              style={{
                top: `${star.top}%`,
                left: `${star.left}%`,
                width: `${star.size}px`,
                height: `${star.size}px`,
                animationDelay: `${star.delay}s`
              }}
            />
          ))}
        </div>
        <div className="horizon-glow" />
        <div className="haze" />
      </div>

      <div className="cloud-layer" aria-hidden="true">
        {CLOUD_CLASSES.map(({ id, className }) => (
          <span key={id} className={`cloud ${className}`} />
        ))}
      </div>

      <div className="absolute top-0 right-0 z-50">
        <NavBar variant={timeStage.stage === 'night' ? 'dark' : 'light'} currentPage="home" />
      </div>

      <div className="relative z-20">
        <Navigation />
      </div>

      <main className="relative z-20 h-screen flex flex-col items-center justify-center pointer-events-none">
        {/* Logo Section with Progressive Loading */}
        <div className="text-center relative pointer-events-none">
          {!logoLoaded && (
            <div
              className="mx-auto h-40 sm:h-52 md:h-60 bg-gradient-to-br from-blue-200 to-cyan-200 rounded-full animate-pulse"
              style={{ width: '160px', height: '160px' }}
            />
          )}
          <picture className="pointer-events-auto">
            {supportsWebP && <source srcSet="/logo-optimized.webp" type="image/webp" />}
            <source srcSet="/logo-optimized.png" type="image/png" />
            <img
              className={`relative z-40 mx-auto h-40 sm:h-52 md:h-60 hover:animate-[shake_3s_infinite] transition-opacity duration-300 ${
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
        </div>

        {/* Search Bar Section */}
        <section className="mt-4 sm:mt-8 pointer-events-auto" aria-label="Google Search">
          <form action="https://www.google.com/search" method="GET">
            <div className="w-full flex items-center justify-center">
              <div className="relative w-3/4 md:w-1/2 lg:w-1/2">
                <label htmlFor="search-bar" className="sr-only">
                  Search Google or type a URL
                </label>
                <FaSearch
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  aria-hidden="true"
                />
                <input
                  ref={searchInputRef}
                  id="search-bar"
                  name="q"
                  type="text"
                  className="shadow-lg border-none w-full rounded-full h-10 pl-10 pr-4 outline-none focus:ring-2 focus:ring-blue-400 transition-all"
                  placeholder={isMobile ? 'Search Google' : 'Search Google or type a URL'}
                  aria-label="Search Google"
                  autoComplete="off"
                />
              </div>
            </div>
          </form>
        </section>

        {/* Social Links Section with Lazy Loading */}
        <div className="mt-4 sm:mt-8 pointer-events-auto">
          <Suspense
            fallback={
              <div className="flex justify-center">
                <div className="animate-pulse flex space-x-3 sm:space-x-4">
                  <div className="rounded-full bg-gray-300 h-14 w-14 sm:h-16 sm:w-16" />
                  <div className="rounded-full bg-gray-300 h-14 w-14 sm:h-16 sm:w-16" />
                  <div className="rounded-full bg-gray-300 h-14 w-14 sm:h-16 sm:w-16" />
                </div>
              </div>
            }
          >
            <SocialLinks />
          </Suspense>
        </div>
      </main>
    </div>
  );
};

export default Main;

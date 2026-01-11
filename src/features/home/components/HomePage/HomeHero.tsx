import React, { ReactNode } from 'react';
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

        <HomeSearchBar searchInputRef={searchInputRef} isMobile={isMobile} />

        <div className="mt-4 sm:mt-8 pointer-events-auto">{socialLinks}</div>
      </main>
    </>
  );
};

export default HomeHero;

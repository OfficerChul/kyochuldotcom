import React, { Suspense, lazy } from 'react';
import NavBar from '../../../../shared/components/ui/NavBar';
import WorldClock from '../WorldClock';
import { useHomeViewModel } from '../../hooks/useHomeViewModel';
import HomeHero from './HomeHero';

const SocialLinks = lazy(() => import('../SocialLinks'));

const Main: React.FC = () => {
  const {
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
    cloudClasses,
    stars,
  } = useHomeViewModel();

  const socialLinks = (
    <Suspense
      fallback={
        <div className="flex items-center justify-center py-6 sm:py-8 bg-white/70 rounded-xl shadow-lg">
          <div className="text-center px-6">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-gray-600 mx-auto" />
            <p className="mt-3 text-sm text-gray-500">Loading...</p>
          </div>
        </div>
      }
    >
      <SocialLinks variant={socialVariant} />
    </Suspense>
  );

  return (
    <div
      className="relative h-screen overflow-hidden bg-[#c9ebf5]"
      style={{ scrollbarGutter: 'stable' }}
    >
      <div className="absolute top-0 right-0 z-50">
        <NavBar variant="dark" currentPage="home" />
      </div>

      <WorldClock />

      <HomeHero
        timeStage={timeStage}
        sunPosition={sunPosition}
        moonPosition={moonPosition}
        moonOpacity={moonOpacity}
        starOpacity={starOpacity}
        cloudClasses={cloudClasses}
        stars={stars}
        logoLoaded={logoLoaded}
        setLogoLoaded={setLogoLoaded}
        supportsWebP={supportsWebP}
        searchInputRef={searchInputRef}
        isMobile={isMobile}
        socialLinks={socialLinks}
      />
    </div>
  );
};

export default Main;

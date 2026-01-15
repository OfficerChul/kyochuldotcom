import React, { Suspense, lazy } from 'react';
import NavBar from '../../../../shared/components/ui/NavBar';
import LoadingQuote from '../../../../shared/components/ui/LoadingQuote';
import WorldClock from '../WorldClock';
import { useHomeViewModel } from '../../hooks/useHomeViewModel';
import HomeHero from './HomeHero';

const SocialLinks = lazy(() => import('../SocialLinks'));

const LoadingFallback = () => (
  <LoadingQuote
    className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800"
    quoteClassName="text-gray-800 dark:text-gray-100"
    authorClassName="text-gray-500 dark:text-gray-300"
    spinnerClassName="border-b-2 border-gray-600 dark:border-gray-200"
  />
);

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

  return (
    <Suspense fallback={<LoadingFallback />}>
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
          socialLinks={<SocialLinks variant={socialVariant} />}
        />
      </div>
    </Suspense>
  );
};

export default Main;

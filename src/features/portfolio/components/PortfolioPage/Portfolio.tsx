import React, { lazy, Suspense } from 'react';
import HeroSection from '../../../../shared/components/ui/HeroSection';
import LoadingFallback from '../../../../shared/components/ui/LoadingFallback';

const AboutMe = lazy(() => import('../AboutSection'));
const Timeline = lazy(() => import('../Timeline'));
const News = lazy(() => import('../News'));
const Education = lazy(() => import('../Education'));
const Publications = lazy(() => import('../Publications'));
const Projects = lazy(() => import('../Projects'));
const Footer = lazy(() => import('../../../../shared/components/ui/Footer'));
const VisitorMap = lazy(() => import('../VisitorMap'));

const Portfolio: React.FC = () => {
  return (
    <>
      <HeroSection currentPage="portfolio" />

      <Suspense fallback={<LoadingFallback />}>
        <AboutMe id="about1" />
      </Suspense>
      <Suspense fallback={<LoadingFallback />}>
        <Publications id="publications" />
      </Suspense>
      <Suspense fallback={<LoadingFallback />}>
        <News id="news" />
      </Suspense>
      <Suspense fallback={<LoadingFallback />}>
        <Education id="education" />
      </Suspense>
      <Suspense fallback={<LoadingFallback />}>
        <Projects id="projects" />
      </Suspense>
      <Suspense fallback={<LoadingFallback />}>
        <Timeline id="timeline" />
      </Suspense>
      <Suspense
        fallback={<div className="h-48 flex items-center justify-center">Loading map...</div>}
      >
        <VisitorMap />
      </Suspense>

      <footer>
        <Suspense fallback={<div className="h-20"></div>}>
          <Footer />
        </Suspense>
      </footer>
    </>
  );
};

export default Portfolio;

import React, { lazy, Suspense } from 'react';
import HeroSection from '../../../../shared/components/ui/HeroSection';

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
      <HeroSection currentPage="about" />

      <Suspense fallback={<div className="h-screen flex items-center justify-center">Loading...</div>}>
        <AboutMe id="about1" />
      </Suspense>
      <Suspense fallback={<div className="h-screen flex items-center justify-center">Loading...</div>}>
        <Publications id="publications" />
      </Suspense>
      <Suspense fallback={<div className="h-screen flex items-center justify-center">Loading...</div>}>
        <News id="news" />
      </Suspense>
      <Suspense fallback={<div className="h-screen flex items-center justify-center">Loading...</div>}>
        <Education id="education" />
      </Suspense>
      <Suspense fallback={<div className="h-screen flex items-center justify-center">Loading...</div>}>
        <Projects id="projects" />
      </Suspense>
      <Suspense fallback={<div className="h-screen flex items-center justify-center">Loading...</div>}>
        <Timeline id="timeline" />
      </Suspense>
      <Suspense fallback={<div className="h-48 flex items-center justify-center">Loading map...</div>}>
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

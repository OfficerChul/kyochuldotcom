import React, { lazy, Suspense, useEffect, useState } from 'react';
import FancyBtn from '../../../../shared/components/ui/Button';
import TypingAnimation from '../../../../shared/components/ui/TypingAnimation';
import NavBar from '../../../../shared/components/ui/NavBar';

const AboutMe = lazy(() => import('../AboutSection'));
const Timeline = lazy(() => import('../Timeline'));
const News = lazy(() => import('../News'));
const Education = lazy(() => import('../Education'));
const Publications = lazy(() => import('../Publications'));
const Projects = lazy(() => import('../Projects'));
const Footer = lazy(() => import('../../../../shared/components/ui/Footer'));
const VisitorMap = lazy(() => import('../VisitorMap'));

// Base64 blur placeholder (20x20 heavily blurred version)
const BLUR_PLACEHOLDER = 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDABALDA4MChAODQ4SERATGCgaGBYWGDEjJR0oOjM9PDkzODdASFxOQERXRTc4UG1RV19iZ2hnPk1xeXBkeFxlZ2P/2wBDARESEhgVGC8aGi9jQjhCY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2P/wAARCAANABQDASIAAhEBAxEB/8QAGAAAAgMAAAAAAAAAAAAAAAAAAAMBAgT/xAAYEAEBAQEBAAAAAAAAAAAAAAAAAQIRIf/EABYBAQEBAAAAAAAAAAAAAAAAAAIFBv/EABgRAQEAAwAAAAAAAAAAAAAAAAABERIh/9oADAMBAAIRAxEAPwDPYjhmlIqbM9JwTIMk8BZB/9k=';

const Portfolio: React.FC = () => {
  const [backgroundStage, setBackgroundStage] = useState<'blur' | 'loading' | 'loaded'>('blur');
  const [backgroundUrl, setBackgroundUrl] = useState(BLUR_PLACEHOLDER);
  const [showSecondLine, setShowSecondLine] = useState(false);
  const [showThirdLine, setShowThirdLine] = useState(false);

  useEffect(() => {
    // First load the optimized version
    const optimizedImg = new Image();
    optimizedImg.src = process.env.PUBLIC_URL + '/preload-background.jpg';

    optimizedImg.onload = () => {
      setBackgroundUrl(process.env.PUBLIC_URL + '/preload-background.jpg');
      setBackgroundStage('loading');

      // Then load the full quality version
      const fullImg = new Image();
      fullImg.src = require('../../../../assets/images/backgrounds/background.jpg');
      fullImg.onload = () => {
        setBackgroundUrl(require('../../../../assets/images/backgrounds/background.jpg'));
        setBackgroundStage('loaded');
      };
    };

    // If optimized fails, load full directly
    optimizedImg.onerror = () => {
      const fullImg = new Image();
      fullImg.src = require('../../../../assets/images/backgrounds/background.jpg');
      fullImg.onload = () => {
        setBackgroundUrl(require('../../../../assets/images/backgrounds/background.jpg'));
        setBackgroundStage('loaded');
      };
    };
  }, []);
  return (
    <>
      <div className="absolute top-0 right-0 z-50">
        <NavBar variant="dark" />
      </div>

      <header
        className={`pt-12 font-['Bungee'] bg-no-repeat bg-cover bg-center h-screen relative gpu-accelerated`}
        style={{
          backgroundImage: `url(${backgroundUrl})`,
          filter: backgroundStage === 'blur' ? 'blur(20px)' : backgroundStage === 'loading' ? 'blur(2px)' : 'none',
          transition: 'filter 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
          transform: 'scale(1.01)' // Slightly scale to hide blur edges
        }}
      >
        <div id="top">
          <h1 className="text-black text-left pl-[1%] text-[7vw] lg:text-[4vw] font-black h-[1.2em]">
            <span className="[-webkit-text-stroke:1px_#ffffff]">
              <TypingAnimation
                text="Welcome to"
                delay={300}
                speed={50}
                onComplete={() => setShowSecondLine(true)}
                cursor={!showSecondLine}
              />
            </span>
          </h1>

          <h1 className="text-white text-left pl-[1%] text-[7vw] lg:text-[4vw] font-black [-webkit-text-stroke:3px_#000000] max-[600px]:[-webkit-text-stroke:2px_#000000] origin-center-top h-[1.2em]">
            {showSecondLine && (
              <span>
                <TypingAnimation
                  text="My Website :)"
                  delay={100}
                  speed={50}
                  onComplete={() => setShowThirdLine(true)}
                  cursor={!showThirdLine}
                />
              </span>
            )}
          </h1>

          {showThirdLine && (
            <div className="relative ml-1 md:bottom-10">
              <h2 className="absolute text-[12vw] [-webkit-text-stroke:2px_#000000] min-[481px]:[-webkit-text-stroke:3px_#000000] min-[641px]:[-webkit-text-stroke:5px_#000000] text-transparent">
                <TypingAnimation
                  text="Kyochul Jang"
                  delay={100}
                  speed={60}
                  cursor={false}
                />
              </h2>
              <h2 className="absolute text-[12vw] [-webkit-text-stroke:2px_#000000] min-[481px]:[-webkit-text-stroke:3px_#000000] min-[641px]:[-webkit-text-stroke:5px_#000000] text-[#b5ff08] animate-[animate_4s_ease-in-out_infinite]">
                <TypingAnimation
                  text="Kyochul Jang"
                  delay={100}
                  speed={60}
                  cursor={false}
                />
              </h2>
            </div>
          )}

          <div className="flex absolute scale-50 left-[8px] top-[20vh] sm:scale-100 sm:top-[12vh] md:top-[20vh] lg:top-[28vh] 2xl:top-[32vh]">
            <FancyBtn url="#about1" btnText="About Me!" />
          </div>
        </div>
      </header>

      <Suspense fallback={<div className="h-screen flex items-center justify-center">Loading...</div>}>
        <AboutMe id="about1" />
      </Suspense>
      <Suspense fallback={<div className="h-screen flex items-center justify-center">Loading...</div>}>
        <News id="news" />
      </Suspense>
      <Suspense fallback={<div className="h-screen flex items-center justify-center">Loading...</div>}>
        <Publications id="publications" />
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

      <style>{`
        @keyframes animate {
          0%, 100% {
            clip-path: polygon(
              0% 45%,
              16% 44%,
              33% 50%,
              54% 60%,
              70% 61%,
              84% 59%,
              100% 52%,
              100% 100%,
              0% 100%
            );
          }
          50% {
            clip-path: polygon(
              0% 60%,
              15% 65%,
              34% 66%,
              51% 62%,
              67% 50%,
              84% 45%,
              100% 46%,
              100% 100%,
              0% 100%
            );
          }
        }

        @keyframes blink-portfolio {
          0%, 100% {
            outline-color: transparent;
          }
          50% {
            outline-color: #e9fb8b;
          }
        }

        @keyframes shake {
          0% { transform: translate(1px, 1px) rotate(0deg); }
          10% { transform: translate(-1px, -1px) rotate(1deg); }
          20% { transform: translate(-2px, 1px) rotate(-1deg); }
          30% { transform: translate(1px, 2px) rotate(0deg); }
          40% { transform: translate(-1px, 1px) rotate(1deg); }
          50% { transform: translate(1px, -1px) rotate(-2deg); }
          60% { transform: translate(2px, 1px) rotate(1deg); }
          70% { transform: translate(-1px, 2px) rotate(2deg); }
          80% { transform: translate(2px, -1px) rotate(1deg); }
          90% { transform: translate(-1px, 2px) rotate(0deg); }
          100% { transform: translate(2px, 1px) rotate(-1deg); }
        }
      `}</style>
    </>
  );
};

export default Portfolio;

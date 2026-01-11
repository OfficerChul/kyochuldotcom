import React, { useState } from 'react';
import FancyBtn from '../Button';
import TypingAnimation from '../TypingAnimation';
import NavBar from '../NavBar';
import type { NavPage } from '../NavBar/NavBar';
import backgroundImage from '../../../../assets/images/backgrounds/background.jpg';

interface HeroSectionProps {
  showAboutButton?: boolean;
  currentPage?: NavPage;
  secondLineText?: string;
}

const HeroSection: React.FC<HeroSectionProps> = ({
  showAboutButton = false,
  currentPage,
  secondLineText = 'My Website :)',
}) => {
  const [showSecondLine, setShowSecondLine] = useState(false);
  const [showThirdLine, setShowThirdLine] = useState(false);

  return (
    <>
      <header
        className={`font-['Bungee'] bg-no-repeat bg-cover bg-center h-screen relative`}
        style={{
          backgroundImage: `url(${backgroundImage})`,
        }}
      >
        <div className="absolute top-0 right-0 z-50 font-sans">
          <NavBar variant="dark" currentPage={currentPage} />
        </div>

        <div id="top" className="pt-12">
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
                  text={secondLineText}
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
                <TypingAnimation text="Kyochul Jang" delay={100} speed={60} cursor={false} />
              </h2>
              <h2 className="absolute text-[12vw] [-webkit-text-stroke:2px_#000000] min-[481px]:[-webkit-text-stroke:3px_#000000] min-[641px]:[-webkit-text-stroke:5px_#000000] text-[#b5ff08] animate-[animate_4s_ease-in-out_infinite]">
                <TypingAnimation text="Kyochul Jang" delay={100} speed={60} cursor={false} />
              </h2>
            </div>
          )}

          {showAboutButton && (
            <div className="flex absolute scale-50 left-[8px] top-[20vh] sm:scale-100 sm:top-[12vh] md:top-[20vh] lg:top-[28vh] 2xl:top-[32vh]">
              <FancyBtn url="#about1" btnText="About Me!" />
            </div>
          )}
        </div>
      </header>

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
      `}</style>
    </>
  );
};

export default HeroSection;

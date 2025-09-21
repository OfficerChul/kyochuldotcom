import React from 'react';
import AboutMe from '../AboutSection';
import Projects from '../Projects';
import Footer from '../../../../shared/components/ui/Footer';
import logo from '../../../../assets/images/logos/triangle-green.png';
import FancyBtn from '../../../../shared/components/ui/Button';
import { Link } from 'react-router-dom';
import Navigation from '../../../../shared/components/ui/Navigation';
import { JackInTheBox, Fade } from 'react-awesome-reveal';

const Portfolio: React.FC = () => {
  return (
    <>
      <Navigation />

      <header className="pt-12 font-['Bungee'] bg-[url('./assets/images/backgrounds/background.jpg')] bg-no-repeat bg-cover bg-center h-screen relative">
        <div id="top">
          <Link to="/">
            <img
              style={{ zIndex: 1000 }}
              className="absolute w-14 rounded-full right-5 animate-[blink-portfolio_2s_linear_infinite] outline-3 outline-transparent hover:brightness-125 hover:animate-[shake_3s_infinite] transition-all duration-500 ease-in-out"
              src={logo}
              alt="logo"
            />
          </Link>

          <Fade cascade damping={3} direction="right">
            <div />
          </Fade>

          <h1 className="text-black text-left pl-[1%] text-[7vw] lg:text-[4vw] font-black">
            <span className="[-webkit-text-stroke:1px_#ffffff]">
              <Fade cascade triggerOnce={true} damping={0.1} direction="right">
                Welcome to
              </Fade>
            </span>
          </h1>

          <h1 className="text-white text-left pl-[1%] text-[7vw] lg:text-[4vw] font-black [-webkit-text-stroke:3px_#000000] max-[600px]:[-webkit-text-stroke:2px_#000000] origin-center-top">
            <span>
              <Fade cascade triggerOnce={true} damping={0.1} delay={400} direction="right">
                My Website :)
              </Fade>
            </span>
          </h1>

          <JackInTheBox cascade triggerOnce={true}>
            <div className="relative ml-1 md:bottom-10">
              <h2 className="absolute text-[12vw] [-webkit-text-stroke:2px_#000000] min-[481px]:[-webkit-text-stroke:3px_#000000] min-[641px]:[-webkit-text-stroke:5px_#000000] text-transparent">
                <Fade cascade triggerOnce={true} damping={0.1} delay={800} direction="right">
                  Kyochul Jang
                </Fade>
              </h2>
              <h2 className="absolute text-[12vw] [-webkit-text-stroke:2px_#000000] min-[481px]:[-webkit-text-stroke:3px_#000000] min-[641px]:[-webkit-text-stroke:5px_#000000] text-[#b5ff08] animate-[animate_4s_ease-in-out_infinite]">
                <Fade cascade triggerOnce={true} damping={0.1} delay={800} direction="right">
                  Kyochul Jang
                </Fade>
              </h2>
            </div>
          </JackInTheBox>

          <div className="flex absolute scale-50 left-[1px] mt-5 sm:scale-100 sm:top-20 md:top-24 2xl:top-28">
            <FancyBtn url="#about1" btnText="About Me!" />
          </div>
        </div>
      </header>

      <AboutMe id="about1" />
      <Projects id="projects" />

      <footer>
        <Footer />
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
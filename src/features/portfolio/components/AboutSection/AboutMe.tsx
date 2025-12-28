import React from 'react';
import { Fade } from 'react-awesome-reveal';
import { FancyButtonSmall } from '../../../../shared/components/ui/Button';
import SectionTitle from '../../../../shared/components/ui/SectionTitle';

interface AboutMeProps {
  id?: string;
}

const AboutMe: React.FC<AboutMeProps> = ({ id }) => {
  const onButtonClick = (): void => {
    fetch('Kyochul_Jang___CV.pdf')
      .then((response) => response.blob())
      .then((blob) => {
        const fileURL = window.URL.createObjectURL(blob);
        const alink = document.createElement('a');
        alink.href = fileURL;
        alink.download = 'Kyochul_Resume.pdf';
        alink.click();
        // Release blob URL to prevent memory leak
        window.URL.revokeObjectURL(fileURL);
      })
      .catch((error) => {
        console.error('Error downloading resume:', error);
      });
  };

  return (
    <div className="bg-gradient-to-br from-gray-50 to-sky-50 py-12 md:py-16 lg:py-20" id={id}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-20">
        <Fade cascade damping={0.1} triggerOnce={true} direction="up">
          <SectionTitle>About Me</SectionTitle>
        </Fade>

        <Fade cascade damping={0.1} triggerOnce={true} direction="up">
          <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
            <div className="lg:w-1/2 flex justify-center items-center">
              <div className="relative group w-full max-w-lg">
                <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl blur opacity-0 group-hover:opacity-75 transition duration-500"></div>
                <img
                  src="/myPicture-optimized.jpg"
                  alt="Kyochul Jang profile"
                  loading="lazy"
                  className="relative w-full h-auto rounded-2xl shadow-2xl transform transition duration-500 group-hover:scale-[1.02]"
                />
              </div>
            </div>

            <div className="lg:w-1/2">
              <div className="font-mono text-xs sm:text-sm lg:text-base text-gray-700 leading-relaxed bg-white/50 p-4 sm:p-6 rounded-lg shadow-sm backdrop-blur-sm">
                <p>
                  Hi, I am Kyochul Jang, a PhD student at{' '}
                  <a
                    className="text-[#0F709D] underline hover:text-sky-400 transition-colors duration-200"
                    href="https://gsai.snu.ac.kr/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Seoul National University(SNU), Graduate School of AI
                  </a>
                  , advised by Professor{' '}
                  <a
                    className="text-[#0F709D] underline hover:text-sky-400 transition-colors duration-200"
                    href="https://yj-yu.github.io/home/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Youngjae Yu
                  </a>
                  {' '}(<a
                    className="text-[#0F709D] underline hover:text-sky-400 transition-colors duration-200"
                    href="https://pi.snu.ac.kr/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    SNUPI Lab
                  </a>).
                  <br /><br />
                  My research interests lie in{' '}
                  <span className="text-sky-400">GUI Agent</span>,{' '}
                  <span className="text-sky-400">On-device AI</span>,{' '}
                  <span className="text-sky-400">AI Safety</span>, and{' '}
                  <span className="text-sky-400">Embodied AI</span>. Thanks to the support of the{' '}
                  <a
                    href="https://devocean.sk.com/community/aiFellowshipHistory.do"
                    className="text-[#EA002C] underline hover:text-sky-400 transition-colors duration-200"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    SKT AI Fellowship
                  </a>, currently I am conducting research on{' '}
                  <span className="text-sky-400">On-device GUI Agent</span>. I am also serving as a Teaching Assistant for Generation for NLP at{' '}
                  <a
                    href="https://boostcamp.connect.or.kr/"
                    className="text-[#00D659] underline hover:text-sky-400 transition-colors duration-200"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Naver Boostcamp
                  </a>.
                  <br /><br />
                  Prior to this, I obtained my Bachelor's degree in Computer Science from{' '}
                  <a
                    href="https://purdue.edu/"
                    className="text-[#CEB888] underline hover:text-sky-400 transition-colors duration-200"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Purdue University
                  </a>{' '}
                  in 2024 and worked as a Software Development Engineer Intern at{' '}
                  <a
                    href="https://www.samsung.com/"
                    className="underline text-[#1428A0] hover:text-sky-400 transition-colors duration-200"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Samsung Electronics
                  </a>.
                  <br /><br />
                  I'm open to AI research internships and collaborations worldwide. Since I've lived in the US 🇺🇸 and China 🇨🇳 for many years, I'm fluent in{' '}
                  <span className="text-sky-400">English</span>,{' '}
                  <span className="text-sky-400">Korean</span> 🇰🇷, and{' '}
                  <span className="text-sky-400">Chinese</span>. If our research interests align, I'd love to connect. You can reach me through the contact details at the{' '}
                  <span className="text-sky-400">bottom</span> of this page!
                  <br /><br />
                  For more details, please check my CV below :)
                </p>
              </div>
              <div className="mt-6">
                <FancyButtonSmall
                  onClick={onButtonClick}
                  className="px-4 py-2 text-sky-600 font-mono stroke-sky-400 hover:stroke-sky-600"
                  borderColor="rgba(56, 189, 248, 0.5)"
                  noSvgBorder={true}
                  shineColor="from-transparent via-sky-300/40 to-transparent"
                  ariaLabel="Download CV"
                >
                  <i className="fa fa-download"></i>
                  <span className="font-mono">Download CV</span>
                </FancyButtonSmall>
              </div>
            </div>
          </div>
        </Fade>
      </div>
    </div>
  );
};

export default AboutMe;

import React from 'react';
import myPic from '../../../../assets/images/profile/myPicture.jpg';
import { Fade } from 'react-awesome-reveal';
import { FancyButtonSmall } from '../../../../shared/components/ui/Button';

interface AboutMeProps {
  id?: string;
}

const AboutMe: React.FC<AboutMeProps> = ({ id }) => {
  const onButtonClick = (): void => {
    // Using JavaScript method to get PDF file
    fetch('Kyochul_Jang___CV.pdf')
      .then((response) => {
        response.blob().then((blob) => {
          // Creating new object of PDF file
          const fileURL = window.URL.createObjectURL(blob);
          // Setting various property values
          const alink = document.createElement('a');
          alink.href = fileURL;
          alink.download = 'Kyochul_Resume.pdf';
          alink.click();
        });
      })
      .catch((error) => {
        console.error('Error downloading resume:', error);
      });
  };

  return (
    <div className="bg-gradient-to-br from-gray-50 to-sky-50 py-20" id={id}>
      <div className="container mx-auto px-6 lg:px-20">
        <Fade cascade damping={0.1} triggerOnce={true} direction="up">
          <div className="text-center mb-12">
            <h2 className="font-mono text-4xl md:text-6xl text-sky-300 font-extrabold mb-4">
              About Me
            </h2>
            <div className="w-20 h-1 bg-sky-300 mx-auto rounded-full"></div>
          </div>
        </Fade>

        <Fade cascade damping={0.1} triggerOnce={true} direction="up">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="lg:w-2/5 flex justify-center">
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-sky-300 to-blue-400 rounded-2xl blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
                <img
                  src={myPic}
                  alt="Kyochul Jang profile"
                  className="relative w-full h-auto max-w-sm object-cover rounded-2xl shadow-2xl transform transition duration-500 hover:scale-105"
                />
              </div>
            </div>

            <div className="lg:w-3/5">
              <div className="font-mono text-base lg:text-lg text-gray-700 leading-relaxed bg-white/50 p-6 rounded-lg shadow-sm backdrop-blur-sm">
                <p>
                  Hi, I am Kyochul Jang, a Master's student in the{' '}
                  <span className="text-sky-400">
                    <a
                      className="text-[#0F709D] underline hover:text-sky-400 transition-colors duration-200"
                      href="https://gsai.snu.ac.kr/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Seoul National University AI
                    </a>
                  </span>
                  , advised by Professor Bongwon Suh.
                  <br /><br />
                  My research interests lie in{' '}
                  <span className="text-sky-400">Natural Language Processing</span>,{' '}
                  <span className="text-sky-400">Graph Neural Networks</span>, and{' '}
                  <span className="text-sky-400">Human+AI Interaction</span>.
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
                  in 2024 and worked as a Software Engineer Intern at{' '}
                  <a
                    href="https://www.samsung.com/"
                    className="underline text-[#1428A0] hover:text-sky-400 transition-colors duration-200"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Samsung Electronics
                  </a>
                  .
                  <br /><br />
                  I welcome AI research intern offers! Feel free to contact me via contacts at the{' '}
                  <span className="text-sky-400">bottom</span> of the website!
                </p>
              </div>
              <div className="mt-6">
                <FancyButtonSmall
                  onClick={onButtonClick}
                  className="px-4 py-2 text-sky-600 font-mono stroke-sky-400 hover:stroke-sky-600"
                  borderColor="rgba(56, 189, 248, 0.5)"
                  noSvgBorder={true}
                  shineColor="from-transparent via-sky-300/40 to-transparent"
                  ariaLabel="Download Resume"
                >
                  <i className="fa fa-download"></i>
                  <span className="font-mono">Download Resume</span>
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
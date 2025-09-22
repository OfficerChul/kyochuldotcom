import React, { useEffect, useMemo, useState } from 'react';
import GitHubCalendar from 'react-github-calendar';
import type { CalendarData } from 'react-activity-calendar';
import { FancyButtonSmall } from '../Button';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const [likes, setLikes] = useState(0);
  const [hasLiked, setHasLiked] = useState(false);
  const [isMobile, setIsMobile] = useState(() => (typeof window !== 'undefined' ? window.innerWidth < 640 : false));

  useEffect(() => {
    const handleResize = () => {
      if (typeof window !== 'undefined') {
        setIsMobile(window.innerWidth < 640);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleLike = () => {
    if (!hasLiked) {
      setLikes(likes + 1);
      setHasLiked(true);
    }
  };

  const handleDownloadCV = () => {
    fetch('Kyochul_Jang___CV.pdf')
      .then((response) => {
        response.blob().then((blob) => {
          const fileURL = window.URL.createObjectURL(blob);
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

  const calendarTransformData = useMemo(() => {
    if (!isMobile) {
      return undefined;
    }

    const mobileWeeks = 26;
    const daysToShow = mobileWeeks * 7;

    return (data: CalendarData) => data.slice(-daysToShow);
  }, [isMobile]);

  const calendarLabels = useMemo(() => {
    if (!isMobile) {
      return undefined;
    }

    return {
      totalCount: '{{count}} contributions in the last 26 weeks',
    };
  }, [isMobile]);

  return (
    <footer className="bg-gradient-to-br from-green-50 via-lime-50 to-emerald-50 py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 text-emerald-600 font-mono">About</h3>
            <p className="text-gray-700 text-xs sm:text-sm leading-relaxed">
              AI Researcher & Software Developer
              <br />
              Master's Student at Seoul National University
              <br />
              Specializing in NLP, GNN, and Human-AI Interaction
            </p>
          </div>

          <div>
            <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 text-emerald-600 font-mono">Connect</h3>
            <div className="flex flex-col space-y-3">
              <a
                href="https://github.com/OfficerChul"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-purple-500 transition-colors duration-200 text-xs sm:text-sm flex items-center group"
              >
                <svg className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
                GitHub
              </a>
              <a
                href="https://linkedin.com/in/kyochul-jang"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-blue-500 transition-colors duration-200 text-xs sm:text-sm flex items-center group"
              >
                <svg className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
                LinkedIn
              </a>
              <a
                href="mailto:kyochul@snu.ac.kr"
                className="text-gray-600 hover:text-emerald-500 transition-colors duration-200 text-xs sm:text-sm flex items-center group"
              >
                <svg className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                kyochul@snu.ac.kr
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 text-emerald-600 font-mono">Support</h3>
            <div className="space-y-3">
              <FancyButtonSmall
                onClick={hasLiked ? undefined : handleLike}
                className={`w-full px-3 py-2 text-xs font-medium font-mono ${
                  hasLiked
                    ? 'text-pink-600 stroke-pink-400 cursor-not-allowed opacity-75'
                    : 'text-pink-500 stroke-pink-400 hover:stroke-pink-600'
                }`}
                borderColor="rgba(236, 72, 153, 0.5)"
                noSvgBorder={true}
                shineColor={hasLiked ? "" : "from-transparent via-pink-300/40 to-transparent"}
                ariaLabel="Like this site"
              >
                <span className="mr-1">💗</span>
                <span>{hasLiked ? 'Liked' : 'Like'} ({likes})</span>
              </FancyButtonSmall>

              <FancyButtonSmall
                onClick={handleDownloadCV}
                className="w-full px-3 py-2 text-xs font-medium text-emerald-600 font-mono stroke-emerald-400 hover:stroke-emerald-600"
                borderColor="rgba(16, 185, 129, 0.5)"
                noSvgBorder={true}
                shineColor="from-transparent via-emerald-300/40 to-transparent"
                ariaLabel="Download Resume"
              >
                <i className="fa fa-download mr-1"></i>
                <span>Download CV</span>
              </FancyButtonSmall>
            </div>
          </div>


        </div>

        <div className="w-full mb-8">
          <a
            href="https://github.com/OfficerChul"
            target="_blank"
            rel="noopener noreferrer"
            className="block"
          >
            <div className="bg-white p-4 sm:p-6 lg:p-8 rounded-xl overflow-x-auto shadow-md border border-gray-200 hover:shadow-lg transition-shadow duration-300">
              <GitHubCalendar
                username="OfficerChul"
                fontSize={isMobile ? 11 : 16}
                blockSize={isMobile ? 9 : 18}
                blockMargin={isMobile ? 2 : 4}
                transformData={calendarTransformData}
                labels={calendarLabels}
                transformTotalCount={!isMobile}
              />
            </div>
          </a>
        </div>

        <div className="border-t border-gray-300 pt-8 text-center">
          <p className="text-gray-600 text-sm">
            © {currentYear} Kyochul Jang. All rights reserved.
          </p>
          <p className="text-gray-500 text-xs mt-2">
            Source code available on{' '}
            <a
              href="https://github.com/OfficerChul/kyochuldotcom"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sky-500 hover:text-sky-600 underline"
            >
              GitHub
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

import React from 'react';
import { Fade } from 'react-awesome-reveal';
import { FancyButtonSmall } from '../../../../shared/components/ui/Button';

interface NewsProps {
  id?: string;
}

interface NewsItem {
  date: string;
  text: string;
  link?: string;
}

const NEWS_ITEMS: NewsItem[] = [
  { date: '2025-09', text: '🎓 Teaching Assistant at SNU: Data Structures and Algorithms, and AI Seminar' },
  { date: '2025-09', text: '🧭 Code Voyager accepted as UIST 2025 Poster', link: 'https://programs.sigchi.org/uist/2025/program/content/209380' },
  { date: '2025-05', text: '🧪 DICE Bench accepted to ACL 2025 Findings', link: 'https://snuhcc.github.io/DICE-Bench/' },
  { date: '2025-05', text: '🏅 Selected for SKT AI Fellowship' },
  { date: '2024-09', text: '🎓 Started PhD at SNU GSAI (SNUPI Lab)' },
];

const News: React.FC<NewsProps> = ({ id }) => {
  return (
    <>
      <style jsx>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
      <section className="bg-white py-8 md:py-12 lg:py-16" id={id}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-20">
        <Fade cascade damping={0.1} triggerOnce={true} direction="up">
          <div className="text-center mb-8">
            <h2 className="font-mono text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-sky-300 font-extrabold mb-4">
              News
            </h2>
            <div className="w-20 h-1 bg-sky-300 mx-auto rounded-full"></div>
          </div>
        </Fade>

        <Fade cascade damping={0.1} triggerOnce={true} direction="up">
          <div className="max-w-4xl mx-auto">
            <ul className="space-y-2">
              {NEWS_ITEMS.map((item, index) => (
                <li
                  key={index}
                  className="flex flex-col sm:flex-row gap-2 sm:gap-4"
                >
                  <span className="text-sky-500 font-mono font-semibold min-w-[90px]">{item.date}</span>
                  <span className="font-mono text-gray-700">
                    {item.text}{item.text.trimEnd().endsWith('!') ? '' : '!'}
                  </span>
                  {item.link && (
                    <FancyButtonSmall
                      href={item.link}
                      className="inline-flex items-center justify-center px-2 py-[2px] text-[10px] leading-[1.18] text-sky-600 font-mono stroke-sky-400 hover:stroke-sky-600 ml-1"
                      borderColor="rgba(56, 189, 248, 0.42)"
                      borderWidth={2}
                      noSvgBorder={true}
                      shineColor="from-transparent via-sky-300/35 to-transparent"
                      ariaLabel="Open link"
                    >
                      <span className="flex items-center gap-0.5 lowercase tracking-wide">
                        <span>link</span>
                        <svg
                          className="h-[8px] w-[8px]"
                          viewBox="0 0 12 12"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          aria-hidden="true"
                        >
                          <path
                            d="M4 2H10V8M10 2L2 10"
                            stroke="currentColor"
                            strokeWidth="1.1"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </span>
                    </FancyButtonSmall>
                  )}
                </li>
              ))}
            </ul>
            
          </div>
        </Fade>
      </div>
    </section>
    </>
  );
};

export default News;

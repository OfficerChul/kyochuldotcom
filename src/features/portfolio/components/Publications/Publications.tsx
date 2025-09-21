import React, { useState } from 'react';
import { Fade } from 'react-awesome-reveal';
import publications from './publications.json';
import { FancyButtonSmall } from '../../../../shared/components/ui/Button';

interface PublicationsProps {
  id?: string;
}

type Publication = {
  title: string;
  authors: string[];
  venue?: string;
  year?: number;
  link?: string;
};

const getRomanNumeral = (num: number): string => {
  if (num <= 0) {
    return '';
  }
  const numerals: Array<[number, string]> = [
    [1000, 'M'],
    [900, 'CM'],
    [500, 'D'],
    [400, 'CD'],
    [100, 'C'],
    [90, 'XC'],
    [50, 'L'],
    [40, 'XL'],
    [10, 'X'],
    [9, 'IX'],
    [5, 'V'],
    [4, 'IV'],
    [1, 'I']
  ];

  let remaining = num;
  let result = '';

  numerals.forEach(([value, symbol]) => {
    while (remaining >= value) {
      result += symbol;
      remaining -= value;
    }
  });

  return result;
};

const Publications: React.FC<PublicationsProps> = ({ id }) => {
  const [showAll, setShowAll] = useState(false);

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
              Publications
            </h2>
            <div className="w-20 h-1 bg-sky-300 mx-auto rounded-full"></div>
          </div>
        </Fade>

        <Fade cascade damping={0.1} triggerOnce={true} direction="up">
          <div className="max-w-5xl mx-auto">
            {publications.length === 0 ? (
              <p className="font-mono text-gray-600 text-center">No publications yet.</p>
            ) : (
              <>
                <ol className="space-y-3 list-none">
                  {(showAll ? publications : publications.slice(0, 5)).map((pub, index) => (
                    <li
                      key={index}
                      className="flex gap-3 items-start"
                      style={{
                        animation: showAll && index >= 5 ? 'slideDown 0.3s ease-out forwards' : undefined,
                        animationDelay: showAll && index >= 5 ? `${(index - 5) * 0.1}s` : '0s'
                      }}
                    >
                      <span className="text-sky-500 font-mono font-bold text-sm flex-shrink-0 w-11 text-right">
                        {`${getRomanNumeral(index + 1).toLowerCase()})`}
                      </span>
                      <div className="flex-1">
                        <p className="text-gray-800 text-sm">
                          {pub.authors.map((author, i) => (
                            <span key={i}>
                              {author.includes('Jang, K') ? (
                                <strong className="text-sky-500 underline decoration-sky-500">{author}</strong>
                              ) : (
                                author
                              )}
                              {i < pub.authors.length - 1 && ', '}
                            </span>
                          ))}
                          {pub.year && ` (${pub.year}). `}
                        </p>
                        <p className="font-semibold text-gray-900 text-sm">
                          {pub.title}
                          {pub.link && (
                            <FancyButtonSmall
                              href={pub.link}
                              className="ml-2 inline-flex items-center justify-center px-1 py-[1.5px] text-[10px] leading-[1.18] text-sky-600 font-mono stroke-sky-400 hover:stroke-sky-600"
                              borderColor="rgba(56, 189, 248, 0.42)"
                              borderWidth={2}
                              noSvgBorder={true}
                              shineColor="from-transparent via-sky-300/35 to-transparent"
                              ariaLabel="View publication"
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
                        </p>
                        {pub.venue && (
                          <p className="text-gray-600 italic text-sm">{pub.venue}</p>
                        )}
                      </div>
                    </li>
                  ))}
                </ol>
                {publications.length > 5 && (
                  <button
                    onClick={() => setShowAll(!showAll)}
                    className="mt-6 mx-auto block px-6 py-2 text-sky-500 hover:text-sky-600 font-mono font-semibold border-2 border-sky-300 hover:border-sky-400 rounded-lg transition-colors duration-200"
                  >
                    {showAll ? 'Show Less ↑' : 'Show More ↓'}
                  </button>
                )}
              </>
            )}
          </div>
        </Fade>
      </div>
    </section>
    </>
  );
};

export default Publications;

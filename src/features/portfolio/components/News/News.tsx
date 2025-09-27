import React, { useState } from 'react';
import { Fade } from 'react-awesome-reveal';

interface NewsProps {
  id?: string;
}

interface NewsItem {
  date: string;
  text: string;
  link?: string;
}

const NEWS_ITEMS: NewsItem[] = [
  { date: '2025-09', text: 'Teaching Assistant at SNU: Data Structures and Algorithms, and AI Seminar.' },
  { date: '2025-09', text: 'Code Voyager accepted as UIST 2025 Poster.', link: '#' },
  { date: '2025-05', text: 'DICE Bench accepted to ACL 2025 Findings.', link: '#' },
  { date: '2025-05', text: 'Selected for SKT AI Fellowship.' },
  { date: '2024-09', text: 'Started PhD at SNU GSAI (SNUPI Lab).' },
];

const News: React.FC<NewsProps> = ({ id }) => {
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
              News
            </h2>
            <div className="w-20 h-1 bg-sky-300 mx-auto rounded-full"></div>
          </div>
        </Fade>

        <Fade cascade damping={0.1} triggerOnce={true} direction="up">
          <div className="max-w-4xl mx-auto">
            <ul className="space-y-2">
              {(showAll ? NEWS_ITEMS : NEWS_ITEMS.slice(0, 3)).map((item, index) => (
                <li
                  key={index}
                  className="flex flex-col sm:flex-row gap-2 sm:gap-4"
                  style={{
                    animation: showAll ? 'slideDown 0.3s ease-out forwards' : undefined,
                    animationDelay: showAll && index >= 3 ? `${(index - 3) * 0.1}s` : '0s'
                  }}
                >
                  <span className="text-sky-500 font-mono font-semibold min-w-[90px]">{item.date}</span>
                  {item.link ? (
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-mono text-gray-700 underline decoration-sky-300 hover:decoration-sky-400 underline-offset-2"
                    >
                      {item.text}
                    </a>
                  ) : (
                    <span className="font-mono text-gray-700">{item.text}</span>
                  )}
                </li>
              ))}
            </ul>
            {NEWS_ITEMS.length > 3 && (
              <button
                onClick={() => setShowAll(!showAll)}
                className="mt-6 mx-auto block px-6 py-2 text-sky-500 hover:text-sky-600 font-mono font-semibold border-2 border-sky-300 hover:border-sky-400 rounded-lg transition-colors duration-200"
              >
                {showAll ? 'Show Less ↑' : `Show More (${NEWS_ITEMS.length - 3} more) ↓`}
              </button>
            )}
          </div>
        </Fade>
      </div>
    </section>
    </>
  );
};

export default News;

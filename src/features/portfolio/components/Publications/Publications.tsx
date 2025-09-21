import React, { useState } from 'react';
import { Fade } from 'react-awesome-reveal';
import publications from './publications.json';

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

const Publications: React.FC<PublicationsProps> = ({ id }) => {
  const [showAll, setShowAll] = useState(false);
  const displayPublications = showAll ? publications : publications.slice(0, 4);

  return (
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
                <ol className="space-y-3">
                  {(displayPublications as Publication[]).map((pub, index) => (
                    <li key={index} className="flex gap-3">
                      <span className="text-sky-500 font-mono font-bold min-w-[30px] text-sm">
                        {String.fromCharCode(96 + index + 1)})
                      </span>
                      <div className="flex-1">
                        <p className="text-gray-800 text-sm">
                          {pub.authors.map((author, i) => (
                            <span key={i}>
                              {author.includes('Jang, K') ? (
                                <strong className="text-gray-900">{author}</strong>
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
                            <>
                              {' '}
                              <a
                                href={pub.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-sky-500 hover:text-sky-600 underline text-xs font-normal"
                              >
                                [Link]
                              </a>
                            </>
                          )}
                        </p>
                        {pub.venue && (
                          <p className="text-gray-600 italic text-sm">{pub.venue}</p>
                        )}
                      </div>
                    </li>
                  ))}
                </ol>
                {publications.length > 4 && (
                  <button
                    onClick={() => setShowAll(!showAll)}
                    className="mt-6 mx-auto block px-6 py-2 text-sky-500 hover:text-sky-600 font-mono font-semibold border-2 border-sky-300 hover:border-sky-400 rounded-lg transition-colors duration-200"
                  >
                    {showAll ? 'Show Less ↑' : `Show More (${publications.length - 4} more) ↓`}
                  </button>
                )}
              </>
            )}
          </div>
        </Fade>
      </div>
    </section>
  );
};

export default Publications;

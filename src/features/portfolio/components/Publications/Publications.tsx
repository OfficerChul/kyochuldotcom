import React from 'react';
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

const Publications: React.FC<PublicationsProps> = ({ id }) => (
  <section className="bg-white py-12 md:py-16 lg:py-20" id={id}>
    <div className="container mx-auto px-4 sm:px-6 lg:px-20">
      <Fade cascade damping={0.1} triggerOnce={true} direction="up">
        <div className="text-center mb-12">
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
            <ol className="space-y-6">
              {(publications as Publication[]).map((pub, index) => (
                <li key={index} className="flex gap-4">
                  <span className="text-sky-500 font-mono font-bold min-w-[40px]">
                    {String.fromCharCode(96 + index + 1)})
                  </span>
                  <div className="flex-1">
                    <div className="bg-gray-50 p-4 rounded-lg hover:bg-gray-100 transition-colors duration-200">
                      <p className="text-gray-800">
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
                      <p className="font-semibold text-gray-900 mt-1">{pub.title}</p>
                      {pub.venue && (
                        <p className="text-gray-600 italic mt-1">{pub.venue}</p>
                      )}
                      {pub.link && (
                        <a
                          href={pub.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sky-500 hover:text-sky-600 underline text-sm mt-2 inline-block"
                        >
                          [Link]
                        </a>
                      )}
                    </div>
                  </div>
                </li>
              ))}
            </ol>
          )}
        </div>
      </Fade>
    </div>
  </section>
);

export default Publications;

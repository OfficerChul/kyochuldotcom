import React from 'react';
import { Fade } from 'react-awesome-reveal';

interface NewsProps {
  id?: string;
}

const NEWS_ITEMS = [
  { date: '2025-09', text: 'Started PhD at SNU GSAI (SNUPI Lab).' },
  { date: '2025-08', text: 'Selected for SKT AI Fellowship.' },
  // Add more news items as needed
];

const News: React.FC<NewsProps> = ({ id }) => (
  <section className="bg-white py-12 md:py-16 lg:py-20" id={id}>
    <div className="container mx-auto px-4 sm:px-6 lg:px-20">
      <Fade cascade damping={0.1} triggerOnce={true} direction="up">
        <div className="text-center mb-12">
          <h2 className="font-mono text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-sky-300 font-extrabold mb-4">
            News
          </h2>
          <div className="w-20 h-1 bg-sky-300 mx-auto rounded-full"></div>
        </div>
      </Fade>
      
      <Fade cascade damping={0.1} triggerOnce={true} direction="up">
        <div className="max-w-4xl mx-auto">
          <ul className="space-y-4">
            {NEWS_ITEMS.map((item, index) => (
              <li key={index} className="flex flex-col sm:flex-row gap-2 sm:gap-4 bg-gray-50 p-4 rounded-lg">
                <span className="text-sky-500 font-mono font-semibold min-w-[90px]">{item.date}</span>
                <span className="font-mono text-gray-700">{item.text}</span>
              </li>
            ))}
          </ul>
        </div>
      </Fade>
    </div>
  </section>
);

export default News;

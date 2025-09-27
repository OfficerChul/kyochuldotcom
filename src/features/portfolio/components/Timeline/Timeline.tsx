import React from 'react';

interface TimelineProps {
  id?: string;
}

type TimelineItem = {
  period: string;
  title: string;
  org: string;
  location?: string;
  color?: string; // hex or tailwind color value
  desc?: string;
  descNode?: React.ReactNode;
};

// CV-based items (newest → oldest)
const ITEMS: TimelineItem[] = [
  {
    period: 'May 2025 – Present',
    title: 'SKT AI Fellow',
    org: 'SK Telecom',
    color: '#FF5B2E',
    descNode: (
      <span>
        On-Device mobile GUI agents; data collection; post-trained a Small VLM-Action model (sVLAM) (Mentor:{' '}
        <a href="https://www.linkedin.com/in/donghyun-kim-impro/" target="_blank" rel="noopener noreferrer" className="underline">Donghyun Kim</a>).
      </span>
    )
  },
  {
    period: 'May 2025 – Present',
    title: 'Graduate Teaching Assistant',
    org: 'SNU CSE',
    color: '#38bdf8',
    desc: 'AI Seminar; Data Structures and Algorithms — hands-on sessions and course logistics.'
  },
  {
    period: 'Jul 2024 – Present',
    title: 'AI Tech Teaching Assistant (Gen. for NLP)',
    org: 'Naver Boostcamp / SSAFY',
    color: '#03C75A',
    desc: 'Prepared lectures, assignments, and competitions on stages.ai.'
  },
  {
    period: 'Sep 2024 – Present',
    title: 'Ph.D. in Artificial Intelligence',
    org: 'SNU GSAI (SNUPI Lab)',
    color: '#38bdf8',
    descNode: (
      <span>
        Doctoral research at SNUPI Lab (Advisor:{' '}
        <a href="https://yj-yu.github.io/home/" target="_blank" rel="noopener noreferrer" className="underline">Youngjae Yu</a>).
      </span>
    )
  },
  {
    period: 'Jun 2023 – Aug 2023',
    title: 'Software Engineering Intern (MX)',
    org: 'Samsung Electronics DX',
    color: '#1428A0',
    desc: 'Developed automation tools; Mobile AP scenario analysis (Mentor: Youngchan Kim).'
  },
  {
    period: 'Aug 2020 – May 2024',
    title: 'B.S. in Computer Science',
    org: 'Purdue University',
    color: '#CEB888',
    desc: 'Graduated CGPA 3.71/4.00; Dean’s List; Semester Honors.'
  },
];

const Timeline: React.FC<TimelineProps> = ({ id }) => {
  return (
    <section id={id} className="bg-white py-8 md:py-10 lg:py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-20 max-w-7xl">
        <div className="text-center mb-12">
          <h2 className="font-mono text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-sky-300 font-extrabold mb-4">Timeline</h2>
          <div className="w-20 h-1 bg-sky-300 mx-auto rounded-full"></div>
        </div>

        <div className="relative">
          <style>{`
            @keyframes innerBlink { 
              0%, 100% { filter: brightness(1); }
              50% { filter: brightness(1.8); }
            }
          `}</style>
          {/* center line (desktop only) */}
          <div className="hidden md:block absolute left-1/2 -translate-x-1/2 top-0 h-full w-[2px] bg-gradient-to-b from-sky-200 via-sky-300 to-sky-200 rounded-full" />

          <ol className="space-y-2 md:space-y-3">
            {ITEMS.map((item, idx) => {
              const isLeft = idx % 2 === 0;
              return (
                <li key={`${item.org}-${idx}`} className="grid grid-cols-1 md:grid-cols-9 md:gap-6 lg:gap-8 items-center">
                  {/* left side (desktop) */}
                  <div className="hidden md:flex md:justify-end md:col-span-4">
                    {isLeft && (
                      <div className="w-full md:w-full">
                        <Card item={item} align="right" />
                      </div>
                    )}
                  </div>

                  {/* marker (desktop) */}
                  <div className="hidden md:flex items-center justify-center md:col-span-1">
                    <span
                      className="relative block h-3 w-3 rounded-full bg-sky-200"
                      style={{ boxShadow: '0 0 0 2px rgba(125,211,252,0.45)' }}
                    >
                      <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-2 w-2 rounded-full bg-sky-400" style={{ animation: 'innerBlink 1.6s ease-in-out infinite' }}></span>
                    </span>
                  </div>

                  {/* right side (desktop) */}
                  <div className="hidden md:flex md:col-span-4">
                    {!isLeft && (
                      <div className="w-full md:w-full">
                        <Card item={item} align="left" />
                      </div>
                    )}
                  </div>

                  {/* mobile single column */}
                  <div className="md:hidden">
                    <Card item={item} />
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
};

const Card: React.FC<{ item: TimelineItem; align?: 'left' | 'right' }> = ({ item }) => {
  return (
    <div className={`relative bg-white rounded-md shadow-md border-2 border-sky-200 p-2 md:p-2 transform transition-all duration-500 hover:scale-[1.01] hover:shadow-2xl hover:border-purple-500`}>
      <h3 className="text-[12px] md:text-[13px] font-semibold text-gray-900 pr-14">{item.title}</h3>
      <span
        className="absolute top-1 right-2 text-[8.5px] px-1 py-[0px] rounded border border-current whitespace-nowrap"
        style={{ color: item.color, borderColor: item.color }}
      >
        {item.org}
      </span>
      {item.descNode ? (
        <p className="mt-0.5 text-[10px] leading-tight text-gray-700">{item.descNode}</p>
      ) : item.desc ? (
        <p className="mt-0.5 text-[10px] leading-tight text-gray-700">{item.desc}</p>
      ) : null}
      {/* period at bottom-left for all alignments */}
      <div className="absolute left-2 bottom-1 text-[8px] uppercase tracking-wide text-gray-500">
        {item.period}
      </div>
      <div className="pt-2.5" />
    </div>
  );
};

export default Timeline;



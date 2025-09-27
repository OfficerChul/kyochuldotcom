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

// Latest first (descending by date)
const NEWS_ITEMS: NewsItem[] = [
  // 2025-09
  { date: '2025-09', text: '🎓 Teaching Assistant at SNU: Data Structures and Algorithms, and AI Seminar' },
  { date: '2025-09', text: '🧭 Code Voyager accepted as UIST 2025 Poster', link: 'https://programs.sigchi.org/uist/2025/program/content/209380' },

  // 2025-06
  { date: '2025-06', text: '🏆 Awarded SKT AI Fellow Scholarship (Jun–Nov 2025)' },
  { date: '2025-06', text: '🏆 Grand Prize (2nd Place) at AI Demo Competition' },
  { date: '2025-06', text: '🎤 Invited Talk at SNU GSAI: Code Understanding Tool using React-Flow (Code Voyager)' },

  // 2025-05
  { date: '2025-05', text: '🧪 DICE Bench accepted to ACL 2025 Findings', link: 'https://snuhcc.github.io/DICE-Bench/' },
  { date: '2025-05', text: '🏅 Selected for SKT AI Fellowship' },
  { date: '2025-05', text: '💼 Started as SKT AI Fellow at SK Telecom' },

  // 2024-11, 2024-09, 2024-07, 2024-04
  { date: '2024-11', text: '🎤 Invited Talk at Naver Boostcamp: LLM Function Calling and Agent' },
  { date: '2024-09', text: '🎓 Started PhD at SNU GSAI (SNUPI Lab)' },
  { date: '2024-07', text: '🎓 AI Tech Teaching Assistant (Generation for NLP) at Naver Boostcamp / SSAFY' },
  { date: '2024-04', text: '🥇 1st Prize (LG AImers / LG AI Hackathon)' },

  // 2023-12, 2023-06
  { date: '2023-12', text: '🎓 Graduated from Purdue University (B.S. in Computer Science)' },
  { date: '2023-12', text: "🏅 Dean's List (Aug 2021–Dec 2023)" },
  { date: '2023-12', text: '🏅 Semester Honors (Jan 2021–Dec 2023)' },
  { date: '2023-06', text: '💼 Started Software Engineering Internship at Samsung Electronics DX (MX)' },
];

const News: React.FC<NewsProps> = ({ id }) => {
  return (
    <>
      <style>{`
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
                    {highlightInstitutions(item.text)}{item.text.trimEnd().endsWith('!') ? '' : '!'}
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

// Highlight institution names with brand colors
function highlightInstitutions(text: string): React.ReactNode[] {
  const rules: Array<{ regex: RegExp; color: string; bold?: boolean }> = [
    { regex: /(SNU\s*GSAI|Seoul National University|SNU)/gi, color: '#38bdf8', bold: true }, // sky-400
    { regex: /(Samsung Electronics(?:\s*DX)?)/gi, color: '#1428A0', bold: true }, // Samsung blue
    { regex: /(Naver\s*Boostcamp|SSAFY)/gi, color: '#03C75A', bold: true }, // Naver green
    { regex: /(SKT\s*AI\s*Fellowship|SK\s*Telecom)/gi, color: '#FF5B2E', bold: true }, // SKT orange
    { regex: /(Purdue University)/gi, color: '#CEB888', bold: true }, // Purdue gold
  ];

  let parts: Array<React.ReactNode> = [text];
  for (const { regex, color, bold } of rules) {
    const nextParts: Array<React.ReactNode> = [];
    parts.forEach((part) => {
      if (typeof part !== 'string') {
        nextParts.push(part);
        return;
      }
      const re = new RegExp(regex.source, regex.flags); // fresh regex per fragment
      let lastIndex = 0;
      let m: RegExpExecArray | null;
      let localIndex = 0;
      while ((m = re.exec(part)) !== null) {
        const start = m.index;
        const end = start + m[0].length;
        if (start > lastIndex) {
          nextParts.push(part.slice(lastIndex, start));
        }
        nextParts.push(
          <span key={`${color}-${localIndex++}-${start}`} style={{ color, fontWeight: bold ? 700 : 500 }}>
            {m[0]}
          </span>
        );
        lastIndex = end;
      }
      if (lastIndex < part.length) {
        nextParts.push(part.slice(lastIndex));
      }
    });
    parts = nextParts;
  }
  return parts;
}

export default News;

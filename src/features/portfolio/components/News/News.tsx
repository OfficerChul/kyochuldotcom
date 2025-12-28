import React from 'react';
import { Fade } from 'react-awesome-reveal';
import publicationsData from '../Publications/publications.json';
import { FancyButtonSmall } from '../../../../shared/components/ui/Button';
import SectionTitle from '../../../../shared/components/ui/SectionTitle';
import { useExpandableList } from '../../../../shared/hooks';

interface NewsProps {
  id?: string;
}

interface NewsItem {
  date: string;
  text: string;
  link?: string;
}

type Publication = {
  title: string;
  authors: string[];
  venue?: string;
  year?: number;
  link?: string;
};

const publications = publicationsData as Publication[];

const ITEMS_TO_SHOW = 15;

function computeNewsSortKey(date: string): number {
  const [yearStr, monthStr, dayStr] = date.split('-');
  const year = Number.parseInt(yearStr, 10) || 0;
  const month = monthStr ? Number.parseInt(monthStr, 10) || 0 : 0;
  const day = dayStr ? Number.parseInt(dayStr, 10) || 0 : 0;
  return year * 10000 + month * 100 + day;
}

function tidySpacing(value?: string): string {
  if (!value) {
    return '';
  }
  return value
    .replace(/\.\s*(?=[A-Z0-9])/g, '. ')
    .replace(/([A-Za-z0-9])\(/g, '$1 (')
    .replace(/\s+/g, ' ')
    .trim();
}

function trimTrailingPunctuation(value: string): string {
  return value.replace(/[.!]+$/u, '').trim();
}

const JOURNAL_KEYWORDS = ['journal', 'mdpi', 'transactions', 'magazine', 'letters'];
const CONFERENCE_KEYWORDS = [
  'acl',
  'naacl',
  'emnlp',
  'uist',
  'iui',
  'aaai',
  'poster',
  'posters',
  'demo',
  'demos',
  'findings',
  'conference',
  'symposium',
  'workshop',
];

function extractTitleAndContext(rawTitle: string): { mainTitle: string; contextParts: string[] } {
  const normalizedTitle = tidySpacing(rawTitle);
  if (!normalizedTitle) {
    return { mainTitle: 'Untitled work', contextParts: [] };
  }

  const segments = normalizedTitle
    .split('. ')
    .map((segment) => trimTrailingPunctuation(segment))
    .filter(Boolean);

  if (segments.length === 0) {
    return { mainTitle: trimTrailingPunctuation(normalizedTitle), contextParts: [] };
  }

  const [first, ...rest] = segments;
  return {
    mainTitle: trimTrailingPunctuation(first) || 'Untitled work',
    contextParts: rest.map((segment) => trimTrailingPunctuation(segment)).filter(Boolean),
  };
}

type PublicationStatusType = 'accepted' | 'published' | 'under_review' | 'in_progress' | 'preprint';

type PublicationStatus = {
  type: PublicationStatusType;
  detail?: string;
};

function splitContextSegments(parts: string[]): string[] {
  return parts
    .map((part) => tidySpacing(part))
    .filter(Boolean)
    .flatMap((part) => part.split(/&/g))
    .map((segment) => tidySpacing(segment))
    .filter(Boolean);
}

function classifyContextSegment(segment: string): PublicationStatus | null {
  const normalized = tidySpacing(segment);
  if (!normalized) {
    return null;
  }

  let detail = trimTrailingPunctuation(normalized);
  let type: PublicationStatusType | undefined;

  const parentheticalMatches = [...normalized.matchAll(/\(([^)]+)\)/g)];
  for (const match of parentheticalMatches) {
    const content = match[1].toLowerCase();
    if (!type) {
      if (content.includes('wip') || content.includes('in progress')) {
        type = 'in_progress';
      } else if (content.includes('under review')) {
        type = 'under_review';
      } else if (content.includes('preprint')) {
        type = 'preprint';
      }
    }
    detail = detail.replace(match[0], '').trim();
  }

  detail = trimTrailingPunctuation(detail);
  const lowerOriginal = normalized.toLowerCase();
  const lowerDetail = detail.toLowerCase();

  if (!type) {
    if (lowerOriginal.includes('preprint')) {
      type = 'preprint';
    } else if (lowerOriginal.includes('under review')) {
      type = 'under_review';
    } else if (lowerOriginal.includes('wip') || lowerOriginal.includes('in progress')) {
      type = 'in_progress';
    }
  }

  if (!type) {
    if (JOURNAL_KEYWORDS.some((keyword) => lowerDetail.includes(keyword))) {
      type = 'published';
    } else if (CONFERENCE_KEYWORDS.some((keyword) => lowerDetail.includes(keyword))) {
      type = 'accepted';
    }
  }

  if (!type) {
    type = 'published';
  }

  const cleanedDetail = tidySpacing(detail).replace(/\s+/g, ' ').trim();
  const finalDetail = trimTrailingPunctuation(cleanedDetail);

  return {
    type,
    detail: finalDetail ? finalDetail : undefined,
  };
}

function formatList(items: string[]): string {
  const uniqueItems = Array.from(new Set(items.map((item) => trimTrailingPunctuation(item)))).filter(Boolean);
  if (uniqueItems.length === 0) {
    return '';
  }
  if (uniqueItems.length === 1) {
    return uniqueItems[0];
  }
  if (uniqueItems.length === 2) {
    return `${uniqueItems[0]} and ${uniqueItems[1]}`;
  }
  const parts = [...uniqueItems];
  const last = parts.pop();
  return `${parts.join(', ')}, and ${last}`;
}

function joinPhrases(phrases: string[]): string {
  if (phrases.length === 1) {
    return phrases[0];
  }
  if (phrases.length === 2) {
    return `${phrases[0]} and ${phrases[1]}`;
  }
  const parts = [...phrases];
  const last = parts.pop();
  return `${parts.join(', ')}, and ${last}`;
}

function buildPublicationSummary(contexts: string[]): string | undefined {
  const segments = splitContextSegments(contexts);
  const statuses = segments
    .map((segment) => classifyContextSegment(segment))
    .filter((status): status is PublicationStatus => status !== null);

  if (statuses.length === 0) {
    return undefined;
  }

  const hasGenericUnderReview = statuses.some((status) => status.type === 'under_review' && !status.detail);

  if (hasGenericUnderReview) {
    statuses
      .filter((status) => status.type === 'accepted')
      .forEach((status) => {
        status.type = 'under_review';
      });
  }

  const filteredStatuses = statuses.filter((status) => status.type !== 'under_review' || status.detail);

  const accepted = filteredStatuses
    .filter((status) => status.type === 'accepted' && status.detail)
    .map((status) => status.detail as string);
  const published = filteredStatuses
    .filter((status) => status.type === 'published' && status.detail)
    .map((status) => status.detail as string);
  const underReview = filteredStatuses
    .filter((status) => status.type === 'under_review' && status.detail)
    .map((status) => status.detail as string);
  const inProgress = filteredStatuses
    .filter((status) => status.type === 'in_progress' && status.detail)
    .map((status) => status.detail as string);
  const hasPreprint = filteredStatuses.some((status) => status.type === 'preprint');

  const phrases: string[] = [];
  if (published.length) {
    phrases.push(`published in ${formatList(published)}`.trim());
  }
  if (accepted.length) {
    phrases.push(`accepted to ${formatList(accepted)}`.trim());
  }
  if (underReview.length) {
    phrases.push(`under review for ${formatList(underReview)}`.trim());
  }
  if (inProgress.length) {
    phrases.push(`in progress for ${formatList(inProgress)}`.trim());
  }
  if (hasPreprint) {
    phrases.push('available as a preprint');
  }

  if (phrases.length === 0) {
    if (hasGenericUnderReview) {
      return 'under review';
    }
    return undefined;
  }

  return joinPhrases(phrases);
}

function formatPublicationText(pub: Publication): string {
  const { mainTitle, contextParts } = extractTitleAndContext(pub.title);
  const contexts = [...contextParts];
  const venue = tidySpacing(pub.venue);
  if (venue) {
    contexts.push(venue);
  }

  const contextSummary = buildPublicationSummary(contexts);
  const baseTitle = tidySpacing(mainTitle) || 'Untitled work';

  if (contextSummary) {
    return `📄 Our paper ${baseTitle} is ${contextSummary}`;
  }

  return `📄 Our paper ${baseTitle} is out now`;
}

const PUBLICATION_DATE_BY_LINK: Record<string, string> = {
  'https://snuhcc.github.io/DICE-Bench/': '2025-07-27', // ACL 2025 main conference starts Jul 27 2025
  'https://www.researchgate.net/publication/386108841': '2023-05-15', // MDPI page lists Published: 15 May 2023
  'https://programs.sigchi.org/uist/2025/program/content/209380': '2025-09-28', // UIST 2025 runs Sep 28 – Oct 1
  'https://dl.acm.org/doi/10.1145/3708557.3716366': '2025-03-24', // IUI 2025 runs Mar 24 – 27 2025
  'https://arxiv.org/abs/2410.16848': '2025-02-27', // arXiv citation_online_date
  'https://aclanthology.org/2024.clinicalnlp-1.64': '2024-06-01', // ACL Anthology citation_publication_date 2024/6
  'https://doi.org/10.3390/rs15102584': '2023-05-15', // MDPI page lists Published: 15 May 2023
};

const PUBLICATION_DATE_BY_TITLE: Record<string, string> = {
  'ComPLUG: Efficient Multilingual Medical Reasoning via Compressed Pivot Language-guided Generation.AAAI 2025(Under Review).': 'Preprint',
  'OASIS: Enhancing Debate Quality and Mitigating Polarization through AI-Assisted Argumentation.UIST 2026': 'Preprint',
  'AltUs: Generating Alt Text to Improve E-Commerce Accessibility Through Blind and Low Vision User Participation.UIST 2026': 'Preprint',
};

function getPublicationDate(pub: Publication): { label: string; sortKey: number } {
  const rawDate = (pub.link && PUBLICATION_DATE_BY_LINK[pub.link]) ?? PUBLICATION_DATE_BY_TITLE[pub.title];

  if (!rawDate) {
    const year = pub.year ?? 0;
    const label = year > 0 ? `${year}` : 'Preprint';
    return {
      label,
      sortKey: computeNewsSortKey(label),
    };
  }

  const upper = rawDate.toUpperCase();
  if (upper === 'TBA' || upper === 'PREPRINT') {
    return { label: 'Preprint', sortKey: 0 };
  }

  const [year, month, day] = rawDate.split('-');
  const yearNum = Number.parseInt(year, 10) || 0;
  const monthNum = month ? Number.parseInt(month, 10) || 0 : 0;
  const dayNum = day ? Number.parseInt(day, 10) || 0 : 0;
  const label = month ? `${year}-${month}` : `${year}`;
  const sortKey = yearNum * 10000 + monthNum * 100 + dayNum;

  return { label, sortKey };
}

function getPublicationNewsItems(): Array<NewsItem & { sortKey: number }> {
  return publications.map((pub) => {
    const { label, sortKey } = getPublicationDate(pub);
    return {
      date: label,
      text: formatPublicationText(pub),
      link: pub.link,
      sortKey,
    };
  });
}

// Latest first (descending by date)
const STATIC_NEWS: Array<NewsItem & { sortKey: number }> = [
  // 2025-09
  {
    date: '2025-09',
    text: '🎓 Teaching Assistant at SNU: Data Structures and Algorithms, and AI Seminar',
    sortKey: computeNewsSortKey('2025-09'),
  },

  // 2025-06
  {
    date: '2025-06',
    text: '🏆 Awarded SKT AI Fellow Scholarship (Jun–Nov 2025)',
    sortKey: computeNewsSortKey('2025-06'),
  },
  {
    date: '2025-06',
    text: '🏆 Grand Prize (2nd Place) at AI Demo Competition',
    sortKey: computeNewsSortKey('2025-06'),
  },
  {
    date: '2025-06',
    text: '🎤 Invited Talk at SNU GSAI: Code Understanding Tool using React-Flow (Code Voyager)',
    sortKey: computeNewsSortKey('2025-06'),
  },

  // 2025-05
  {
    date: '2025-05',
    text: '🏅 Selected for SKT AI Fellowship',
    sortKey: computeNewsSortKey('2025-05'),
  },
  {
    date: '2025-05',
    text: '💼 Started as SKT AI Fellow at SK Telecom',
    sortKey: computeNewsSortKey('2025-05'),
  },

  // 2024-11, 2024-09, 2024-07, 2024-04
  {
    date: '2024-11',
    text: '🎤 Invited Talk at Naver Boostcamp: LLM Function Calling and Agent',
    sortKey: computeNewsSortKey('2024-11'),
  },
  {
    date: '2024-09',
    text: '🎓 Started PhD at SNU GSAI (SNUPI Lab)',
    sortKey: computeNewsSortKey('2024-09'),
  },
  {
    date: '2024-07',
    text: '🎓 AI Tech Teaching Assistant (Generation for NLP) at Naver Boostcamp / SSAFY',
    sortKey: computeNewsSortKey('2024-07'),
  },
  {
    date: '2024-04',
    text: '🥇 1st Prize (LG AImers / LG AI Hackathon)',
    sortKey: computeNewsSortKey('2024-04'),
  },

  // 2023-12, 2023-06
  {
    date: '2023-12',
    text: '🎓 Graduated from Purdue University (B.S. in Computer Science)',
    sortKey: computeNewsSortKey('2023-12'),
  },
  {
    date: '2023-12',
    text: "🏅 Dean's List (Aug 2021–Dec 2023)",
    sortKey: computeNewsSortKey('2023-12'),
  },
  {
    date: '2023-12',
    text: '🏅 Semester Honors (Jan 2021–Dec 2023)',
    sortKey: computeNewsSortKey('2023-12'),
  },
  {
    date: '2023-06',
    text: '💼 Started Software Engineering Internship at Samsung Electronics DX (MX)',
    sortKey: computeNewsSortKey('2023-06'),
  },
];

const NEWS_ITEMS: NewsItem[] = [...STATIC_NEWS, ...getPublicationNewsItems()]
  .sort((a, b) => b.sortKey - a.sortKey)
  .map(({ sortKey, ...item }) => item);

const News: React.FC<NewsProps> = ({ id }) => {
  const {
    showAll,
    handleToggle,
    getVisibleItems,
    hasMore,
    getItemAnimation,
    styles,
  } = useExpandableList<NewsItem>({ initialCount: ITEMS_TO_SHOW });

  const visibleItems = getVisibleItems(NEWS_ITEMS);

  return (
    <>
      <style>{styles}</style>
      <section className="bg-gradient-to-br from-white to-sky-50 py-8 md:py-12 lg:py-16" id={id}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-20">
        <Fade cascade damping={0.1} triggerOnce={true} direction="up">
          <SectionTitle>News</SectionTitle>
        </Fade>

        <Fade cascade damping={0.1} triggerOnce={true} direction="up">
          <div className="max-w-4xl mx-auto">
            <ul className="space-y-1">
              {visibleItems.map((item, index) => (
                <li
                  key={index}
                  className="flex flex-row items-center gap-2 sm:gap-4"
                  style={getItemAnimation(index)}
                >
                  <span className="text-sky-500 font-mono font-semibold min-w-[84px] sm:min-w-[90px] whitespace-nowrap">{item.date}</span>
                  <span className="font-mono text-gray-700 flex-1">
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
            {hasMore(NEWS_ITEMS) && (
              <button
                onClick={handleToggle}
                className="mt-6 mx-auto block px-6 py-2 text-sky-500 hover:text-sky-600 font-mono font-semibold border-2 border-sky-300 hover:border-sky-400 rounded-lg transition-colors duration-200"
              >
                {showAll ? 'Show Less ↑' : 'Show More ↓'}
              </button>
            )}

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

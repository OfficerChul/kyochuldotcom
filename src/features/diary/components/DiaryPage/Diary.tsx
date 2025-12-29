import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Fade } from 'react-awesome-reveal';
import { useDiaryParser } from '../../hooks';
import DiaryEntry from '../DiaryEntry';
import HeroSection from '../../../../shared/components/ui/HeroSection';
import SectionTitle from '../../../../shared/components/ui/SectionTitle';
import { FancyButtonSmall } from '../../../../shared/components/ui/Button';

// 일기 날짜와 제목 (제목은 암호화하지 않음)
const DIARY_ENTRIES_META = [
  { date: '25-12-29', title: 'Year End Reflections' },
  { date: '25-12-28', title: 'Lazy Saturday' },
  { date: '25-12-27', title: 'Back to Routine' },
  { date: '25-12-26', title: 'Boxing Day Adventures' },
  { date: '25-12-25', title: 'Christmas Morning Thoughts' },
  { date: '25-12-24', title: 'Eve of Something New' },
  { date: '25-12-23', title: 'Winter Reflections' },
  { date: '25-12-22', title: 'A Quiet Sunday' },
  { date: '25-12-21', title: 'First Day of Winter' },
  { date: '25-12-20', title: 'Friday Night Vibes' },
  { date: '25-12-19', title: 'Midweek Thoughts' },
  { date: '25-12-18', title: 'Coffee and Code' },
  { date: '25-12-17', title: 'Rainy Day Musings' },
  { date: '25-12-16', title: 'Monday Motivation' },
  { date: '25-12-15', title: 'Weekend Wrap-up' },
  { date: '25-12-14', title: 'Saturday Stroll' },
  { date: '25-12-13', title: 'Friday the 13th' },
  { date: '25-12-12', title: 'Twelve Twelve' },
  { date: '25-12-11', title: 'Midweek Check-in' },
  { date: '25-12-10', title: 'Ten Days to Go' },
  { date: '25-12-09', title: 'Tuesday Thoughts' },
  { date: '25-12-08', title: 'New Week Energy' },
  { date: '25-12-07', title: 'Lazy Sunday' },
  { date: '25-12-06', title: 'Saturday Plans' },
  { date: '25-12-05', title: 'End of Week' },
  { date: '25-12-04', title: 'December Beginnings' },
];

function formatDate(dateStr: string): string {
  const [yy, mm, dd] = dateStr.split('-').map(Number);
  const date = new Date(2000 + yy, mm - 1, dd);
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  return `${months[date.getMonth()]} ${dd}, 20${yy}`;
}

const Diary: React.FC = () => {
  const { isDecoded, entries, encodedContent, isLoading, error, attemptDecode } = useDiaryParser();

  const [expandedDates, setExpandedDates] = useState<Set<string>>(new Set());
  const [initialized, setInitialized] = useState(false);
  const [keyInput, setKeyInput] = useState('');
  const [keyError, setKeyError] = useState<string | null>(null);
  const [isDecoding, setIsDecoding] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const ENTRIES_PER_PAGE = 5;

  // 디코딩 후 모든 엔트리 펼치기
  useEffect(() => {
    if (isDecoded && entries.length > 0 && !initialized) {
      setExpandedDates(new Set(entries.map(e => e.date)));
      setInitialized(true);
    }
  }, [isDecoded, entries, initialized]);

  const toggleEntry = (date: string) => {
    setExpandedDates(prev => {
      const newSet = new Set(prev);
      if (newSet.has(date)) {
        newSet.delete(date);
      } else {
        newSet.add(date);
      }
      return newSet;
    });
  };

  const expandAll = () => {
    setExpandedDates(new Set(entries.map(e => e.date)));
  };

  const collapseAll = () => {
    setExpandedDates(new Set());
  };

  const handleDecode = async () => {
    if (!keyInput.trim()) {
      setKeyError('Enter key');
      return;
    }
    setIsDecoding(true);
    try {
      const result = await attemptDecode(keyInput);
      if (!result.success) {
        setKeyError('Invalid key');
      }
    } finally {
      setIsDecoding(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleDecode();
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-xl text-gray-400">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center">
        <p className="text-red-500 mb-4">Error: {error}</p>
        <Link to="/" className="text-sky-500 hover:underline">Go Home</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <HeroSection showAboutButton={false} currentPage="diary" secondLineText="My Diary :)" />

      <main className="px-6 md:px-12 lg:px-24 py-16 max-w-5xl mx-auto">
        {/* Title */}
        <Fade direction="up" triggerOnce>
          <SectionTitle className="mb-16">Diary</SectionTitle>
        </Fade>

        {/* Decode Key Input */}
        {!isDecoded && (
          <Fade direction="up" triggerOnce delay={100}>
            <div className="mb-12">
              <div className="inline-flex items-center">
                <input
                  type="password"
                  className="px-4 py-2.5 text-sm bg-transparent border-b-2 border-gray-300 focus:outline-none focus:border-sky-400 w-48 transition-colors placeholder-gray-400"
                  placeholder="Enter decode key"
                  value={keyInput}
                  onChange={(e) => {
                    setKeyInput(e.target.value);
                    setKeyError(null);
                  }}
                  onKeyDown={handleKeyDown}
                />
                <FancyButtonSmall
                  onClick={isDecoding ? undefined : handleDecode}
                  className={`ml-4 px-5 py-2.5 text-sm text-sky-500 font-mono stroke-sky-400 hover:stroke-sky-600 ${
                    isDecoding ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                  borderColor="rgba(56, 189, 248, 0.5)"
                  noSvgBorder={true}
                  shineColor={isDecoding ? '' : 'from-transparent via-sky-300/40 to-transparent'}
                  ariaLabel="Unlock diary"
                >
                  <i className="fa fa-unlock-alt"></i>
                  <span>{isDecoding ? 'Decoding...' : 'Unlock'}</span>
                </FancyButtonSmall>
              </div>
              {keyError && (
                <p className="text-sm text-red-400 mt-2">{keyError}</p>
              )}
            </div>
          </Fade>
        )}

        {!isDecoded ? (
          /* 암호화된 상태 */
          <>
            {DIARY_ENTRIES_META.slice((currentPage - 1) * ENTRIES_PER_PAGE, currentPage * ENTRIES_PER_PAGE).map((entry, idx) => (
              <article key={entry.date} className="py-4">
                {idx > 0 && <div className="w-16 h-0.5 bg-sky-200 mx-auto mb-4"></div>}
                <h3 className="text-xl font-medium text-gray-700 mb-1">
                  🔒 {entry.title}
                </h3>
                <p className="text-gray-400 text-xs mb-3">
                  {formatDate(entry.date)}
                </p>
                <p className="text-gray-400 text-xs font-mono leading-relaxed break-all">
                  {encodedContent.slice(idx * 200, idx * 200 + 200) || encodedContent.slice(0, 200)}
                </p>
              </article>
            ))}
            {Math.ceil(DIARY_ENTRIES_META.length / ENTRIES_PER_PAGE) > 1 && (
              <div className="flex justify-center gap-2 mt-8">
                {Array.from({ length: Math.ceil(DIARY_ENTRIES_META.length / ENTRIES_PER_PAGE) }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`group relative overflow-hidden w-9 h-9 rounded-full text-sm transition-colors ${
                      currentPage === page
                        ? 'bg-sky-500 text-white'
                        : 'text-sky-500 border border-sky-300 hover:bg-sky-50'
                    }`}
                  >
                    <span className="relative z-10">{page}</span>
                    <span className={`absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent to-transparent group-hover:translate-x-full transition-transform duration-500 ease-out ${
                      currentPage === page ? 'via-white/40' : 'via-sky-300/50'
                    }`} />
                  </button>
                ))}
              </div>
            )}
          </>
        ) : (
          <>
            {/* Controls */}
            <Fade direction="up" triggerOnce>
              <div className="flex justify-end gap-4 mb-4 text-xs">
                <button
                  onClick={expandAll}
                  className="text-gray-400 hover:text-sky-500 transition-colors"
                >
                  Expand All
                </button>
                <span className="text-gray-300">|</span>
                <button
                  onClick={collapseAll}
                  className="text-gray-400 hover:text-sky-500 transition-colors"
                >
                  Collapse All
                </button>
              </div>
            </Fade>

            {/* Diary Entries */}
            {entries.length === 0 ? (
              <p className="text-center text-gray-500 py-10">No diary entries found.</p>
            ) : (
              <>
                {entries.slice((currentPage - 1) * ENTRIES_PER_PAGE, currentPage * ENTRIES_PER_PAGE).map(entry => (
                  <DiaryEntry
                    key={entry.date}
                    entry={entry}
                    isExpanded={expandedDates.has(entry.date)}
                    onToggle={() => toggleEntry(entry.date)}
                  />
                ))}
                {Math.ceil(entries.length / ENTRIES_PER_PAGE) > 1 && (
                  <div className="flex justify-center gap-2 mt-8">
                    {Array.from({ length: Math.ceil(entries.length / ENTRIES_PER_PAGE) }, (_, i) => i + 1).map((page) => (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`group relative overflow-hidden w-9 h-9 rounded-full text-sm transition-colors ${
                          currentPage === page
                            ? 'bg-sky-500 text-white'
                            : 'text-sky-500 border border-sky-300 hover:bg-sky-50'
                        }`}
                      >
                        <span className="relative z-10">{page}</span>
                        <span className={`absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent to-transparent group-hover:translate-x-full transition-transform duration-500 ease-out ${
                          currentPage === page ? 'via-white/40' : 'via-sky-300/50'
                        }`} />
                      </button>
                    ))}
                  </div>
                )}
              </>
            )}
          </>
        )}
      </main>

      {/* Footer */}
      <Fade direction="up" triggerOnce>
        <footer className="border-t border-gray-200 py-8 mt-auto">
          <p className="text-center text-xs text-gray-400">
            © Copyright {new Date().getFullYear()} Kyochul Jang
          </p>
        </footer>
      </Fade>
    </div>
  );
};

export default Diary;

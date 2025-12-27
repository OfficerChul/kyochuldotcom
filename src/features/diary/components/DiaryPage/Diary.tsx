import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDiaryParser } from '../../hooks';
import DiaryEntry from '../DiaryEntry';
import HeroSection from '../../../../shared/components/ui/HeroSection';
import SectionTitle from '../../../../shared/components/ui/SectionTitle';

// 일기 날짜와 제목 (제목은 암호화하지 않음)
const DIARY_ENTRIES_META = [
  { date: '25-12-25', title: 'Christmas Morning Thoughts' },
  { date: '25-12-24', title: 'Eve of Something New' },
  { date: '25-12-23', title: 'Winter Reflections' },
  { date: '25-12-22', title: 'A Quiet Sunday' },
  { date: '25-12-21', title: 'First Day of Winter' },
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
        <SectionTitle className="mb-16">Diary</SectionTitle>

        {/* Decode Key Input */}
        {!isDecoded && (
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
              <button
                onClick={handleDecode}
                disabled={isDecoding}
                className="ml-4 px-5 py-2.5 text-sm text-sky-500 border border-sky-400 rounded-none hover:bg-sky-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isDecoding ? 'Decoding...' : 'Unlock'}
              </button>
            </div>
            {keyError && (
              <p className="text-sm text-red-400 mt-2">{keyError}</p>
            )}
          </div>
        )}

        {!isDecoded ? (
          /* 암호화된 상태 */
          <div>
            {DIARY_ENTRIES_META.map((entry, idx) => (
              <article key={idx} className="py-8 border-t border-gray-200 first:border-t-0">
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
          </div>
        ) : (
          <>
            {/* Controls */}
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

            {/* Diary Entries */}
            {entries.length === 0 ? (
              <p className="text-center text-gray-500 py-10">No diary entries found.</p>
            ) : (
              <div>
                {entries.map(entry => (
                  <DiaryEntry
                    key={entry.date}
                    entry={entry}
                    isExpanded={expandedDates.has(entry.date)}
                    onToggle={() => toggleEntry(entry.date)}
                  />
                ))}
              </div>
            )}
          </>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 py-8 mt-auto">
        <p className="text-center text-xs text-gray-400">
          © Copyright {new Date().getFullYear()} Kyochul Jang
        </p>
      </footer>
    </div>
  );
};

export default Diary;

import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useDiaryParser } from '../../hooks';
import DiaryEntry from '../DiaryEntry';
import Navigation from '../../../../shared/components/ui/Navigation';
import logo from '../../../../assets/images/logos/triangle-green.png';

// 일기 날짜들 (디코딩 전에도 보여줌)
const DIARY_DATES = ['25-12-25', '25-12-24', '25-12-23', '25-12-22'];

function formatDate(dateStr: string): string {
  const [yy, mm, dd] = dateStr.split('-').map(Number);
  const date = new Date(2000 + yy, mm - 1, dd);
  const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return `${months[date.getMonth()]} ${dd}, 20${yy} (${weekdays[date.getDay()]})`;
}

const Diary: React.FC = () => {
  const { isDecoded, entries, encodedContent, isLoading, error, attemptDecode } = useDiaryParser();

  const [expandedDates, setExpandedDates] = useState<Set<string>>(new Set());
  const [initialized, setInitialized] = useState(false);
  const [keyInput, setKeyInput] = useState('');
  const [keyError, setKeyError] = useState<string | null>(null);

  // 디코딩 후 모든 엔트리 펼치기
  useMemo(() => {
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

  const handleDecode = () => {
    if (!keyInput.trim()) {
      setKeyError('Enter key');
      return;
    }
    const result = attemptDecode(keyInput);
    if (!result.success) {
      setKeyError('Nope! Try again~');
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
        <div className="text-2xl font-mono text-sky-300 animate-pulse">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center">
        <p className="text-red-500 font-mono mb-4">Error: {error}</p>
        <Link to="/" className="text-sky-400 hover:text-sky-500 underline">Go Home</Link>
      </div>
    );
  }

  return (
    <>
      <Navigation />

      {/* Header */}
      <header className="pt-12 bg-gradient-to-b from-sky-100 to-white min-h-[25vh] relative flex items-center justify-center">
        <Link to="/">
          <img
            style={{ zIndex: 1000 }}
            className="absolute w-14 rounded-full right-5 top-4 outline-3 outline-transparent hover:brightness-125 hover:animate-[shake_3s_infinite] transition-all duration-500 ease-in-out"
            src={logo}
            alt="logo"
          />
        </Link>

        {/* Decode Key Input - 왼쪽 위 구석 */}
        {!isDecoded && (
          <div className="absolute left-8 top-14 flex flex-col gap-1">
            <p className="text-xs text-sky-400 font-mono italic">
              🔮 Can you guess the magic key?
            </p>
            <p className="text-[10px] text-gray-400 font-mono">
              (hint: only I know it hehe)
            </p>
            <div className="flex items-center gap-2 mt-1">
              <input
                type="password"
                className="px-3 py-1 text-xs border border-sky-200 rounded-full font-mono focus:outline-none focus:border-sky-400 w-28"
                placeholder="decode key"
                value={keyInput}
                onChange={(e) => {
                  setKeyInput(e.target.value);
                  setKeyError(null);
                }}
                onKeyDown={handleKeyDown}
              />
              <button
                onClick={handleDecode}
                className="px-3 py-1 text-xs bg-sky-400 text-white font-mono rounded-full hover:bg-sky-500 transition-colors"
              >
                Decode
              </button>
              {keyError && (
                <span className="text-xs text-red-400 font-mono">{keyError}</span>
              )}
            </div>
          </div>
        )}

        <div className="text-center">
          <h1 className="font-mono text-5xl sm:text-6xl md:text-7xl text-sky-400 font-extrabold mb-4">
            Diary
          </h1>
          <div className="w-20 h-1 bg-sky-300 mx-auto rounded-full"></div>
        </div>
      </header>

      {/* Main Content */}
      <section className="bg-white py-8 md:py-10 lg:py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-20 max-w-4xl">
          {!isDecoded ? (
            /* 인코딩된 상태 - 일기 형태로 보여주지만 내용은 암호화됨 */
            <div className="space-y-4">
              {DIARY_DATES.map((date, idx) => (
                <article
                  key={idx}
                  className="relative bg-white/80 backdrop-blur-sm rounded-md shadow-md border-2 border-sky-200 overflow-hidden"
                >
                  <header className="flex items-center justify-between p-3 md:p-4 bg-sky-50/50">
                    <div className="flex items-center gap-3">
                      <span className="text-xl">🔒</span>
                      <h3 className="text-sm md:text-base font-semibold text-gray-700 font-mono">
                        {formatDate(date)}
                      </h3>
                    </div>
                  </header>
                  <div className="px-4 pb-4 pt-2 border-t border-sky-100">
                    <p className="text-sm text-gray-400 font-mono leading-relaxed break-all">
                      {encodedContent.slice(idx * 80, idx * 80 + 80)}...
                    </p>
                  </div>
                </article>
              ))}
              <p className="text-center text-gray-400 font-mono text-sm mt-6">
                🔐 Unlock with the secret key to read my diary
              </p>
            </div>
          ) : (
            <>
              {/* Controls */}
              <div className="flex justify-end gap-3 mb-6">
                <button
                  onClick={expandAll}
                  className="px-4 py-2 text-sm font-mono text-sky-500 border-2 border-sky-300 rounded-full hover:bg-sky-50 transition-all"
                >
                  Expand All
                </button>
                <button
                  onClick={collapseAll}
                  className="px-4 py-2 text-sm font-mono text-sky-500 border-2 border-sky-300 rounded-full hover:bg-sky-50 transition-all"
                >
                  Collapse All
                </button>
              </div>

              {/* Diary Entries */}
              {entries.length === 0 ? (
                <p className="text-center text-gray-500 font-mono py-10">No diary entries found.</p>
              ) : (
                <div className="space-y-4">
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
        </div>
      </section>

      <style>{`
        @keyframes shake {
          0% { transform: translate(1px, 1px) rotate(0deg); }
          10% { transform: translate(-1px, -1px) rotate(1deg); }
          20% { transform: translate(-2px, 1px) rotate(-1deg); }
          30% { transform: translate(1px, 2px) rotate(0deg); }
          40% { transform: translate(-1px, 1px) rotate(1deg); }
          50% { transform: translate(1px, -1px) rotate(-2deg); }
          60% { transform: translate(2px, 1px) rotate(1deg); }
          70% { transform: translate(-1px, 2px) rotate(2deg); }
          80% { transform: translate(2px, -1px) rotate(1deg); }
          90% { transform: translate(-1px, 2px) rotate(0deg); }
          100% { transform: translate(2px, 1px) rotate(-1deg); }
        }
      `}</style>
    </>
  );
};

export default Diary;

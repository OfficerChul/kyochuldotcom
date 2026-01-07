import React from 'react';
import { DiaryEntry as DiaryEntryType } from '../../types';
import { estimateReadTime, formatDiaryDate } from '../../utils';

interface DiaryEntryProps {
  entry: DiaryEntryType;
  isSelected: boolean;
  onSelect: () => void;
}

const DiaryEntry: React.FC<DiaryEntryProps> = ({ entry, isSelected, onSelect }) => {
  const readTime = estimateReadTime(entry.content);
  const preview = entry.content.split('\n').find(line => line.trim()) || '';

  return (
    <button
      type="button"
      onClick={onSelect}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onSelect();
        }
      }}
      className={`w-full text-left p-5 rounded-2xl border transition-all cursor-pointer group focus:outline-none focus:ring-2 focus:ring-sky-200 ${
        isSelected
          ? 'bg-sky-50 border-sky-200 shadow-sm'
          : 'bg-white border-gray-100 hover:border-sky-200 hover:bg-sky-50/70'
      }`}
    >
      <header className="flex items-start justify-between gap-3">
        <div>
          <h2 className="text-lg font-medium text-gray-900 group-hover:text-sky-600">
            {entry.title || formatDiaryDate(entry.date)}
          </h2>
          <p className="text-gray-400 text-xs mt-1">
            {readTime} min read · {formatDiaryDate(entry.date)}
          </p>
        </div>
        <span
          className={`text-[10px] font-semibold uppercase tracking-[0.08em] rounded-full px-3 py-1 ${
            isSelected ? 'bg-sky-500 text-white' : 'bg-gray-100 text-gray-500'
          }`}
        >
          {isSelected ? 'Reading' : 'Open'}
        </span>
      </header>

      <p className="text-gray-600 text-sm leading-relaxed mt-3 line-clamp-2">
        {preview}
      </p>
    </button>
  );
};

export default DiaryEntry;

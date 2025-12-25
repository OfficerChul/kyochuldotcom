import React from 'react';
import { DiaryEntry as DiaryEntryType } from '../../types';

interface DiaryEntryProps {
  entry: DiaryEntryType;
  isExpanded: boolean;
  onToggle: () => void;
}

function formatDate(dateStr: string): string {
  const [yy, mm, dd] = dateStr.split('-').map(Number);
  const date = new Date(2000 + yy, mm - 1, dd);
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  return `${months[date.getMonth()]} ${dd}, 20${yy}`;
}

function getReadTime(content: string): number {
  const words = content.split(/\s+/).length;
  return Math.max(1, Math.ceil(words / 200));
}

const DiaryEntry: React.FC<DiaryEntryProps> = ({ entry, isExpanded, onToggle }) => {
  const readTime = getReadTime(entry.content);

  return (
    <article className="py-8 border-t border-gray-200 first:border-t-0">
      {/* Header - Clickable */}
      <header
        onClick={onToggle}
        className="cursor-pointer group"
      >
        {/* Title */}
        <h2 className="text-xl font-medium text-gray-900 underline decoration-1 underline-offset-4 decoration-gray-300 group-hover:text-sky-500 group-hover:decoration-sky-400 transition-colors mb-2">
          {entry.title || formatDate(entry.date)}
        </h2>

        {/* Preview text when collapsed */}
        {!isExpanded && (
          <p className="text-gray-600 text-sm leading-relaxed mb-3 line-clamp-3">
            {entry.content.split('\n')[0]}
          </p>
        )}

        {/* Meta info */}
        <p className="text-gray-400 text-xs">
          {readTime} min read · {formatDate(entry.date)}
        </p>
      </header>

      {/* Content */}
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isExpanded ? 'max-h-[5000px] opacity-100 mt-6' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="text-gray-700 leading-relaxed space-y-4">
          {entry.content.split('\n').map((line, i) => (
            <p key={i} className="text-sm">
              {line || '\u00A0'}
            </p>
          ))}
        </div>
      </div>
    </article>
  );
};

export default DiaryEntry;

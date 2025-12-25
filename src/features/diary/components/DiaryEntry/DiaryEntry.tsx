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
  const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  return `${months[date.getMonth()]} ${dd}, 20${yy} (${weekdays[date.getDay()]})`;
}

const DiaryEntry: React.FC<DiaryEntryProps> = ({ entry, isExpanded, onToggle }) => {
  return (
    <article className="relative bg-white/80 backdrop-blur-sm rounded-md shadow-md border-2 border-sky-200 transform transition-all duration-500 hover:scale-[1.01] hover:shadow-2xl hover:border-sky-500 overflow-hidden">
      {/* Header - Clickable */}
      <header
        onClick={onToggle}
        className="flex items-center justify-between p-3 md:p-4 cursor-pointer select-none hover:bg-sky-50/50 transition-colors"
      >
        <div className="flex items-center gap-3">
          <span className="text-xl">{isExpanded ? '📖' : '📕'}</span>
          <h3 className="text-sm md:text-base font-semibold text-gray-900 font-mono">
            {formatDate(entry.date)}
          </h3>
        </div>
        <span
          className={`text-sky-400 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}
        >
          ▼
        </span>
      </header>

      {/* Content */}
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isExpanded ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-4 pb-4 pt-2 border-t border-sky-100">
          {entry.content.split('\n').map((line, i) => (
            <p key={i} className="text-sm md:text-base text-gray-700 font-mono leading-relaxed my-1">
              {line || '\u00A0'}
            </p>
          ))}
        </div>
      </div>
    </article>
  );
};

export default DiaryEntry;

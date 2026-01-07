import React from 'react';
import { DiaryEntry } from '../../types';
import { estimateReadTime, formatDiaryDate } from '../../utils';

interface DiaryEntryDetailProps {
  entry: DiaryEntry | null;
}

const DiaryEntryDetail: React.FC<DiaryEntryDetailProps> = ({ entry }) => {
  if (!entry) {
    return (
      <article className="bg-white border border-dashed border-gray-200 rounded-2xl p-10 flex items-center justify-center text-sm text-gray-400">
        Select a diary entry to read the full story.
      </article>
    );
  }

  const readTime = estimateReadTime(entry.content);

  return (
    <article className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 md:p-10">
      <p className="text-xs text-gray-400 mb-2">
        {formatDiaryDate(entry.date)} · {readTime} min read
      </p>
      <h1 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-6 leading-tight">
        {entry.title || formatDiaryDate(entry.date)}
      </h1>
      <div className="space-y-4 text-gray-700 leading-relaxed">
        {entry.content.split('\n').map((line, index) => (
          <p key={index} className="text-sm md:text-base">
            {line || '\u00A0'}
          </p>
        ))}
      </div>
    </article>
  );
};

export default DiaryEntryDetail;

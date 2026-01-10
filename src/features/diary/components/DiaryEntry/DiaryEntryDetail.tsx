import React from 'react';
import { DiaryEntry } from '../../types';

interface DiaryEntryDetailProps {
  entry: DiaryEntry | null;
}

const DiaryEntryDetail: React.FC<DiaryEntryDetailProps> = ({ entry }) => {
  if (!entry) {
    return <p className="text-sm text-gray-400">Select a diary entry to read the full story.</p>;
  }

  return (
    <article className="space-y-4 text-gray-700 leading-relaxed">
      {entry.content.split('\n').map((line, index) => (
        <p key={index} className="text-sm md:text-base">
          {line || '\u00A0'}
        </p>
      ))}
    </article>
  );
};

export default DiaryEntryDetail;

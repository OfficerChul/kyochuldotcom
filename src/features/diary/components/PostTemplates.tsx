import React from 'react';
import { Fade } from 'react-awesome-reveal';

export interface PostListItem {
  id: string;
  title: string;
  dateLabel: string;
  description?: React.ReactNode;
  badges?: React.ReactNode;
  locked?: boolean;
  onSelect: () => void;
}

interface PostListProps {
  items: PostListItem[];
  footer?: React.ReactNode;
}

export const PostList: React.FC<PostListProps> = ({ items, footer }) => (
  <div className="space-y-6">
    {items.map((item, idx) => (
      <button
        key={item.id}
        type="button"
        onClick={item.onSelect}
        className="w-full text-left py-4 group focus:outline-none"
      >
        {idx > 0 && <div className="w-16 h-0.5 bg-sky-200 mx-auto mb-4"></div>}
        <h3 className="text-xl font-medium text-gray-700 mb-1 group-hover:text-sky-600">
          {item.title}
        </h3>
        <p className="text-gray-400 text-xs mb-3">{item.dateLabel}</p>
        {item.description ? <div className="text-left">{item.description}</div> : null}
        {item.badges ? <div className="mt-3">{item.badges}</div> : null}
      </button>
    ))}
    {footer}
  </div>
);

interface NavAction {
  label: string;
  onClick: () => void;
  disabled?: boolean;
}

interface PostDetailLayoutProps {
  decodeControls?: React.ReactNode;
  dateLabel?: string;
  title: string;
  prev?: NavAction | null;
  next?: NavAction | null;
  onBack: () => void;
  backLabel?: string;
  children: React.ReactNode;
}

export const PostDetailLayout: React.FC<PostDetailLayoutProps> = ({
  decodeControls,
  dateLabel,
  title,
  prev,
  next,
  onBack,
  backLabel = '← Back to list',
  children
}) => (
  <>
    <div className="flex flex-col gap-3 md:gap-4">
      <div className="flex flex-wrap items-center justify-between gap-3 text-sm text-gray-500 w-full py-2">
        <button onClick={onBack} className="inline-flex items-center gap-2 text-sky-500 hover:text-sky-600 font-medium">
          <span>{backLabel}</span>
        </button>
        {decodeControls ? <div className="flex-1 flex justify-end pt-1 md:pt-0">{decodeControls}</div> : null}
      </div>
    </div>

    <Fade direction="up" triggerOnce>
      <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-10 md:p-12 space-y-4">
        {dateLabel ? <p className="text-xs text-gray-400 mb-2">{dateLabel}</p> : null}
        <h1 className="text-2xl font-semibold text-gray-900">{title}</h1>
        {children}
      </div>
    </Fade>

    <div className="mt-6 py-2 flex items-center justify-between gap-3 text-sm text-gray-500 w-full">
      <button
        type="button"
        disabled={!prev || prev.disabled}
        onClick={prev ? prev.onClick : undefined}
        className={`inline-flex items-center gap-2 px-3 py-2 rounded-full border ${
          prev && !prev.disabled
            ? 'text-sky-600 border-sky-200 hover:bg-sky-50'
            : 'text-gray-300 border-gray-200 cursor-not-allowed'
        }`}
      >
        <span aria-hidden="true">←</span>
        <span>{prev?.label ?? 'Previous'}</span>
      </button>
      <div className="flex-1 flex justify-end">
        <button
          type="button"
          disabled={!next || next.disabled}
          onClick={next ? next.onClick : undefined}
          className={`inline-flex items-center gap-2 px-3 py-2 rounded-full border ${
            next && !next.disabled
              ? 'text-sky-600 border-sky-200 hover:bg-sky-50'
              : 'text-gray-300 border-gray-200 cursor-not-allowed'
          }`}
        >
          <span>{next?.label ?? 'Next'}</span>
          <span aria-hidden="true">→</span>
        </button>
      </div>
    </div>
  </>
);

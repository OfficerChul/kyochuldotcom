import React from 'react';
import { Fade } from 'react-awesome-reveal';

export interface PostListItem {
  id: string;
  title: string;
  summary?: React.ReactNode;
  meta?: React.ReactNode;
  subMeta?: React.ReactNode;
  locked?: boolean;
  onSelect: () => void;
}

interface PostListProps {
  items: PostListItem[];
  footer?: React.ReactNode;
}

export const PostList: React.FC<PostListProps> = ({ items, footer }) => (
  <div className="space-y-8">
    {items.map((item, idx) => {
      const hasBorder = idx > 0;
      return (
        <div key={item.id}>
          {hasBorder ? <div className="border-t border-gray-200 mb-6" /> : null}
          <button
            type="button"
            onClick={item.onSelect}
            className="w-full text-left group focus:outline-none"
          >
            <h3 className="text-2xl font-semibold text-gray-900 mb-3 group-hover:text-sky-600 transition-colors">
              {item.title}
            </h3>
            {item.summary ? (
              <div className="text-gray-600 text-base leading-relaxed mb-4">{item.summary}</div>
            ) : null}
            {item.meta ? <p className="text-sm text-gray-400 mb-1">{item.meta}</p> : null}
            {item.subMeta ? <div className="text-sm text-gray-400 mt-4">{item.subMeta}</div> : null}
          </button>
        </div>
      );
    })}
    {footer ? <div className="pt-4">{footer}</div> : null}
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

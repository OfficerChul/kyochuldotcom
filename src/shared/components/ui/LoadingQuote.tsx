import React, { useMemo } from 'react';
import { getRandomQuote } from '../../data/loadingQuotes';

interface LoadingQuoteProps {
  className?: string;
  spinnerClassName?: string;
  quoteClassName?: string;
  authorClassName?: string;
}

const LoadingQuote: React.FC<LoadingQuoteProps> = ({
  className = '',
  spinnerClassName = '',
  quoteClassName = '',
  authorClassName = ''
}) => {
  const quote = useMemo(() => getRandomQuote(), []);
  const spinnerClasses = spinnerClassName || 'border-b-2 border-gray-600';
  const quoteClasses = quoteClassName || 'text-gray-700';
  const authorClasses = authorClassName || 'text-gray-500';

  return (
    <div className={`flex items-center justify-center ${className}`}>
      <div className="text-center px-8 max-w-md">
        <div
          className={`animate-spin rounded-full h-10 w-10 mx-auto mb-6 ${spinnerClasses}`}
        />
        <p className={`italic text-lg leading-relaxed ${quoteClasses}`}>"{quote.quote}"</p>
        <p className={`mt-3 text-sm ${authorClasses}`}>- {quote.author}</p>
      </div>
    </div>
  );
};

export default LoadingQuote;

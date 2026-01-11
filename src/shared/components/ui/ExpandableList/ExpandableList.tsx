import { useState, ReactNode } from 'react';

interface ExpandableListProps<T> {
  items: T[];
  initialCount: number;
  renderItem: (item: T, index: number, isExpanded: boolean, isAnimating: boolean) => ReactNode;
  className?: string;
  listClassName?: string;
  showMoreText?: string;
  showLessText?: string;
}

const ExpandableList = <T,>({
  items,
  initialCount,
  renderItem,
  className = '',
  listClassName = '',
  showMoreText = 'Show More',
  showLessText = 'Show Less',
}: ExpandableListProps<T>) => {
  const [showAll, setShowAll] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleToggle = () => {
    if (!showAll) {
      setShowAll(true);
    } else {
      setIsAnimating(true);
      setTimeout(() => {
        setShowAll(false);
        setIsAnimating(false);
      }, 600);
    }
  };

  const hasMore = items.length > initialCount;
  const visibleItems = showAll || isAnimating ? items : items.slice(0, initialCount);

  return (
    <div className={className}>
      <style>{`
        @keyframes expandableSlideDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes expandableSlideUp {
          from {
            opacity: 1;
            transform: translateY(0);
          }
          to {
            opacity: 0;
            transform: translateY(-20px);
          }
        }
      `}</style>

      <div className={listClassName}>
        {visibleItems.map((item, index) => {
          const isExpandedItem = index >= initialCount;
          const animation =
            showAll && !isAnimating && isExpandedItem
              ? 'expandableSlideDown 0.3s ease-out forwards'
              : isAnimating && isExpandedItem
                ? 'expandableSlideUp 0.3s ease-out forwards'
                : undefined;

          const animationDelay = isExpandedItem ? `${(index - initialCount) * 0.1}s` : undefined;

          return (
            <div key={index} style={{ animation, animationDelay }}>
              {renderItem(item, index, showAll, isAnimating)}
            </div>
          );
        })}
      </div>

      {hasMore && (
        <button
          onClick={handleToggle}
          className="mt-6 mx-auto block px-6 py-2 text-sky-500 hover:text-sky-600 font-mono font-semibold border-2 border-sky-300 hover:border-sky-400 rounded-lg transition-colors duration-200"
        >
          {showAll ? `${showLessText} ↑` : `${showMoreText} ↓`}
        </button>
      )}
    </div>
  );
};

export default ExpandableList;

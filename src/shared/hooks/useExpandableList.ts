import { useState, useCallback, CSSProperties } from 'react';

interface UseExpandableListOptions {
  initialCount: number;
  animationDuration?: number;
}

interface UseExpandableListReturn<T> {
  showAll: boolean;
  isAnimating: boolean;
  handleToggle: () => void;
  getVisibleItems: (items: T[]) => T[];
  hasMore: (items: T[]) => boolean;
  getItemAnimation: (index: number) => CSSProperties | undefined;
  styles: string;
}

export function useExpandableList<T>({
  initialCount,
  animationDuration = 600,
}: UseExpandableListOptions): UseExpandableListReturn<T> {
  const [showAll, setShowAll] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleToggle = useCallback(() => {
    if (!showAll) {
      setShowAll(true);
    } else {
      setIsAnimating(true);
      setTimeout(() => {
        setShowAll(false);
        setIsAnimating(false);
      }, animationDuration);
    }
  }, [showAll, animationDuration]);

  const getVisibleItems = useCallback(
    (items: T[]): T[] => {
      if (showAll || isAnimating) {
        return items;
      }
      return items.slice(0, initialCount);
    },
    [showAll, isAnimating, initialCount]
  );

  const hasMore = useCallback(
    (items: T[]): boolean => items.length > initialCount,
    [initialCount]
  );

  const getItemAnimation = useCallback(
    (index: number): CSSProperties | undefined => {
      if (index < initialCount) {
        return undefined;
      }

      const animation =
        showAll && !isAnimating
          ? 'expandableSlideDown 0.3s ease-out forwards'
          : isAnimating
          ? 'expandableSlideUp 0.3s ease-out forwards'
          : undefined;

      const animationDelay = `${(index - initialCount) * 0.1}s`;

      return animation ? { animation, animationDelay } : undefined;
    },
    [showAll, isAnimating, initialCount]
  );

  const styles = `
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
  `;

  return {
    showAll,
    isAnimating,
    handleToggle,
    getVisibleItems,
    hasMore,
    getItemAnimation,
    styles,
  };
}

export default useExpandableList;

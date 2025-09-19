import React, { useState } from 'react';
import { useLazyLoad } from '../../hooks/useLazyLoad';

interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
  placeholderClass?: string;
}

const LazyImage: React.FC<LazyImageProps> = ({
  src,
  alt,
  className = '',
  placeholderClass = 'bg-gray-200 animate-pulse'
}) => {
  const { ref, isIntersecting } = useLazyLoad();
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div ref={ref as React.RefObject<HTMLDivElement>} className="relative">
      {!isLoaded && (
        <div className={`absolute inset-0 ${placeholderClass}`} />
      )}
      {isIntersecting && (
        <img
          src={src}
          alt={alt}
          className={`${className} ${!isLoaded ? 'opacity-0' : 'opacity-100'} transition-opacity duration-500`}
          onLoad={() => setIsLoaded(true)}
        />
      )}
    </div>
  );
};

export default LazyImage;
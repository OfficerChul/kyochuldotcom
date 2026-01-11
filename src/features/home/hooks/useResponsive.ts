import { useEffect, useState } from 'react';

const getIsMobile = () => (typeof window !== 'undefined' ? window.innerWidth < 640 : false);

export const useResponsive = () => {
  const [isMobile, setIsMobile] = useState<boolean>(getIsMobile);

  useEffect(() => {
    const handleResize = () => setIsMobile(getIsMobile());
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return { isMobile };
};

import React, { useEffect, useRef, lazy, Suspense, useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import logo from '../../../../assets/images/logos/triangle-skyblue.png';
import Navigation from '../../../../shared/components/ui/Navigation';
import './animations.css';

const SocialLinks = lazy(() => import('../SocialLinks'));

const Main: React.FC = () => {
  const searchInputRef = useRef<HTMLInputElement>(null);
  const [logoLoaded, setLogoLoaded] = useState(false);
  const [supportsWebP, setSupportsWebP] = useState(false);

  // Check WebP support
  useEffect(() => {
    const webP = new Image();
    webP.onload = webP.onerror = () => {
      setSupportsWebP(webP.height === 2);
    };
    webP.src = 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
  }, []);

  // Auto-focus search bar on mount
  useEffect(() => {
    searchInputRef.current?.focus();
  }, []);

  return (
    <div className="bg-[#c9ebf5] min-h-screen">
      <Navigation />

      <main className="mt-20">
        {/* Logo Section with Progressive Loading */}
        <div className="text-center relative">
          {!logoLoaded && (
            <div className="mx-auto mt-5 h-52 md:h-60 bg-gradient-to-br from-blue-200 to-cyan-200 rounded-full animate-pulse"
                 style={{ width: '208px', height: '208px' }} />
          )}
          <picture>
            {supportsWebP && (
              <source srcSet="/logo-optimized.webp" type="image/webp" />
            )}
            <source srcSet="/logo-optimized.png" type="image/png" />
            <img
              className={`mx-auto mt-5 h-52 md:h-60 hover:animate-[shake_3s_infinite] transition-opacity duration-300 ${
                logoLoaded ? 'opacity-100' : 'opacity-0 absolute top-0 left-1/2 -translate-x-1/2'
              }`}
              src={logo}
              alt="Kyochul Portfolio Logo"
              id="main-logo"
              loading="eager"
              onLoad={() => setLogoLoaded(true)}
              fetchPriority="high"
            />
          </picture>
        </div>

        {/* Search Bar Section */}
        <section className="mt-8" aria-label="Google Search">
          <form action="https://www.google.com/search" method="GET">
            <div className="w-full flex items-center justify-center">
              <div className="relative w-3/4 md:w-1/2 lg:w-2/5">
                <label htmlFor="search-bar" className="sr-only">
                  Search Google or type a URL
                </label>
                <FaSearch
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  aria-hidden="true"
                />
                <input
                  ref={searchInputRef}
                  id="search-bar"
                  name="q"
                  type="text"
                  className="shadow-lg border-none w-full rounded-full h-10 pl-10 pr-4 outline-none focus:ring-2 focus:ring-blue-400 transition-all"
                  placeholder="Search Google or type a URL"
                  aria-label="Search Google"
                  autoComplete="off"
                />
              </div>
            </div>
          </form>
        </section>

        {/* Social Links Section with Lazy Loading */}
        <div className="mt-8">
          <Suspense fallback={
            <div className="flex justify-center">
              <div className="animate-pulse flex space-x-4">
                <div className="rounded-full bg-gray-300 h-16 w-16"></div>
                <div className="rounded-full bg-gray-300 h-16 w-16"></div>
                <div className="rounded-full bg-gray-300 h-16 w-16"></div>
              </div>
            </div>
          }>
            <SocialLinks />
          </Suspense>
        </div>
      </main>
    </div>
  );
};

export default Main;
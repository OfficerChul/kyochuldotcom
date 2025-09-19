import React, { useEffect, useRef } from 'react';
import { FaSearch } from 'react-icons/fa';
import logo from '../../../../assets/images/logos/triangle-skyblue.png';
import SocialLinks from '../SocialLinks';
import Navigation from '../../../../shared/components/ui/Navigation';
import './animations.css';

const Main: React.FC = () => {
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Auto-focus search bar on mount
  useEffect(() => {
    searchInputRef.current?.focus();
  }, []);

  return (
    <div className="bg-[#c9ebf5] min-h-screen">
      <Navigation />

      <main className="mt-20">
        {/* Logo Section */}
        <div className="text-center">
          <img
            className="mx-auto mt-5 h-52 md:h-60 hover:animate-[shake_3s_infinite]"
            src={logo}
            alt="Kyochul Portfolio Logo"
            id="main-logo"
            loading="eager"
          />
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

        {/* Social Links Section */}
        <div className="mt-8">
          <SocialLinks />
        </div>
      </main>
    </div>
  );
};

export default Main;
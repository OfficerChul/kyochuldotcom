import React from 'react';
import { FaSearch } from 'react-icons/fa';

interface HomeSearchBarProps {
  searchInputRef: React.RefObject<HTMLInputElement | null>;
  isMobile: boolean;
}

const HomeSearchBar: React.FC<HomeSearchBarProps> = ({ searchInputRef, isMobile }) => {
  return (
    <section className="mt-4 sm:mt-8 pointer-events-auto" aria-label="Google Search">
      <form action="https://www.google.com/search" method="GET">
        <div className="w-full flex items-center justify-center">
          <div className="relative w-4/5 md:w-[440px] lg:w-[500px] xl:w-[560px]">
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
              placeholder={isMobile ? 'Search Google' : 'Search Google or type a URL'}
              aria-label="Search Google"
              autoComplete="off"
            />
          </div>
        </div>
      </form>
    </section>
  );
};

export default HomeSearchBar;

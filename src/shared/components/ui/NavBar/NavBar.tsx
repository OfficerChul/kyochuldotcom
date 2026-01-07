import React, { useState } from 'react';
import { Link } from 'react-router-dom';

type NavPage = 'home' | 'about' | 'publications' | 'blog';

interface NavBarProps {
  variant?: 'light' | 'dark';
  currentPage?: NavPage;
}

const NavBar: React.FC<NavBarProps> = ({ variant = 'light', currentPage }) => {
  const [isOpen, setIsOpen] = useState(false);

  const baseClass = variant === 'dark'
    ? 'text-white/80 hover:text-white drop-shadow-md'
    : 'text-gray-500 hover:text-sky-500';

  const activeClass = variant === 'dark'
    ? 'text-white drop-shadow-md'
    : 'text-sky-500';

  const burgerColor = variant === 'dark' ? 'bg-white' : 'bg-gray-600';
  const menuBg = variant === 'dark'
    ? 'bg-gray-900/95 backdrop-blur-sm'
    : 'bg-white/95 backdrop-blur-sm';

  const navLinks = (
    <>
      <Link
        to="/"
        className={`transition-colors ${currentPage === 'home' ? activeClass : baseClass}`}
        onClick={() => setIsOpen(false)}
      >
        home
      </Link>
      <Link
        to="/portfolio"
        className={`transition-colors ${currentPage === 'about' ? activeClass : baseClass}`}
        onClick={() => setIsOpen(false)}
      >
        portfolio
      </Link>
      <Link
        to="/blog"
        className={`transition-colors ${currentPage === 'blog' ? activeClass : baseClass}`}
        onClick={() => setIsOpen(false)}
      >
        blog
      </Link>
      <a
        href="https://scholar.google.com/citations?user=N8R4s1kAAAAJ&hl=ko&oi=ao"
        target="_blank"
        rel="noopener noreferrer"
        className={`transition-colors ${currentPage === 'publications' ? activeClass : baseClass}`}
        onClick={() => setIsOpen(false)}
      >
        publications
      </a>
    </>
  );

  return (
    <nav className="relative">
      {/* Desktop navigation */}
      <div className="hidden md:flex justify-end items-center gap-6 py-5 pr-6 lg:pr-10 text-sm">
        {navLinks}
      </div>

      {/* Mobile hamburger button */}
      <button
        className="md:hidden flex flex-col justify-center items-center gap-1.5 p-4"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle menu"
      >
        <span className={`block w-5 h-0.5 ${burgerColor} transition-transform ${isOpen ? 'rotate-45 translate-y-2' : ''}`} />
        <span className={`block w-5 h-0.5 ${burgerColor} transition-opacity ${isOpen ? 'opacity-0' : ''}`} />
        <span className={`block w-5 h-0.5 ${burgerColor} transition-transform ${isOpen ? '-rotate-45 -translate-y-2' : ''}`} />
      </button>

      {/* Mobile menu dropdown */}
      {isOpen && (
        <div className={`md:hidden absolute top-full right-0 ${menuBg} rounded-lg shadow-lg py-3 px-5 flex flex-col gap-3 text-sm min-w-[140px]`}>
          {navLinks}
        </div>
      )}
    </nav>
  );
};

export default NavBar;

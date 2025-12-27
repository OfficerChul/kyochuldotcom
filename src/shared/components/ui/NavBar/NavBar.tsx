import React from 'react';
import { Link } from 'react-router-dom';

type NavPage = 'home' | 'about' | 'publications' | 'diary';

interface NavBarProps {
  variant?: 'light' | 'dark';
  currentPage?: NavPage;
}

const NavBar: React.FC<NavBarProps> = ({ variant = 'light', currentPage }) => {
  const baseClass = variant === 'dark'
    ? 'text-white/80 hover:text-white drop-shadow-md'
    : 'text-gray-500 hover:text-sky-500';

  const activeClass = variant === 'dark'
    ? 'text-white drop-shadow-md'
    : 'text-sky-500';

  return (
    <nav className="flex justify-end items-center gap-6 py-5 pr-4 md:pr-6 lg:pr-10 text-sm">
      <Link
        to="/"
        className={`transition-colors ${currentPage === 'home' ? activeClass : baseClass}`}
      >
        home
      </Link>
      <Link
        to="/portfolio#about1"
        className={`transition-colors ${currentPage === 'about' ? activeClass : baseClass}`}
      >
        about
      </Link>
      <Link
        to="/diary"
        className={`transition-colors ${currentPage === 'diary' ? activeClass : baseClass}`}
      >
        diary
      </Link>
      <a
        href="https://scholar.google.com/citations?user=N8R4s1kAAAAJ&hl=ko&oi=ao"
        target="_blank"
        rel="noopener noreferrer"
        className={`transition-colors ${currentPage === 'publications' ? activeClass : baseClass}`}
      >
        publications
      </a>
    </nav>
  );
};

export default NavBar;

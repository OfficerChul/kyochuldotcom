import React from 'react';
import { ProjectsBtnProps } from '../../types';

const ProjectsBtn: React.FC<ProjectsBtnProps> = ({ ghUrl }) => {
  return (
    <a
      href={ghUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative inline-flex items-center justify-center w-10 h-10 bg-gradient-to-br from-purple-600 to-purple-800 text-white rounded-xl shadow-md hover:shadow-2xl hover:from-purple-700 hover:to-purple-900 transition-all duration-500 hover:-translate-y-1 hover:scale-110 overflow-hidden"
      aria-label="View project on GitHub"
    >
      <span className="absolute inset-0 w-full h-full bg-gradient-to-br from-purple-400 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
      <span className="absolute inset-0 w-full h-full bg-white opacity-0 group-hover:opacity-20 group-hover:animate-pulse transition-opacity duration-500"></span>
      <svg
        className="relative z-10 w-5 h-5 group-hover:scale-125 group-hover:rotate-[360deg] transition-all duration-700 ease-out"
        viewBox="0 0 24 24"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M12 0.297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
      </svg>
    </a>
  );
};

export default ProjectsBtn;
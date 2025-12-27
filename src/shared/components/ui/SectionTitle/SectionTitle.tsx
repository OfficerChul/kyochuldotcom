import React from 'react';

interface SectionTitleProps {
  children: React.ReactNode;
  className?: string;
}

const SectionTitle: React.FC<SectionTitleProps> = ({ children, className = '' }) => {
  return (
    <div className={`text-center mb-12 ${className}`}>
      <h2 className="font-mono text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-sky-300 font-extrabold mb-4">
        {children}
      </h2>
      <div className="w-20 h-1 bg-sky-300 mx-auto rounded-full"></div>
    </div>
  );
};

export default SectionTitle;

import React, { ReactNode } from 'react';
import { Fade } from 'react-awesome-reveal';
import SectionTitle from '../SectionTitle';

type BackgroundVariant = 'white' | 'gray' | 'gradient' | 'gradient-reverse';

interface SectionWrapperProps {
  id?: string;
  title: string;
  children: ReactNode;
  background?: BackgroundVariant;
  className?: string;
  containerClassName?: string;
  subtitle?: ReactNode;
  animateTitle?: boolean;
  animateContent?: boolean;
}

const backgroundClasses: Record<BackgroundVariant, string> = {
  white: 'bg-white',
  gray: 'bg-gray-50',
  gradient: 'bg-gradient-to-br from-gray-50 to-sky-50',
  'gradient-reverse': 'bg-gradient-to-br from-white to-sky-50',
};

const SectionWrapper: React.FC<SectionWrapperProps> = ({
  id,
  title,
  children,
  background = 'white',
  className = '',
  containerClassName = '',
  subtitle,
  animateTitle = true,
  animateContent = true,
}) => {
  const bgClass = backgroundClasses[background];

  const titleContent = (
    <>
      <SectionTitle>{title}</SectionTitle>
      {subtitle && (
        <div className="text-gray-600 text-base sm:text-lg max-w-2xl mx-auto px-4 sm:px-0 text-center -mt-8 mb-12">
          {subtitle}
        </div>
      )}
    </>
  );

  return (
    <section
      id={id}
      className={`py-12 md:py-16 lg:py-20 ${bgClass} ${className}`}
    >
      <div className={`container mx-auto px-4 sm:px-6 lg:px-20 ${containerClassName}`}>
        {animateTitle ? (
          <Fade cascade damping={0.1} triggerOnce direction="up">
            {titleContent}
          </Fade>
        ) : (
          titleContent
        )}

        {animateContent ? (
          <Fade cascade damping={0.1} triggerOnce direction="up">
            {children}
          </Fade>
        ) : (
          children
        )}
      </div>
    </section>
  );
};

export default SectionWrapper;

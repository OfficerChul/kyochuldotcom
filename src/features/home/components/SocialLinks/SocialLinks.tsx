import React, { useState, useEffect, useRef, lazy, Suspense } from 'react';
import Modal from 'react-modal';
import { FaStar, FaLinkedinIn, FaInstagram, FaGithub, FaEnvelope, FaBook } from 'react-icons/fa';
import LoadingQuote from '../../../../shared/components/ui/LoadingQuote';
import SocialLinkButton from './SocialLinkButton';
import './animations.css';

// Lazy load PDFViewer for code splitting
const PDFViewer = lazy(() => import('./PDFViewer'));

interface ModalStyles {
  overlay: React.CSSProperties;
  content: React.CSSProperties;
}

interface SocialLinksProps {
  variant?: 'light' | 'dark';
}

type LinkConfig = {
  key: string;
  label: string;
  sonarColor: string;
  ariaLabel: string;
  renderIcon: () => React.ReactNode;
  to?: string;
  href?: string;
  onClick?: () => void;
  isPortfolio?: boolean;
};

const SocialLinks: React.FC<SocialLinksProps> = ({ variant = 'light' }) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalWidth, setModalWidth] = useState<number>(0);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const modalRef = useRef<HTMLDivElement>(null);

  // Calculate modal width for PDF
  useEffect(() => {
    const updateWidth = () => {
      const width = Math.min(window.innerWidth * 0.9, 800) - 32; // 90vw or 800px max, minus padding
      setModalWidth(width);
      setIsMobile(window.innerWidth < 640);
    };

    updateWidth();

    let timeoutId: number;
    const debouncedUpdate = () => {
      clearTimeout(timeoutId);
      timeoutId = window.setTimeout(updateWidth, 150);
    };

    window.addEventListener('resize', debouncedUpdate);
    return () => {
      window.removeEventListener('resize', debouncedUpdate);
      clearTimeout(timeoutId);
    };
  }, []);

  // Handle ESC key to close modal
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isModalOpen) {
        setIsModalOpen(false);
      }
    };

    if (isModalOpen) {
      document.addEventListener('keydown', handleEsc);
      // Focus trap
      modalRef.current?.focus();
    }

    return () => {
      document.removeEventListener('keydown', handleEsc);
    };
  }, [isModalOpen]);

  const modalStyles: ModalStyles = {
    overlay: {
      zIndex: 1000,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      backdropFilter: 'blur(4px)'
    },
    content: {
      position: 'fixed',
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      transform: 'translate(-50%, -50%)',
      width: '90vw',
      maxWidth: '800px',
      height: isMobile ? '75vh' : '90vh',
      border: 'none',
      background: 'white',
      borderRadius: '16px',
      padding: '0',
      overflow: 'hidden',
      boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
    }
  };

  const primaryLinks: LinkConfig[] = [
    {
      key: 'portfolio',
      label: 'Portfolio',
      sonarColor: 'rgba(252, 233, 3, 0.6)',
      ariaLabel: 'View Portfolio',
      to: '/portfolio',
      isPortfolio: true,
      renderIcon: () => <FaStar className="text-[26px] sm:text-[35px] text-[#fce903]" />
    },
    {
      key: 'blog',
      label: 'Blog',
      sonarColor: 'rgba(139, 69, 19, 0.6)',
      ariaLabel: 'View Blog',
      to: '/blog',
      renderIcon: () => <FaBook className="text-[26px] sm:text-[35px] text-[#8B4513]" />
    },
    {
      key: 'scholar',
      label: 'Scholar',
      sonarColor: 'rgba(66, 133, 244, 0.6)',
      ariaLabel: 'Google Scholar Profile',
      href: 'https://scholar.google.com/citations?user=N8R4s1kAAAAJ&hl=ko&oi=ao',
      renderIcon: () => (
        <img className="w-7 sm:w-10" src="./google_scholar_icon.png" alt="Google Scholar" loading="lazy" />
      )
    },
    {
      key: 'cv',
      label: 'CV',
      sonarColor: 'rgba(0, 0, 0, 0.25)',
      ariaLabel: 'View CV',
      onClick: () => setIsModalOpen(true),
      renderIcon: () => <img className="w-7 sm:w-10" src="./cv_icon.png" alt="CV" loading="lazy" />
    }
  ];

  const secondaryLinks: LinkConfig[] = [
    {
      key: 'linkedin',
      label: 'LinkedIn',
      sonarColor: 'rgba(14, 118, 168, 0.6)',
      ariaLabel: 'LinkedIn Profile',
      href: 'https://www.linkedin.com/in/kyochul-jang-93b263208/',
      renderIcon: () => <FaLinkedinIn className="text-[26px] sm:text-[35px] text-[#0E76A8]" />
    },
    {
      key: 'instagram',
      label: 'Instagram',
      sonarColor: 'rgba(225, 48, 108, 0.6)',
      ariaLabel: 'Instagram Profile',
      href: 'https://www.instagram.com/kjang_hochul/',
      renderIcon: () => <FaInstagram className="text-[26px] sm:text-[35px] text-[#E1306C]" />
    },
    {
      key: 'github',
      label: 'GitHub',
      sonarColor: 'rgba(119, 87, 157, 0.6)',
      ariaLabel: 'GitHub Profile',
      href: 'https://github.com/OfficerChul',
      renderIcon: () => <FaGithub className="text-[26px] sm:text-[35px] text-[#77579d]" />
    },
    {
      key: 'email',
      label: 'Email',
      sonarColor: 'rgba(54, 139, 254, 0.6)',
      ariaLabel: 'Send Email',
      href: 'mailto:gcj1234567890@gmail.com',
      renderIcon: () => <FaEnvelope className="text-[26px] sm:text-[35px] text-[#368BFE]" />
    }
  ];

  const renderLinkButton = (link: LinkConfig) => (
    <SocialLinkButton
      key={link.key}
      to={link.to}
      href={link.href}
      onClick={link.onClick}
      ariaLabel={link.ariaLabel}
      sonarColor={link.sonarColor}
      isPortfolio={link.isPortfolio}
      label={link.label}
      variant={variant}
    >
      {link.renderIcon()}
    </SocialLinkButton>
  );


  return (
    <div>
      <section id="social-links" className="px-4">
        <div className="text-center mx-auto py-2 sm:py-4 pb-6 sm:pb-12">
          <div className="flex justify-center gap-2 sm:gap-12">
            {primaryLinks.map(renderLinkButton)}
          </div>

          <div className="flex justify-center gap-2 sm:gap-12 mt-6 sm:mt-6">
            {secondaryLinks.map(renderLinkButton)}
          </div>
        </div>
      </section>

      {/* CV Modal */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        closeTimeoutMS={200}
        style={modalStyles}
        ariaHideApp={false}
        contentLabel="CV Document"
        shouldCloseOnOverlayClick={true}
        shouldCloseOnEsc={true}
      >
        <div
          ref={modalRef}
          tabIndex={-1}
          style={{ height: '100%', position: 'relative' }}
        >
          {/* Close button only */}
          <button
            onClick={() => setIsModalOpen(false)}
            className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-all"
            aria-label="Close CV"
          >
            <span className="text-2xl">×</span>
          </button>

          {/* PDF Viewer - react-pdf for cross-platform support */}
          <Suspense
            fallback={
              <LoadingQuote className="absolute inset-0 bg-white" quoteClassName="text-gray-700" />
            }
          >
            <PDFViewer file="/Kyochul_Jang___CV.pdf" width={modalWidth} />
          </Suspense>
        </div>
      </Modal>
    </div>
  );
};

export default SocialLinks;

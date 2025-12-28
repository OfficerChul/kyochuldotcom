import React, { useState, useEffect, useRef, lazy, Suspense, useMemo } from 'react';
import Modal from 'react-modal';
import { FaStar, FaLinkedinIn, FaInstagram, FaGithub, FaEnvelope, FaBook } from 'react-icons/fa';
import SocialLinkButton from './SocialLinkButton';
import { getRandomQuote } from './PDFViewer';
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

const SocialLinks: React.FC<SocialLinksProps> = ({ variant = 'light' }) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalWidth, setModalWidth] = useState<number>(0);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const modalRef = useRef<HTMLDivElement>(null);

  // Pick a random quote for suspense fallback
  const suspenseQuote = useMemo(() => getRandomQuote(), []);

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


  return (
    <div>
      <section id="social-links" className="px-4">
        <div className="text-center mx-auto py-2 sm:py-4 pb-6 sm:pb-12">
          {/* First row of social links */}
          <div className="flex justify-center gap-2 sm:gap-12">
            <SocialLinkButton
              to="/portfolio"
              ariaLabel="View Portfolio"
              sonarColor="rgba(252, 233, 3, 0.6)"
              isPortfolio
              label="Portfolio"
              variant={variant}
            >
              <FaStar className="text-[26px] sm:text-[35px] text-[#fce903]" />
            </SocialLinkButton>

            <SocialLinkButton
              to="/diary"
              ariaLabel="View Diary"
              sonarColor="rgba(139, 69, 19, 0.6)"
              label="Diary"
              variant={variant}
            >
              <FaBook className="text-[26px] sm:text-[35px] text-[#8B4513]" />
            </SocialLinkButton>

            <SocialLinkButton
              href="https://scholar.google.com/citations?user=N8R4s1kAAAAJ&hl=ko&oi=ao"
              ariaLabel="Google Scholar Profile"
              sonarColor="rgba(66, 133, 244, 0.6)"
              label="Scholar"
              variant={variant}
            >
              <img
                className="w-7 sm:w-10"
                src="./google_scholar_icon.png"
                alt="Google Scholar"
                loading="lazy"
              />
            </SocialLinkButton>

            <SocialLinkButton
              onClick={() => setIsModalOpen(true)}
              ariaLabel="View CV"
              sonarColor="rgba(0, 0, 0, 0.25)"
              label="CV"
              variant={variant}
            >
              <img
                className="w-7 sm:w-10"
                src="./cv_icon.png"
                alt="CV"
                loading="lazy"
              />
            </SocialLinkButton>
          </div>

          {/* Second row of social links */}
          <div className="flex justify-center gap-2 sm:gap-12 mt-6 sm:mt-6">
            <SocialLinkButton
              href="https://www.linkedin.com/in/kyochul-jang-93b263208/"
              ariaLabel="LinkedIn Profile"
              sonarColor="rgba(14, 118, 168, 0.6)"
              label="LinkedIn"
              variant={variant}
            >
              <FaLinkedinIn className="text-[26px] sm:text-[35px] text-[#0E76A8]" />
            </SocialLinkButton>

            <SocialLinkButton
              href="https://www.instagram.com/kjang_hochul/"
              ariaLabel="Instagram Profile"
              sonarColor="rgba(225, 48, 108, 0.6)"
              label="Instagram"
              variant={variant}
            >
              <FaInstagram className="text-[26px] sm:text-[35px] text-[#E1306C]" />
            </SocialLinkButton>

            <SocialLinkButton
              href="https://github.com/OfficerChul"
              ariaLabel="GitHub Profile"
              sonarColor="rgba(119, 87, 157, 0.6)"
              label="GitHub"
              variant={variant}
            >
              <FaGithub className="text-[26px] sm:text-[35px] text-[#77579d]" />
            </SocialLinkButton>

            <SocialLinkButton
              href="mailto:gcj1234567890@gmail.com"
              ariaLabel="Send Email"
              sonarColor="rgba(54, 139, 254, 0.6)"
              label="Email"
              variant={variant}
            >
              <FaEnvelope className="text-[26px] sm:text-[35px] text-[#368BFE]" />
            </SocialLinkButton>
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
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center px-8 max-w-md">
                  <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-gray-600 mx-auto mb-6"></div>
                  <p className="text-gray-600 italic text-lg leading-relaxed">
                    "{suspenseQuote.quote}"
                  </p>
                  <p className="text-gray-500 mt-3 text-sm">
                    — {suspenseQuote.author}
                  </p>
                </div>
              </div>
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

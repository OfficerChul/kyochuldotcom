import React, { useState, useEffect, useRef } from 'react';
import Modal from 'react-modal';
import { FaStar, FaLinkedinIn, FaInstagram, FaGithub, FaEnvelope, FaBook } from 'react-icons/fa';
import SocialLinkButton from './SocialLinkButton';
import './animations.css';

interface ModalStyles {
  overlay: React.CSSProperties;
  content: React.CSSProperties;
}

const SocialLinks: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const modalRef = useRef<HTMLDivElement>(null);

  // Detect mobile device
  useEffect(() => {
    const checkMobile = () => {
      const userAgent = navigator.userAgent || navigator.vendor;
      const isMobileDevice = /android|iphone|ipad|ipod/i.test(userAgent.toLowerCase()) ||
        window.innerWidth <= 768;
      setIsMobile(isMobileDevice);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
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
      height: '90vh',
      border: 'none',
      background: 'white',
      borderRadius: '16px',
      padding: '0',
      overflow: 'hidden',
      boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
    }
  };

  // Responsive modal styles for mobile
  const iframeStyles: React.CSSProperties = {
    width: '100%',
    height: '100%',
    border: 'none',
    borderRadius: '16px'
  };

  return (
    <div>
      <section id="social-links" className="px-4">
        <div className="text-center mx-auto py-4 pb-12">
          {/* First row of social links */}
          <div className="flex justify-center gap-3 sm:gap-12">
            <SocialLinkButton
              to="/portfolio"
              ariaLabel="View Portfolio"
              sonarColor="rgba(252, 233, 3, 0.6)"
              isPortfolio
            >
              <FaStar className="text-[35px] text-[#fce903]" />
            </SocialLinkButton>

            <SocialLinkButton
              href="https://scholar.google.com/citations?user=N8R4s1kAAAAJ&hl=ko&oi=ao"
              ariaLabel="Google Scholar Profile"
              sonarColor="rgba(66, 133, 244, 0.6)"
            >
              <img
                className="w-10"
                src="./google_scholar_icon.png"
                alt="Google Scholar"
                loading="lazy"
              />
            </SocialLinkButton>

            <SocialLinkButton
              onClick={() => setIsModalOpen(true)}
              ariaLabel="View CV"
              sonarColor="rgba(0, 0, 0, 0.25)"
            >
              <img
                className="w-10"
                src="./cv_icon.png"
                alt="CV"
                loading="lazy"
              />
            </SocialLinkButton>

            <SocialLinkButton
              to="/diary"
              ariaLabel="View Diary"
              sonarColor="rgba(147, 112, 219, 0.6)"
            >
              <FaBook className="text-[35px] text-[#9370DB]" />
            </SocialLinkButton>
          </div>

          {/* Second row of social links */}
          <div className="flex justify-center gap-3 sm:gap-12 mt-4 sm:mt-3">
            <SocialLinkButton
              href="https://www.linkedin.com/in/kyochul-jang-93b263208/"
              ariaLabel="LinkedIn Profile"
              sonarColor="rgba(14, 118, 168, 0.6)"
            >
              <FaLinkedinIn className="text-[35px] text-[#0E76A8]" />
            </SocialLinkButton>

            <SocialLinkButton
              href="https://www.instagram.com/kjang_hochul/"
              ariaLabel="Instagram Profile"
              sonarColor="rgba(225, 48, 108, 0.6)"
            >
              <FaInstagram className="text-[35px] text-[#E1306C]" />
            </SocialLinkButton>

            <SocialLinkButton
              href="https://github.com/OfficerChul"
              ariaLabel="GitHub Profile"
              sonarColor="rgba(119, 87, 157, 0.6)"
            >
              <FaGithub className="text-[35px] text-[#77579d]" />
            </SocialLinkButton>

            <SocialLinkButton
              href="mailto:gcj1234567890@gmail.com"
              ariaLabel="Send Email"
              sonarColor="rgba(54, 139, 254, 0.6)"
            >
              <FaEnvelope className="text-[35px] text-[#368BFE]" />
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

          {/* PDF Viewer - Full height */}
          {isMobile ? (
            // Mobile: Use object tag for better compatibility
            <object
              data="Kyochul_Jang___CV.pdf#view=FitH&toolbar=0"
              type="application/pdf"
              width="100%"
              height="100%"
              style={{ borderRadius: '16px' }}
            >
              <embed
                src="Kyochul_Jang___CV.pdf#view=FitH&toolbar=0"
                type="application/pdf"
                width="100%"
                height="100%"
                style={{ borderRadius: '16px' }}
              />
            </object>
          ) : (
            // Desktop: Use iframe
            <iframe
              style={iframeStyles}
              src="Kyochul_Jang___CV.pdf#view=FitH&toolbar=0"
              title="Kyochul Jang CV"
            />
          )}
        </div>
      </Modal>
    </div>
  );
};

export default SocialLinks;

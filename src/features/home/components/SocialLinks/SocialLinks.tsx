import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Modal from 'react-modal';

const SocialLinks: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const modalStyles = {
    overlay: {
      zIndex: 1000,
      backgroundColor: 'rgba(0, 0, 0, 0.2)'
    },
    content: {
      position: 'fixed' as const,
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      transform: 'translate(-50%, -50%)',
      width: '50vw',
      height: '90vh',
      border: '1px solid #ccc',
      background: 'white',
      borderRadius: '10px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    }
  };

  const iframeStyles = {
    width: '100%',
    height: '100%',
    border: 'none',
    position: 'fixed' as const,
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    transform: 'translate(-50%, -50%)',
    background: 'black',
    borderRadius: '10px',
    outline: 'none',
    padding: '20px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  };

  return (
    <div>
      <link
        href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"
        rel="stylesheet"
        integrity="sha384-wvfXpqpZZVQGK6TAh5PVlGOfQNHSoD2xbE+QkPxCAFlNEevoEH3Sl0sibVcOQVnN"
        crossOrigin="anonymous"
      />

      <section id="set-8">
        <div className="text-center mx-auto py-4 pb-12">
          <div className="flex justify-center gap-3 sm:gap-12">
            <Link to="portfolio">
              <div className="cursor-pointer mx-1 md:mx-2.5 w-[70px] h-[70px] rounded-full text-center relative z-10 text-white bg-white shadow-lg transition-all duration-100 ease-out hover:bg-[#5DDCFF] hover:scale-[0.93] hover:text-white after:absolute after:w-full after:h-full after:rounded-full after:content-[''] after:box-border after:top-0 after:left-0 after:p-0 after:-z-10 after:shadow-[0_0_0_2px_rgba(178,221,76,1)] after:opacity-0 after:scale-90 hover:after:animate-[sonarEffect_1.3s_ease-out_75ms] flex justify-center items-center animate-[blink-outline_1s_linear_infinite,bounce_5s_infinite] outline-3 outline-transparent">
                <i className="fa fa-star" style={{ fontSize: '35px', color: '#fce903' }}></i>
              </div>
            </Link>

            <a
              href="https://scholar.google.com/citations?user=N8R4s1kAAAAJ&hl=ko&oi=ao"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="cursor-pointer mx-1 md:mx-2.5 w-[70px] h-[70px] rounded-full text-center relative z-10 text-white bg-white shadow-lg transition-all duration-100 ease-out hover:bg-[#5DDCFF] hover:scale-[0.93] hover:text-white after:absolute after:w-full after:h-full after:rounded-full after:content-[''] after:box-border after:top-0 after:left-0 after:p-0 after:-z-10 after:shadow-[0_0_0_2px_rgba(178,221,76,1)] after:opacity-0 after:scale-90 hover:after:animate-[sonarEffect_1.3s_ease-out_75ms] flex justify-center items-center">
                <img
                  className="w-10"
                  src="./google_scholar_icon.png"
                  alt="Google Scholar"
                />
              </div>
            </a>

            <div
              onClick={() => setIsModalOpen(true)}
              className="cursor-pointer mx-1 md:mx-2.5 w-[70px] h-[70px] rounded-full text-center relative z-10 text-white bg-white shadow-lg transition-all duration-100 ease-out hover:bg-[#5DDCFF] hover:scale-[0.93] hover:text-white after:absolute after:w-full after:h-full after:rounded-full after:content-[''] after:box-border after:top-0 after:left-0 after:p-0 after:-z-10 after:shadow-[0_0_0_2px_rgba(178,221,76,1)] after:opacity-0 after:scale-90 hover:after:animate-[sonarEffect_1.3s_ease-out_75ms] flex justify-center items-center"
            >
              <img className="w-10" src="./cv_icon.png" alt="CV" />
            </div>

            <Modal
              isOpen={isModalOpen}
              onRequestClose={() => setIsModalOpen(false)}
              closeTimeoutMS={200}
              style={modalStyles}
              ariaHideApp={false}
            >
              <iframe
                style={iframeStyles}
                className="resume-modal-iframe"
                src="Kyochul_Jang___CV.pdf"
                title="Kyochul Resume"
              />
            </Modal>
          </div>

          <div className="flex justify-center gap-3 sm:gap-12 mt-4 sm:mt-3">
            <a
              href="https://www.linkedin.com/in/kyochul-jang-93b263208/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="cursor-pointer mx-1 md:mx-2.5 w-[70px] h-[70px] rounded-full text-center relative z-10 text-white bg-white shadow-lg transition-all duration-100 ease-out hover:bg-[#5DDCFF] hover:scale-[0.93] hover:text-white after:absolute after:w-full after:h-full after:rounded-full after:content-[''] after:box-border after:top-0 after:left-0 after:p-0 after:-z-10 after:shadow-[0_0_0_2px_rgba(178,221,76,1)] after:opacity-0 after:scale-90 hover:after:animate-[sonarEffect_1.3s_ease-out_75ms] flex justify-center items-center">
                <i className="fa fa-linkedin" style={{ fontSize: '35px', color: '#0E76A8' }}></i>
              </div>
            </a>

            <a
              href="https://www.instagram.com/kjang_hochul/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="cursor-pointer mx-1 md:mx-2.5 w-[70px] h-[70px] rounded-full text-center relative z-10 text-white bg-white shadow-lg transition-all duration-100 ease-out hover:bg-[#5DDCFF] hover:scale-[0.93] hover:text-white after:absolute after:w-full after:h-full after:rounded-full after:content-[''] after:box-border after:top-0 after:left-0 after:p-0 after:-z-10 after:shadow-[0_0_0_2px_rgba(178,221,76,1)] after:opacity-0 after:scale-90 hover:after:animate-[sonarEffect_1.3s_ease-out_75ms] flex justify-center items-center">
                <i className="fa fa-instagram" style={{ fontSize: '35px', color: '#E1306C' }}></i>
              </div>
            </a>

            <a
              href="https://github.com/OfficerChul"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="cursor-pointer mx-1 md:mx-2.5 w-[70px] h-[70px] rounded-full text-center relative z-10 text-white bg-white shadow-lg transition-all duration-100 ease-out hover:bg-[#5DDCFF] hover:scale-[0.93] hover:text-white after:absolute after:w-full after:h-full after:rounded-full after:content-[''] after:box-border after:top-0 after:left-0 after:p-0 after:-z-10 after:shadow-[0_0_0_2px_rgba(178,221,76,1)] after:opacity-0 after:scale-90 hover:after:animate-[sonarEffect_1.3s_ease-out_75ms] flex justify-center items-center">
                <i className="fa fa-github" style={{ fontSize: '35px', color: '#77579d' }}></i>
              </div>
            </a>

            <a
              href="mailto:gcj1234567890@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="cursor-pointer mx-1 md:mx-2.5 w-[70px] h-[70px] rounded-full text-center relative z-10 text-white bg-white shadow-lg transition-all duration-100 ease-out hover:bg-[#5DDCFF] hover:scale-[0.93] hover:text-white after:absolute after:w-full after:h-full after:rounded-full after:content-[''] after:box-border after:top-0 after:left-0 after:p-0 after:-z-10 after:shadow-[0_0_0_2px_rgba(178,221,76,1)] after:opacity-0 after:scale-90 hover:after:animate-[sonarEffect_1.3s_ease-out_75ms] flex justify-center items-center">
                <i className="fa fa-envelope" style={{ fontSize: '35px', color: '#368BFE' }}></i>
              </div>
            </a>
          </div>
        </div>
      </section>

      <style>{`
        @keyframes sonarEffect {
          0% {
            opacity: 0.5;
          }
          40% {
            opacity: 0.7;
            box-shadow: 0 0 0 2px rgba(93, 220, 255, 1),
              0 0 10px 10px rgba(93, 220, 255, 1), 0 0 0 10px rgba(93, 220, 255, 1);
          }
          100% {
            box-shadow: 0 0 0 2px rgba(93, 220, 255, 1),
              0 0 10px 10px rgba(93, 220, 255, 1), 0 0 0 10px rgba(93, 220, 255, 1);
            transform: scale(1.5);
            opacity: 0;
          }
        }

        @keyframes blink-outline {
          0%, 100% {
            outline-color: transparent;
          }
          50% {
            outline-color: #fce903;
          }
        }

        @keyframes bounce {
          0%, 6%, 10%, 14%, 100% {
            transform: translateY(0);
          }
          4% {
            transform: translateY(-12px);
          }
          8% {
            transform: translateY(-10px);
          }
          12% {
            transform: translateY(-5px);
          }
        }
      `}</style>
    </div>
  );
};

export default SocialLinks;
import React from 'react';
import { ProjectsBtnProps } from '../../types';

const ProjectsBtn: React.FC<ProjectsBtnProps> = ({ ghUrl }) => {
  return (
    <div className="flex justify-center">
      <style>{`
        .projects-btn {
          position: relative;
          border: none;
          background: transparent;
          padding: 0;
          cursor: pointer;
          outline-offset: 4px;
          transition: all 350ms ease;
          user-select: none;
          touch-action: manipulation;
        }

        .shadow {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          border-radius: 16px;
          background: linear-gradient(
            145deg,
            rgba(0, 0, 0, 0.4) 0%,
            rgba(0, 0, 0, 0.25) 100%
          );
          will-change: transform;
          transform: translateY(4px);
          transition: transform 650ms cubic-bezier(.3, .7, .4, 1);
          filter: blur(4px);
        }

        .edge {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          border-radius: 16px;
          background: linear-gradient(
            to left,
            hsl(280deg 100% 20%) 0%,
            hsl(280deg 100% 40%) 8%,
            hsl(280deg 100% 40%) 92%,
            hsl(280deg 100% 20%) 100%
          );
        }

        .front {
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          width: 56px;
          height: 56px;
          border-radius: 16px;
          color: white;
          background: linear-gradient(
            135deg,
            #8b5cf6 0%,
            #7c3aed 50%,
            #6b21a8 100%
          );
          will-change: transform;
          transform: translateY(-8px);
          transition: all 650ms cubic-bezier(.3, .7, .4, 1);
          box-shadow:
            inset 0 -2px 8px rgba(0, 0, 0, 0.2),
            inset 0 2px 8px rgba(255, 255, 255, 0.2);
        }

        .github-icon {
          width: 28px;
          height: 28px;
          transition: all 350ms ease;
          filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3));
        }

        .projects-btn:hover {
          filter: brightness(115%);
        }

        .projects-btn:hover .front {
          transform: translateY(-12px) scale(1.05);
          background: linear-gradient(
            135deg,
            #9333ea 0%,
            #8b5cf6 50%,
            #7c3aed 100%
          );
          box-shadow:
            inset 0 -3px 10px rgba(0, 0, 0, 0.3),
            inset 0 3px 10px rgba(255, 255, 255, 0.3),
            0 8px 24px rgba(139, 92, 246, 0.4);
        }

        .projects-btn:hover .github-icon {
          transform: rotate(360deg) scale(1.1);
        }

        .projects-btn:active .front {
          transform: translateY(-4px) scale(0.98);
          transition: transform 50ms;
        }

        .projects-btn:hover .shadow {
          transform: translateY(8px) scaleX(0.94);
          opacity: 0.8;
          filter: blur(6px);
          transition: all 350ms cubic-bezier(.3, .7, .4, 1.5);
        }

        .projects-btn:active .shadow {
          transform: translateY(2px) scaleX(0.98);
          transition: transform 50ms;
        }

        .projects-btn:focus:not(:focus-visible) {
          outline: none;
        }

        @keyframes pulse {
          0% {
            box-shadow: 0 0 0 0 rgba(139, 92, 246, 0.7);
          }
          70% {
            box-shadow: 0 0 0 10px rgba(139, 92, 246, 0);
          }
          100% {
            box-shadow: 0 0 0 0 rgba(139, 92, 246, 0);
          }
        }

        .projects-btn:hover .front {
          animation: pulse 1.5s infinite;
        }

        @media (max-width: 768px) {
          .front {
            width: 48px;
            height: 48px;
          }
          .github-icon {
            width: 24px;
            height: 24px;
          }
        }
      `}</style>

      <a
        href={ghUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="projects-btn"
        role="button"
        aria-label="View project on GitHub"
      >
        <span className="shadow"></span>
        <span className="edge"></span>
        <span className="front">
          <svg
            className="github-icon"
            viewBox="0 0 24 24"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M12 0.297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
          </svg>
        </span>
      </a>
    </div>
  );
};

export default ProjectsBtn;
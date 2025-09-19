import React from 'react';
import logo from '../../../../assets/images/logos/triangle-skyblue.png';
import SimpleIcon from '../SocialLinks';
import Navigation from '../../../../shared/components/ui/Navigation';

const Main: React.FC = () => {
  return (
    <div className="bg-[#c9ebf5] min-h-screen">
      <Navigation />

      <div className="mt-20">
        <img
          className="mx-auto mt-5 h-52 md:h-60 hover:animate-[shake_3s_infinite]"
          src={logo}
          alt="logo"
          id="main-logo"
        />

        <form action="https://www.google.com/search" method="GET">
          <div className="w-full flex items-center justify-center">
            <div className="relative w-3/4 md:w-1/2 lg:w-2/5">
              <i className="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
              <input
                name="q"
                type="text"
                className="shadow-lg border-none w-full rounded-full h-10 pl-10 outline-none"
                placeholder="Search Google or type a URL"
                id="search-bar"
              />
            </div>
          </div>
        </form>

        <div className="menu mt-4">
          {/* Portfolio and blog links commented out */}
        </div>

        <SimpleIcon />
      </div>

      <style>{`
        @keyframes shake {
          0% { transform: translate(1px, 1px) rotate(0deg); }
          10% { transform: translate(-1px, -1px) rotate(1deg); }
          20% { transform: translate(-2px, 1px) rotate(-1deg); }
          30% { transform: translate(1px, 2px) rotate(0deg); }
          40% { transform: translate(-1px, 1px) rotate(1deg); }
          50% { transform: translate(1px, -1px) rotate(-2deg); }
          60% { transform: translate(2px, 1px) rotate(1deg); }
          70% { transform: translate(-1px, 2px) rotate(2deg); }
          80% { transform: translate(2px, -1px) rotate(1deg); }
          90% { transform: translate(-1px, 2px) rotate(0deg); }
          100% { transform: translate(2px, 1px) rotate(-1deg); }
        }
      `}</style>
    </div>
  );
};

export default Main;
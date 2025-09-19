import React from 'react';

interface FancyBtnProps {
  url: string;
  btnText: string;
}

const FancyBtn: React.FC<FancyBtnProps> = ({ url, btnText }) => {
  const remHash = (): void => {
    setTimeout(() => {
      const uri = window.location.toString();
      if (uri.indexOf('#') > 0) {
        const clean_uri = uri.substring(0, uri.indexOf('#'));
        console.log(window.location.toString());
        console.log(clean_uri);
        window.history.replaceState('', document.title, clean_uri);
      }
    }, 5);
  };

  return (
    <div className="w-[400px] h-[400px] absolute transform translate-x-[-25%] translate-y-[-20%] min-[641px]:translate-y-0 min-[961px]:translate-y-[10%] min-[1281px]:translate-y-[20%] flex justify-center items-center">
      <div className="w-[180px] h-[60px] absolute">
        <a href={url}>
          <button
            onClick={remHash}
            className="w-[180px] h-[60px] cursor-pointer bg-transparent border-3 border-[#b5ff0893] outline-none transition-all duration-1000 ease-in-out relative group"
          >
            <svg
              width="180px"
              height="60px"
              viewBox="0 0 180 60"
              className="absolute left-0 top-0 fill-none stroke-white stroke-dasharray-[150_480] stroke-dashoffset-150 transition-all duration-1000 ease-in-out group-hover:stroke-dashoffset-[-480]"
            >
              <polyline points="179,1 179,59 1,59 1,1 179,1" className="bg-line" />
              <polyline points="179,1 179,59 1,59 1,1 179,1" className="hl-line" />
            </svg>
            <span className="text-white text-lg font-thin relative z-10">{btnText}</span>
          </button>
        </a>
      </div>
    </div>
  );
};

export default FancyBtn;
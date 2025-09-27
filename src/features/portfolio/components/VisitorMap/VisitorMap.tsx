import React, { useEffect, useRef } from 'react';

const MAP_SCRIPT_ID = 'mapmyvisitors';
const MAP_SCRIPT_SRC =
  "https://mapmyvisitors.com/map.js?cl=ffffff&w=a&t=n&d=5yfauFD3He7e5eUfjK92_4cq7sJHjoAJIS6eoVMNLWo&co=74b2dd";

const VisitorMap: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;

    if (!container) {
      return;
    }

    const existingScript = document.getElementById(MAP_SCRIPT_ID);
    if (existingScript) {
      existingScript.remove();
    }

    container.innerHTML = '';

    const script = document.createElement('script');
    script.id = MAP_SCRIPT_ID;
    script.type = 'text/javascript';
    script.src = MAP_SCRIPT_SRC;
    script.async = true;

    container.appendChild(script);

    return () => {
      script.remove();
      container.innerHTML = '';
    };
  }, []);

  return (
    <section
      id="visitor-map"
      aria-label="Visitor map"
      className="bg-[#74b2dd] py-6 md:py-8 lg:py-10"
    >
      <div className="container mx-auto px-2 sm:px-4 lg:px-6">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="font-mono text-3xl sm:text-4xl md:text-5xl text-white font-extrabold">
            Visitor Map
          </h2>
          <div className="mt-3 h-1 w-20 rounded-full bg-white/90 mx-auto" />
          <p className="mt-4 text-white/90 text-base sm:text-lg">
            Real-time view of where people are discovering this site from.
          </p>
        </div>

        <div className="mt-6 flex justify-center">
          <div ref={containerRef} className="w-full max-w-4xl" />
        </div>
      </div>
    </section>
  );
};

export default VisitorMap;

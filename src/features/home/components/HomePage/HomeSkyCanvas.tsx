import React from 'react';
import { Position, StageState } from '../../types/time';

interface CloudClass {
  id: string;
  className: string;
}

interface Star {
  top: number;
  left: number;
  size: number;
  delay: number;
}

interface HomeSkyCanvasProps {
  timeStage: StageState;
  sunPosition: Position;
  moonPosition: Position;
  moonOpacity: number;
  starOpacity: number;
  stars: readonly Star[];
  cloudClasses: readonly CloudClass[];
}

const HomeSkyCanvas: React.FC<HomeSkyCanvasProps> = ({
  timeStage,
  sunPosition,
  moonPosition,
  moonOpacity,
  starOpacity,
  stars,
  cloudClasses,
}) => {
  return (
    <>
      <div className={`sky-layer stage-${timeStage.stage}`} aria-hidden="true">
        <div className="time-gradient" />
        <div
          className="sun-halo"
          style={{
            top: `${sunPosition.top}%`,
            left: `${sunPosition.left}%`,
            opacity: timeStage.stage === 'night' ? 0 : 0.85,
          }}
        />
        <div
          className="sun"
          style={{
            top: `${sunPosition.top}%`,
            left: `${sunPosition.left}%`,
            opacity: timeStage.stage === 'night' ? 0 : 1,
          }}
        />
        <div
          className="moon"
          style={{
            top: `${moonPosition.top}%`,
            left: `${moonPosition.left}%`,
            opacity: moonOpacity,
          }}
        />
        <div className="stars" style={{ opacity: starOpacity }}>
          {stars.map((star, index) => (
            <span
              key={`star-${index}`}
              className="star"
              style={{
                top: `${star.top}%`,
                left: `${star.left}%`,
                width: `${star.size}px`,
                height: `${star.size}px`,
                animationDelay: `${star.delay}s`,
              }}
            />
          ))}
        </div>
        <div className="horizon-glow" />
        <div className="haze" />
      </div>

      <div className="cloud-layer" aria-hidden="true">
        {cloudClasses.map(({ id, className }) => (
          <span key={id} className={`cloud ${className}`} />
        ))}
      </div>
    </>
  );
};

export default HomeSkyCanvas;

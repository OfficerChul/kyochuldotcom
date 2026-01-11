import { Position, StageState, TimeStage } from '../types/time';
import { clamp } from './timeService';

export const CLOUD_CLASSES = [
  { id: 'cloud-one', className: 'cloud--one' },
  { id: 'cloud-two', className: 'cloud--two' },
  { id: 'cloud-three', className: 'cloud--three' },
  { id: 'cloud-four', className: 'cloud--four' },
] as const;

export const SUN_PATHS: Record<Exclude<TimeStage, 'night'>, { start: Position; end: Position }> = {
  sunrise: { start: { top: 76, left: 6 }, end: { top: 35, left: 32 } },
  day: { start: { top: 35, left: 32 }, end: { top: 24, left: 60 } },
  sunset: { start: { top: 24, left: 60 }, end: { top: 78, left: 88 } },
};

export const MOON_PATH: { start: Position; end: Position } = {
  start: { top: 80, left: 82 },
  end: { top: 26, left: 18 },
};

export const STARS = [
  { top: 12, left: 22, size: 3, delay: 0 },
  { top: 18, left: 46, size: 4, delay: 1.1 },
  { top: 25, left: 70, size: 3, delay: 0.6 },
  { top: 34, left: 32, size: 4, delay: 1.7 },
  { top: 28, left: 58, size: 3, delay: 0.8 },
  { top: 16, left: 82, size: 4, delay: 1.4 },
  { top: 38, left: 68, size: 3, delay: 0.3 },
  { top: 22, left: 90, size: 4, delay: 2.2 },
  { top: 14, left: 12, size: 3, delay: 1.5 },
  { top: 32, left: 14, size: 4, delay: 0.4 },
  { top: 10, left: 60, size: 3, delay: 1.8 },
  { top: 40, left: 24, size: 3, delay: 2.6 },
] as const;

const lerp = (start: number, end: number, progress: number): number =>
  start + (end - start) * progress;

export const computeSkyElements = (stageState: StageState) => {
  const stage = stageState.stage;
  const progress = stageState.progress;

  const sunPosition: Position =
    stage === 'night'
      ? { top: 108, left: 50 }
      : {
          top: lerp(SUN_PATHS[stage].start.top, SUN_PATHS[stage].end.top, progress),
          left: lerp(SUN_PATHS[stage].start.left, SUN_PATHS[stage].end.left, progress),
        };

  let moonProgress: number;
  if (stage === 'night') {
    moonProgress = progress;
  } else if (stage === 'sunrise') {
    moonProgress = clamp(1 - progress);
  } else if (stage === 'sunset') {
    moonProgress = clamp(progress * 0.7);
  } else {
    moonProgress = 0;
  }

  const moonPosition: Position = {
    top: lerp(MOON_PATH.start.top, MOON_PATH.end.top, moonProgress),
    left: lerp(MOON_PATH.start.left, MOON_PATH.end.left, moonProgress),
  };

  const moonOpacity =
    stage === 'night'
      ? 1
      : stage === 'sunrise'
        ? clamp(1 - progress * 1.6)
        : stage === 'sunset'
          ? clamp((progress - 0.55) * 2.2)
          : 0;

  const starOpacity =
    stage === 'night'
      ? 1
      : stage === 'sunrise'
        ? clamp(0.75 - progress)
        : stage === 'sunset'
          ? clamp(progress - 0.6)
          : 0;

  return { sunPosition, moonPosition, moonOpacity, starOpacity };
};

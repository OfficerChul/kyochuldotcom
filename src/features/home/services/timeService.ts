import { StageState, TimeStage } from '../types/time';

export const clamp = (value: number, min = 0, max = 1): number =>
  Math.min(max, Math.max(min, value));

export const getKSTDate = (): Date => {
  const now = new Date();
  const utc = now.getTime() + now.getTimezoneOffset() * 60000;
  return new Date(utc + 9 * 60 * 60000);
};

const getStageStateForDate = (date: Date): StageState => {
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();
  const totalMinutes = hours * 60 + minutes + seconds / 60;

  if (totalMinutes >= 300 && totalMinutes < 480) {
    return { stage: 'sunrise', progress: clamp((totalMinutes - 300) / (480 - 300)) };
  }

  if (totalMinutes >= 480 && totalMinutes < 1020) {
    return { stage: 'day', progress: clamp((totalMinutes - 480) / (1020 - 480)) };
  }

  if (totalMinutes >= 1020 && totalMinutes < 1140) {
    return { stage: 'sunset', progress: clamp((totalMinutes - 1020) / (1140 - 1020)) };
  }

  const nightMinutes = totalMinutes >= 1140 ? totalMinutes - 1140 : totalMinutes + (1440 - 1140);
  return { stage: 'night', progress: clamp(nightMinutes / 600) };
};

export const getStageState = (): StageState => getStageStateForDate(getKSTDate());

export { getStageStateForDate };

export const isNightStage = (stage: TimeStage): boolean => stage === 'night';

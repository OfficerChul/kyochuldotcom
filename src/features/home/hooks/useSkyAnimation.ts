import { useEffect, useMemo, useState } from 'react';
import { computeSkyElements } from '../services/animationService';
import { getStageState } from '../services/timeService';
import { StageState } from '../types/time';

export const useSkyAnimation = () => {
  const [timeStage, setTimeStage] = useState<StageState>(() => getStageState());

  useEffect(() => {
    const interval = window.setInterval(() => setTimeStage(getStageState()), 30000);
    return () => window.clearInterval(interval);
  }, []);

  const elements = useMemo(() => computeSkyElements(timeStage), [timeStage]);

  return {
    timeStage,
    ...elements,
  };
};

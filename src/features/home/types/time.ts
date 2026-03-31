export type TimeStage = 'sunrise' | 'day' | 'sunset' | 'night';

export interface StageState {
  stage: TimeStage;
  progress: number;
}

export interface Position {
  top: number;
  left: number;
}

export interface CloudClass {
  id: string;
  className: string;
}

export interface Star {
  top: number;
  left: number;
  size: number;
  delay: number;
}

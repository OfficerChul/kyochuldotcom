export type TimeStage = 'sunrise' | 'day' | 'sunset' | 'night';

export interface StageState {
  stage: TimeStage;
  progress: number;
}

export interface Position {
  top: number;
  left: number;
}

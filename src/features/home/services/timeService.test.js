const { getStageStateForDate } = require('./timeService');

describe('getStageStateForDate', () => {
  it('sunrise 구간에서 단계와 진행률을 계산한다', () => {
    const state = getStageStateForDate(new Date(2024, 0, 1, 6, 0, 0));
    expect(state.stage).toBe('sunrise');
    expect(state.progress).toBeCloseTo((360 - 300) / (480 - 300));
  });

  it('day 구간에서 단계와 진행률을 계산한다', () => {
    const state = getStageStateForDate(new Date(2024, 0, 1, 12, 0, 0));
    expect(state.stage).toBe('day');
    expect(state.progress).toBeCloseTo((720 - 480) / (1020 - 480));
  });

  it('sunset 구간에서 단계와 진행률을 계산한다', () => {
    const state = getStageStateForDate(new Date(2024, 0, 1, 17, 30, 0));
    expect(state.stage).toBe('sunset');
    expect(state.progress).toBeCloseTo((1050 - 1020) / (1140 - 1020));
  });

  it('night 구간에서 단계와 진행률을 계산한다', () => {
    const state = getStageStateForDate(new Date(2024, 0, 1, 23, 0, 0));
    expect(state.stage).toBe('night');
    expect(state.progress).toBeCloseTo((1380 - 1140) / 600);
  });
});

const { computeSkyElements } = require('./animationService');

describe('computeSkyElements', () => {
  it('day 스테이지에서는 태양이 궤도 중간 위치에 있다', () => {
    const { sunPosition, moonOpacity, starOpacity } = computeSkyElements({
      stage: 'day',
      progress: 0.5,
    });
    expect(sunPosition.top).toBeCloseTo(29.5);
    expect(sunPosition.left).toBeCloseTo(46);
    expect(moonOpacity).toBe(0);
    expect(starOpacity).toBe(0);
  });

  it('night 스테이지에서는 별과 달이 보인다', () => {
    const { moonOpacity, starOpacity } = computeSkyElements({ stage: 'night', progress: 0.3 });
    expect(moonOpacity).toBeCloseTo(1);
    expect(starOpacity).toBeCloseTo(1);
  });
});

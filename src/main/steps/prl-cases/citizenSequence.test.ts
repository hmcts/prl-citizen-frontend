import { citizenSequence } from './citizenSequence';

describe('applicant1Sequence', () => {
  test('should contain 1 entries in applicant 1 screen sequence', () => {
    expect(citizenSequence).toHaveLength(4);

    expect(citizenSequence[0].url).toBe('/citizen-home');
    expect(citizenSequence[0].showInSection).toBe('aboutEdgeCase');
    expect(citizenSequence[0].getNextStep({})).toBe('/dashboard');

    expect(citizenSequence[1].url).toBe('/dashboard');
    expect(citizenSequence[1].showInSection).toBe('aboutEdgeCase');
    expect(citizenSequence[1].getNextStep({})).toBe('/dashboard');

    expect(citizenSequence[2].url).toBe('/pin-activation/enter-pin');
    expect(citizenSequence[2].showInSection).toBe('aboutEdgeCase');
    expect(citizenSequence[2].getNextStep({})).toBe('/pin-activation/case-activated');

    expect(citizenSequence[3].url).toBe('/pin-activation/case-activated');
    expect(citizenSequence[3].showInSection).toBe('aboutEdgeCase');
    expect(citizenSequence[3].getNextStep({})).toBe('/dashboard');
  });
});

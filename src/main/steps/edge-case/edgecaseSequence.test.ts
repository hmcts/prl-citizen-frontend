import { edgecaseSequence } from './edgecaseSequence';

describe('applicant1Sequence', () => {
  test('should contain 1 entries in applicant 1 screen sequence', () => {
    expect(edgecaseSequence).toHaveLength(2);

    expect(edgecaseSequence[0].url).toBe('/citizen-home');
    expect(edgecaseSequence[0].showInSection).toBe('aboutEdgeCase');
    expect(edgecaseSequence[0].getNextStep({})).toBe('/dashboard');
  });
});

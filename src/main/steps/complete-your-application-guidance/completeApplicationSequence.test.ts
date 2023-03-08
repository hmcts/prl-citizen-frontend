import { completeApplicationSequence } from './completeApplicationSequence';

describe('completeApplicationSequence', () => {
  test('should contain 1 entries of screen sequence', () => {
    expect(completeApplicationSequence).toHaveLength(2);

    expect(completeApplicationSequence[0].url).toBe('/complete-your-application-guidance/complete-application');
    expect(completeApplicationSequence[0].showInSection).toBe('completeYourApplicationCase');
    expect(completeApplicationSequence[0].getNextStep({})).toBe(
      '/complete-your-application-guidance/complete-application'
    );

    expect(completeApplicationSequence[1].url).toBe('/complete-your-application-guidance/pay-online');
    expect(completeApplicationSequence[1].showInSection).toBe('completeYourApplicationCase');
    expect(completeApplicationSequence[1].getNextStep({})).toBe('/complete-your-application-guidance/pay-online');
  });
});

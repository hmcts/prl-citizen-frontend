import { completeApplicationSequence } from './completeApplicationSequence';

describe('completeApplicationSequence', () => {
  test('should contain 1 entries of screen sequence', () => {
    expect(completeApplicationSequence).toHaveLength(6);

    expect(completeApplicationSequence[0].url).toBe('/complete-your-application-guidance/complete-application');
    expect(completeApplicationSequence[0].showInSection).toBe('completeYourApplicationCase');
    expect(completeApplicationSequence[0].getNextStep({})).toBe('/complete-your-application-guidance/pay-online');

    expect(completeApplicationSequence[1].url).toBe('/complete-your-application-guidance/pay-online');
    expect(completeApplicationSequence[1].showInSection).toBe('completeYourApplicationCase');
    expect(completeApplicationSequence[1].getNextStep({})).toBe('/complete-your-application-guidance/paper-form');

    expect(completeApplicationSequence[2].url).toBe('/complete-your-application-guidance/legal-representative');
    expect(completeApplicationSequence[2].showInSection).toBe('completeYourApplicationCase');
    expect(completeApplicationSequence[2].getNextStep({})).toBe(
      '/complete-your-application-guidance/legal-representative'
    );
    expect(completeApplicationSequence[3].url).toBe('/complete-your-application-guidance/paper-form');
    expect(completeApplicationSequence[3].showInSection).toBe('completeYourApplicationCase');
    expect(completeApplicationSequence[3].getNextStep({})).toBe('/complete-your-application-guidance/paper-form');
    expect(completeApplicationSequence[4].url).toBe('/complete-your-application-guidance/legal-representative-14');
    expect(completeApplicationSequence[4].showInSection).toBe('completeYourApplicationCase');
    expect(completeApplicationSequence[4].getNextStep({})).toBe(
      '/complete-your-application-guidance/legal-representative-14'
    );
    expect(completeApplicationSequence[5].url).toBe('/complete-your-application-guidance/contact-representative');
    expect(completeApplicationSequence[5].showInSection).toBe('completeYourApplicationCase');
    expect(completeApplicationSequence[5].getNextStep({})).toBe(
      '/complete-your-application-guidance/contact-representative'
    );
  });
});

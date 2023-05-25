import { YesOrNo } from '../app/case/definition';

import { screeningQuestionsSequence } from './screeningQuestionsSequence';

describe('screeningQuestionsSequence', () => {
  test('should contain 1 entries in screening questions sequence screen sequence', () => {
    expect(screeningQuestionsSequence).toHaveLength(3);
    expect(screeningQuestionsSequence[0].url).toBe('/complete-your-application-guidance');
    expect(screeningQuestionsSequence[0].showInSection).toBe('screening');
    expect(screeningQuestionsSequence[0].getNextStep({})).toBe('/agree-court-fee');

    expect(screeningQuestionsSequence[1].url).toBe('/agree-court-fee');
    expect(screeningQuestionsSequence[1].showInSection).toBe('screening');
    expect(screeningQuestionsSequence[1].getNextStep({ applicationPayOnline: YesOrNo.YES })).toBe('/agree-court-fee');
    expect(screeningQuestionsSequence[1].getNextStep({ applicationPayOnline: YesOrNo.NO })).toBe(
      '/complete-your-application-paper-form'
    );

    expect(screeningQuestionsSequence[2].url).toBe('/complete-your-application-paper-form');
    expect(screeningQuestionsSequence[2].showInSection).toBe('screening');
    expect(screeningQuestionsSequence[2].getNextStep({})).toBe('/');
  });
});

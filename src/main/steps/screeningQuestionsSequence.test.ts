import { YesOrNo } from '../app/case/definition';

import { screeningQuestionsSequence } from './screeningQuestionsSequence';

describe('screeningQuestionsSequence', () => {
  test('should contain 6 entries in screening questions sequence', () => {
    expect(screeningQuestionsSequence).toHaveLength(6);

    expect(screeningQuestionsSequence[0].url).toBe('/complete-your-application-guidance');
    expect(screeningQuestionsSequence[0].showInSection).toBe('screening');
    expect(screeningQuestionsSequence[0].getNextStep({})).toBe('/agree-court-fee');

    expect(screeningQuestionsSequence[1].url).toBe('/agree-court-fee');
    expect(screeningQuestionsSequence[1].showInSection).toBe('screening');
    expect(screeningQuestionsSequence[1].getNextStep({ applicationPayOnline: YesOrNo.YES })).toBe(
      '/legal-representative-proceedings'
    );
    expect(screeningQuestionsSequence[1].getNextStep({ applicationPayOnline: YesOrNo.NO })).toBe(
      '/complete-your-application-paper-form'
    );

    expect(screeningQuestionsSequence[2].url).toBe('/complete-your-application-paper-form');
    expect(screeningQuestionsSequence[2].showInSection).toBe('screening');
    expect(screeningQuestionsSequence[2].getNextStep({})).toBe('/');

    expect(screeningQuestionsSequence[3].url).toBe('/legal-representative-proceedings');
    expect(screeningQuestionsSequence[3].showInSection).toBe('screening');
    expect(screeningQuestionsSequence[3].getNextStep({ legalRepresentativeForProceedings: YesOrNo.YES })).toBe(
      '/complete-your-application-legal-representative'
    );
    expect(screeningQuestionsSequence[3].getNextStep({ legalRepresentativeForProceedings: YesOrNo.NO })).toBe('/');

    expect(screeningQuestionsSequence[4].url).toBe('/complete-your-application-legal-representative');
    expect(screeningQuestionsSequence[4].showInSection).toBe('screening');
    expect(screeningQuestionsSequence[4].getNextStep({ legalRepresentativeForApplication: YesOrNo.YES })).toBe(
      '/contact-legal-representative'
    );
    expect(screeningQuestionsSequence[4].getNextStep({ legalRepresentativeForApplication: YesOrNo.NO })).toBe('/');

    expect(screeningQuestionsSequence[5].url).toBe('/contact-legal-representative');
    expect(screeningQuestionsSequence[5].showInSection).toBe('screening');
    expect(screeningQuestionsSequence[5].getNextStep({})).toBe('/');
  });
});

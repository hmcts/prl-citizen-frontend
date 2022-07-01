import { repondentCaseSequence } from './respondentcaseSequence';

describe('applicant1Sequence', () => {
  test('should contain 1 entries in applicant 1 screen sequence', () => {
    expect(repondentCaseSequence).toHaveLength(14);
    expect(repondentCaseSequence[0].url).toBe('/respondent/task-list');
    expect(repondentCaseSequence[0].showInSection).toBe('aboutRespondentCase');
    expect(repondentCaseSequence[0].getNextStep({})).toBe('/respondent/task-list');

    expect(repondentCaseSequence[1].url).toBe('/respondent/consent-to-application/consent');
    expect(repondentCaseSequence[1].showInSection).toBe('aboutRespondentCase');
    expect(repondentCaseSequence[1].getNextStep({})).toBe('/respondent/consent-to-application/summary');

    expect(repondentCaseSequence[2].url).toBe('/respondent/consent-to-application/summary');
    expect(repondentCaseSequence[2].showInSection).toBe('aboutRespondentCase');
    expect(repondentCaseSequence[2].getNextStep({})).toBe('/respondent/task-list');

    expect(repondentCaseSequence[3].url).toBe('/respondent/keep-details-private/details_known');
    expect(repondentCaseSequence[3].showInSection).toBe('aboutRespondentCase');
    expect(repondentCaseSequence[3].getNextStep({})).toBe('/respondent/keep-details-private/start_alternative');

    expect(repondentCaseSequence[4].url).toBe('/respondent/keep-details-private/start_alternative');
    expect(repondentCaseSequence[4].showInSection).toBe('aboutRespondentCase');
    expect(repondentCaseSequence[4].getNextStep({})).toBe(
      '/respondent/keep-details-private/private_details_not_confirmed'
    );

    expect(repondentCaseSequence[5].url).toBe('/respondent/keep-details-private/private_details_confirmed');
    expect(repondentCaseSequence[5].showInSection).toBe('aboutRespondentCase');

    expect(repondentCaseSequence[6].url).toBe('/respondent/keep-details-private/private_details_not_confirmed');
    expect(repondentCaseSequence[6].showInSection).toBe('aboutRespondentCase');
    expect(repondentCaseSequence[6].getNextStep({})).toBe('/respondent/task-list');

    expect(repondentCaseSequence[7].url).toBe('/respondent/miam/miam-start');
    expect(repondentCaseSequence[7].showInSection).toBe('aboutRespondentCase');
    expect(repondentCaseSequence[7].getNextStep({})).toBe('/respondent/task-list');

    expect(repondentCaseSequence[8].url).toBe('/respondent/miam/willingness-to-attend-miam');
    expect(repondentCaseSequence[8].showInSection).toBe('aboutRespondentCase');
    expect(repondentCaseSequence[8].getNextStep({})).toBe('/respondent/miam/summary');

    expect(repondentCaseSequence[9].url).toBe('/respondent/miam/summary');
    expect(repondentCaseSequence[9].showInSection).toBe('aboutRespondentCase');
    expect(repondentCaseSequence[9].getNextStep({})).toBe('/respondent/task-list');

    expect(repondentCaseSequence[10].url).toBe('/respondent/international-factors/start');
    expect(repondentCaseSequence[10].showInSection).toBe('aboutRespondentCase');
    expect(repondentCaseSequence[10].getNextStep({})).toBe('/respondent/international-factors/parents');

    expect(repondentCaseSequence[11].url).toBe('/respondent/international-factors/parents');
    expect(repondentCaseSequence[11].showInSection).toBe('aboutRespondentCase');
    expect(repondentCaseSequence[11].getNextStep({})).toBe('/respondent/international-factors/jurisdiction');

    expect(repondentCaseSequence[12].url).toBe('/respondent/international-factors/jurisdiction');
    expect(repondentCaseSequence[12].showInSection).toBe('aboutRespondentCase');
    expect(repondentCaseSequence[12].getNextStep({})).toBe('/respondent/international-factors/request');

    expect(repondentCaseSequence[13].url).toBe('/respondent/international-factors/request');
    expect(repondentCaseSequence[13].showInSection).toBe('aboutRespondentCase');
    expect(repondentCaseSequence[13].getNextStep({})).toBe('/respondent/international-factors/summary');

    expect(repondentCaseSequence[14].url).toBe('/respondent/international-factors/summary');
    expect(repondentCaseSequence[14].showInSection).toBe('aboutRespondentCase');
    expect(repondentCaseSequence[14].getNextStep({})).toBe('/respondent/task-list');
  });
});

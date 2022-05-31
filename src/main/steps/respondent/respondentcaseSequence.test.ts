import { repondentCaseSequence } from './respondentcaseSequence';

describe('applicant1Sequence', () => {
  test('should contain 1 entries in applicant 1 screen sequence', () => {
    expect(repondentCaseSequence).toHaveLength(17);
    expect(repondentCaseSequence[0].url).toBe('/respondent/task-list');
    expect(repondentCaseSequence[0].showInSection).toBe('aboutRespondentCase');
    expect(repondentCaseSequence[0].getNextStep({})).toBe('/respondent/task-list');

    expect(repondentCaseSequence[1].url).toBe('/respondent/keep-details-private/details_known');
    expect(repondentCaseSequence[1].showInSection).toBe('aboutRespondentCase');
    expect(repondentCaseSequence[1].getNextStep({})).toBe('/respondent/keep-details-private/start_alternative');

    expect(repondentCaseSequence[2].url).toBe('/respondent/keep-details-private/start_alternative');
    expect(repondentCaseSequence[2].showInSection).toBe('aboutRespondentCase');
    expect(repondentCaseSequence[2].getNextStep({})).toBe(
      '/respondent/keep-details-private/private_details_not_confirmed'
    );

    expect(repondentCaseSequence[3].url).toBe('/respondent/keep-details-private/private_details_confirmed');
    expect(repondentCaseSequence[3].showInSection).toBe('aboutRespondentCase');

    expect(repondentCaseSequence[4].url).toBe('/respondent/keep-details-private/private_details_not_confirmed');
    expect(repondentCaseSequence[4].showInSection).toBe('aboutRespondentCase');
    expect(repondentCaseSequence[4].getNextStep({})).toBe('/respondent/task-list');

    expect(repondentCaseSequence[5].url).toBe('/respondent/miam/miam-start');
    expect(repondentCaseSequence[5].showInSection).toBe('aboutRespondentCase');

    expect(repondentCaseSequence[6].url).toBe('/respondent/miam/willingness-to-attend-miam');
    expect(repondentCaseSequence[6].showInSection).toBe('aboutRespondentCase');
    expect(repondentCaseSequence[6].getNextStep({})).toBe('/respondent/miam/summary');

    expect(repondentCaseSequence[7].url).toBe('/respondent/miam/summary');
    expect(repondentCaseSequence[7].showInSection).toBe('aboutRespondentCase');
    expect(repondentCaseSequence[7].getNextStep({})).toBe('/respondent/task-list');

    expect(repondentCaseSequence[8].url).toBe('/respondent/confirmcontactdetails/personaldetails');
    expect(repondentCaseSequence[8].showInSection).toBe('aboutRespondentCase');
  });
});

import { respondentCaseSequence } from './respondentcaseSequence';

describe('applicant1Sequence', () => {
  test('should contain 1 entries in applicant 1 screen sequence', () => {
    expect(respondentCaseSequence).toHaveLength(18);
    expect(respondentCaseSequence[0].url).toBe('/respondent/task-list');
    expect(respondentCaseSequence[0].showInSection).toBe('aboutRespondentCase');
    expect(respondentCaseSequence[0].getNextStep({})).toBe('/respondent/task-list');

    expect(respondentCaseSequence[1].url).toBe('/respondent/keep-details-private/details_known');
    expect(respondentCaseSequence[1].showInSection).toBe('aboutRespondentCase');
    expect(respondentCaseSequence[1].getNextStep({})).toBe('/respondent/keep-details-private/start_alternative');

    expect(respondentCaseSequence[2].url).toBe('/respondent/keep-details-private/start_alternative');
    expect(respondentCaseSequence[2].showInSection).toBe('aboutRespondentCase');
    expect(respondentCaseSequence[2].getNextStep({})).toBe(
      '/respondent/keep-details-private/private_details_not_confirmed'
    );

    expect(respondentCaseSequence[3].url).toBe('/respondent/keep-details-private/private_details_confirmed');
    expect(respondentCaseSequence[3].showInSection).toBe('aboutRespondentCase');

    expect(respondentCaseSequence[4].url).toBe('/respondent/keep-details-private/private_details_not_confirmed');
    expect(respondentCaseSequence[4].showInSection).toBe('aboutRespondentCase');
    expect(respondentCaseSequence[4].getNextStep({})).toBe('/respondent/task-list');

    expect(respondentCaseSequence[5].url).toBe('/respondent/miam/miam-start');
    expect(respondentCaseSequence[5].showInSection).toBe('aboutRespondentCase');

    expect(respondentCaseSequence[6].url).toBe('/respondent/miam/willingness-to-attend-miam');
    expect(respondentCaseSequence[6].showInSection).toBe('aboutRespondentCase');
    expect(respondentCaseSequence[6].getNextStep({})).toBe('/respondent/miam/summary');

    expect(respondentCaseSequence[7].url).toBe('/respondent/miam/summary');
    expect(respondentCaseSequence[7].showInSection).toBe('aboutRespondentCase');
    expect(respondentCaseSequence[7].getNextStep({})).toBe('/respondent/task-list');

    expect(respondentCaseSequence[8].url).toBe('/respondent/confirm-contact-details/checkanswers');
    expect(respondentCaseSequence[8].showInSection).toBe('aboutRespondentCase');
    expect(respondentCaseSequence[8].getNextStep({})).toBe('/respondent/task-list');

    expect(respondentCaseSequence[9].url).toBe('/respondent/confirm-contact-details/personaldetails');
    expect(respondentCaseSequence[9].showInSection).toBe('aboutRespondentCase');
    expect(respondentCaseSequence[9].getNextStep({})).toBe('/respondent/task-list');
  });
});

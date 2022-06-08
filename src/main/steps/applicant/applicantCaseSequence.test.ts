import { applicantCaseSequence } from './applicantCaseSequence';

describe('applicant1Sequence', () => {
  test('should contain 1 entries in applicant 1 screen sequence', () => {
    expect(applicantCaseSequence).toHaveLength(12);
    expect(applicantCaseSequence[0].url).toBe('/applicant/task-list');
    expect(applicantCaseSequence[0].showInSection).toBe('aboutApplicantCase');
    expect(applicantCaseSequence[0].getNextStep({})).toBe('/applicant/task-list');

    // expect(applicantCaseSequence[1].url).toBe('/applicant/keep-details-private/details_known');
    // expect(applicantCaseSequence[1].showInSection).toBe('aboutApplicantCase');
    // expect(applicantCaseSequence[1].getNextStep({})).toBe('/respondent/keep-details-private/start_alternative');

    // expect(repondentCaseSequence[2].url).toBe('/respondent/keep-details-private/start_alternative');
    // expect(repondentCaseSequence[2].showInSection).toBe('aboutRespondentCase');
    // expect(repondentCaseSequence[2].getNextStep({})).toBe(
    //   '/respondent/keep-details-private/private_details_not_confirmed'
    // );

    // expect(repondentCaseSequence[3].url).toBe('/respondent/keep-details-private/private_details_confirmed');
    // expect(repondentCaseSequence[3].showInSection).toBe('aboutRespondentCase');

    // expect(repondentCaseSequence[4].url).toBe('/respondent/keep-details-private/private_details_not_confirmed');
    // expect(repondentCaseSequence[4].showInSection).toBe('aboutRespondentCase');
    // expect(repondentCaseSequence[4].getNextStep({})).toBe('/respondent/task-list');


    // expect(applicantCaseSequence[2].url).toBe('/applicant/confirm-contact-details/checkanswers');
    // expect(applicantCaseSequence[2].showInSection).toBe('aboutApplicantCase');
    // expect(applicantCaseSequence[2].getNextStep({})).toBe('/applicant/task-list');

    // expect(applicantCaseSequence[9].url).toBe('/applicant/confirm-contact-details/personaldetails');
    // expect(applicantCaseSequence[9].showInSection).toBe('aboutApplicantCase');
    // expect(applicantCaseSequence[9].getNextStep({})).toBe('/applicant/task-list');
  });
});

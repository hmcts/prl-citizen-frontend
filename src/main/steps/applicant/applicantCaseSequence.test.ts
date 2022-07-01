import { applicantCaseSequence } from './applicantCaseSequence';

describe('applicant1Sequence', () => {
  test('should contain 1 entries in applicant 1 screen sequence', () => {
    expect(applicantCaseSequence).toHaveLength(14);
    expect(applicantCaseSequence[0].url).toBe('/applicant/task-list');
    expect(applicantCaseSequence[0].showInSection).toBe('aboutApplicantCase');
    expect(applicantCaseSequence[0].getNextStep({})).toBe('/applicant/task-list');

    expect(applicantCaseSequence[1].url).toBe('/applicant/keep-details-private/private_details_confirmed');
    expect(applicantCaseSequence[1].showInSection).toBe('aboutApplicantCase');
    expect(applicantCaseSequence[1].getNextStep({})).toBe('/applicant/task-list');

    expect(applicantCaseSequence[2].url).toBe('/applicant/keep-details-private/private_details_not_confirmed');
    expect(applicantCaseSequence[2].showInSection).toBe('aboutApplicantCase');
    expect(applicantCaseSequence[2].getNextStep({})).toBe('/applicant/task-list');

    expect(applicantCaseSequence[3].url).toBe('/applicant/confirm-contact-details/checkanswers');
    expect(applicantCaseSequence[3].showInSection).toBe('aboutApplicantCase');
    expect(applicantCaseSequence[3].getNextStep({})).toBe('/applicant/task-list');

    expect(applicantCaseSequence[4].url).toBe('/applicant/confirm-contact-details/personaldetails');
    expect(applicantCaseSequence[4].showInSection).toBe('aboutApplicantCase');
    expect(applicantCaseSequence[4].getNextStep({})).toBe('/applicant/confirm-contact-details/checkanswers');

    expect(applicantCaseSequence[5].url).toBe('/applicant/confirm-contact-details/contactdetails');
    expect(applicantCaseSequence[5].showInSection).toBe('aboutApplicantCase');
    expect(applicantCaseSequence[5].getNextStep({})).toBe('/applicant/task-list');

    expect(applicantCaseSequence[6].url).toBe('/applicant/confirm-contact-details/addressdetails');
    expect(applicantCaseSequence[6].showInSection).toBe('aboutApplicantCase');
    expect(applicantCaseSequence[6].getNextStep({})).toBe('/applicant/confirm-contact-details/addresslookup');

    expect(applicantCaseSequence[7].url).toBe('/applicant/confirm-contact-details/addresslookup');
    expect(applicantCaseSequence[7].showInSection).toBe('aboutApplicantCase');
    expect(applicantCaseSequence[7].getNextStep({})).toBe('/applicant/confirm-contact-details/addresslookupcont');

    expect(applicantCaseSequence[8].url).toBe('/applicant/confirm-contact-details/addresslookupcont');
    expect(applicantCaseSequence[8].showInSection).toBe('aboutApplicantCase');
    expect(applicantCaseSequence[8].getNextStep({})).toBe('/applicant/confirm-contact-details/addresslookupcont');

    expect(applicantCaseSequence[9].url).toBe('/applicant/confirm-contact-details/addresslookup');
    expect(applicantCaseSequence[9].showInSection).toBe('aboutApplicantCase');
    expect(applicantCaseSequence[9].getNextStep({})).toBe('/applicant/task-list');

    expect(applicantCaseSequence[10].url).toBe('/applicant/confirm-contact-details/addressconfirmation');
    expect(applicantCaseSequence[10].showInSection).toBe('aboutApplicantCase');
    expect(applicantCaseSequence[10].getNextStep({})).toBe('/applicant/task-list');

    expect(applicantCaseSequence[11].url).toBe('/applicant/confirm-contact-details/addressblank');
    expect(applicantCaseSequence[11].showInSection).toBe('aboutApplicantCase');
    expect(applicantCaseSequence[11].getNextStep({})).toBe('/applicant/task-list');

    expect(applicantCaseSequence[12].url).toBe('/applicant/confirm-contact-details/addresshistory');
    expect(applicantCaseSequence[12].showInSection).toBe('aboutApplicantCase');
    expect(applicantCaseSequence[12].getNextStep({})).toBe('/applicant/task-list');
  });
});

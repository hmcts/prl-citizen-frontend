import { applicantCaseSequence } from './applicantCaseSequence';

describe('applicant1Sequence', () => {
  test('should contain 1 entries in applicant 1 screen sequence', () => {
    expect(applicantCaseSequence).toHaveLength(67);
    expect(applicantCaseSequence[0].url).toBe('/applicant/task-list');
    expect(applicantCaseSequence[0].showInSection).toBe('aboutApplicantCase');
    expect(applicantCaseSequence[0].getNextStep({})).toBe('/applicant/task-list');

    expect(applicantCaseSequence[1].url).toBe('/applicant/keep-details-private/details_known');
    expect(applicantCaseSequence[1].showInSection).toBe('aboutApplicantCase');
    expect(applicantCaseSequence[1].getNextStep({})).toBe('/applicant/keep-details-private/start_alternative');

    expect(applicantCaseSequence[2].url).toBe('/applicant/keep-details-private/start_alternative');
    expect(applicantCaseSequence[2].showInSection).toBe('aboutApplicantCase');
    expect(applicantCaseSequence[2].getNextStep({})).toBe(
      '/applicant/keep-details-private/private_details_not_confirmed'
    );

    expect(applicantCaseSequence[3].url).toBe('/applicant/keep-details-private/private_details_confirmed');
    expect(applicantCaseSequence[3].showInSection).toBe('aboutApplicantCase');
    expect(applicantCaseSequence[3].getNextStep({})).toBe('/applicant/task-list');

    expect(applicantCaseSequence[4].url).toBe('/applicant/keep-details-private/private_details_not_confirmed');
    expect(applicantCaseSequence[4].showInSection).toBe('aboutApplicantCase');
    expect(applicantCaseSequence[4].getNextStep({})).toBe('/applicant/task-list');

    expect(applicantCaseSequence[5].url).toBe('/applicant/confirm-contact-details/checkanswers');
    expect(applicantCaseSequence[5].showInSection).toBe('aboutApplicantCase');
    expect(applicantCaseSequence[5].getNextStep({})).toBe('/applicant/task-list');

    expect(applicantCaseSequence[6].url).toBe('/applicant/confirm-contact-details/personaldetails');
    expect(applicantCaseSequence[6].showInSection).toBe('aboutApplicantCase');
    expect(applicantCaseSequence[6].getNextStep({})).toBe('/applicant/task-list');

    expect(applicantCaseSequence[7].url).toBe('/applicant/confirm-contact-details/contactdetails');
    expect(applicantCaseSequence[7].showInSection).toBe('aboutApplicantCase');
    expect(applicantCaseSequence[7].getNextStep({})).toBe('/applicant/task-list');

    expect(applicantCaseSequence[8].url).toBe('/applicant/confirm-contact-details/addressdetails');
    expect(applicantCaseSequence[8].showInSection).toBe('aboutApplicantCase');
    expect(applicantCaseSequence[8].getNextStep({})).toBe('/applicant/confirm-contact-details/addresslookup');

    expect(applicantCaseSequence[9].url).toBe('/applicant/confirm-contact-details/addresslookup');
    expect(applicantCaseSequence[9].showInSection).toBe('aboutApplicantCase');
    expect(applicantCaseSequence[9].getNextStep({})).toBe('/applicant/confirm-contact-details/addresslookupcont');

    expect(applicantCaseSequence[10].url).toBe('/applicant/confirm-contact-details/addresslookupcont');
    expect(applicantCaseSequence[10].showInSection).toBe('aboutApplicantCase');
    expect(applicantCaseSequence[10].getNextStep({})).toBe('/applicant/confirm-contact-details/addressconfirmation');

    expect(applicantCaseSequence[11].url).toBe('/applicant/confirm-contact-details/addresslookup');
    expect(applicantCaseSequence[11].showInSection).toBe('aboutApplicantCase');
    expect(applicantCaseSequence[11].getNextStep({})).toBe('/applicant/confirm-contact-details/addressconfirmation');

    expect(applicantCaseSequence[12].url).toBe('/applicant/confirm-contact-details/addressconfirmation');
    expect(applicantCaseSequence[12].showInSection).toBe('aboutApplicantCase');
    expect(applicantCaseSequence[12].getNextStep({})).toBe('/applicant/task-list');

    expect(applicantCaseSequence[13].url).toBe('/applicant/confirm-contact-details/addressblank');
    expect(applicantCaseSequence[13].showInSection).toBe('aboutApplicantCase');
    expect(applicantCaseSequence[13].getNextStep({})).toBe('/applicant/task-list');

    expect(applicantCaseSequence[14].url).toBe('/applicant/confirm-contact-details/addresshistory');
    expect(applicantCaseSequence[14].showInSection).toBe('aboutApplicantCase');
    expect(applicantCaseSequence[14].getNextStep({})).toBe('/applicant/task-list');

    expect(applicantCaseSequence[15].url).toBe('/applicant/confirm-contact-details/postaladdress');
    expect(applicantCaseSequence[15].showInSection).toBe('aboutApplicantCase');
    expect(applicantCaseSequence[15].getNextStep({})).toBe('/applicant/task-list');

    expect(applicantCaseSequence[16].url).toBe('/applicant/support-you-need-during-case');
    expect(applicantCaseSequence[16].showInSection).toBe('aboutApplicantCase');
    expect(applicantCaseSequence[16].getNextStep({})).toBe(
      '/applicant/support-you-need-during-case/language-requirements'
    );

    expect(applicantCaseSequence[17].url).toBe('/applicant/support-you-need-during-case/language-requirements');
    expect(applicantCaseSequence[17].showInSection).toBe('aboutApplicantCase');
    expect(applicantCaseSequence[17].getNextStep({})).toBe(
      '/applicant/support-you-need-during-case/reasonable-adjustments'
    );

    expect(applicantCaseSequence[18].url).toBe('/applicant/support-you-need-during-case/reasonable-adjustments');
    expect(applicantCaseSequence[18].showInSection).toBe('aboutApplicantCase');
    expect(applicantCaseSequence[18].getNextStep({})).toBe('/applicant/support-you-need-during-case/documents-support');

    expect(applicantCaseSequence[19].url).toBe('/applicant/support-you-need-during-case/documents-support');
    expect(applicantCaseSequence[19].showInSection).toBe('aboutApplicantCase');
    expect(applicantCaseSequence[19].getNextStep({})).toBe(
      '/applicant/support-you-need-during-case/communication-help'
    );

    expect(applicantCaseSequence[20].url).toBe('/applicant/support-you-need-during-case/communication-help');
    expect(applicantCaseSequence[20].showInSection).toBe('aboutApplicantCase');
    expect(applicantCaseSequence[20].getNextStep({})).toBe(
      '/applicant/support-you-need-during-case/court-hearing-support'
    );

    expect(applicantCaseSequence[21].url).toBe('/applicant/support-you-need-during-case/court-hearing-support');
    expect(applicantCaseSequence[21].showInSection).toBe('aboutApplicantCase');
    expect(applicantCaseSequence[21].getNextStep({})).toBe(
      '/applicant/support-you-need-during-case/court-hearing-comfort'
    );

    expect(applicantCaseSequence[22].url).toBe('/applicant/support-you-need-during-case/court-hearing-comfort');
    expect(applicantCaseSequence[22].showInSection).toBe('aboutApplicantCase');
    expect(applicantCaseSequence[22].getNextStep({})).toBe(
      '/applicant/support-you-need-during-case/travelling-to-court'
    );

    expect(applicantCaseSequence[23].url).toBe('/applicant/support-you-need-during-case/travelling-to-court');
    expect(applicantCaseSequence[23].showInSection).toBe('aboutApplicantCase');
    expect(applicantCaseSequence[23].getNextStep({})).toBe(
      '/applicant/support-you-need-during-case/unable-to-take-court-proceedings'
    );

    expect(applicantCaseSequence[24].url).toBe(
      '/applicant/support-you-need-during-case/unable-to-take-court-proceedings'
    );
    expect(applicantCaseSequence[24].showInSection).toBe('aboutApplicantCase');
    expect(applicantCaseSequence[24].getNextStep({})).toBe(
      '/applicant/support-you-need-during-case/safety-arrangements'
    );

    expect(applicantCaseSequence[25].url).toBe('/applicant/support-you-need-during-case/safety-arrangements');
    expect(applicantCaseSequence[25].showInSection).toBe('aboutApplicantCase');
    expect(applicantCaseSequence[25].getNextStep({})).toBe('/applicant/support-you-need-during-case/summary');

    expect(applicantCaseSequence[26].url).toBe('/applicant/support-you-need-during-case/summary');
    expect(applicantCaseSequence[26].showInSection).toBe('aboutApplicantCase');
    expect(applicantCaseSequence[26].getNextStep({})).toBe('/applicant/task-list');
  });
});

//import { mockRequest } from '../../../test/unit/utils/mockRequest';

import { applicantCaseSequence } from './applicantCaseSequence';

describe('applicant1Sequence', () => {
  test('should contain 1 entries in applicant 1 screen sequence', () => {
    expect(applicantCaseSequence).toHaveLength(77);
    expect(applicantCaseSequence[0].url).toBe('/applicant/task-list');
    expect(applicantCaseSequence[0].showInSection).toBe('aboutApplicantCase');
    expect(applicantCaseSequence[0].getNextStep({})).toBe('/applicant/task-list');

    expect(applicantCaseSequence[1].url).toBe('/applicant/keep-details-private/details_known');
    expect(applicantCaseSequence[1].showInSection).toBe('aboutApplicantCase');
    expect(applicantCaseSequence[1].getNextStep({})).toBe('/applicant/keep-details-private/start_alternative');

    expect(applicantCaseSequence[2].url).toBe('/applicant/keep-details-private/start_alternative');
    expect(applicantCaseSequence[2].showInSection).toBe('aboutApplicantCase');
    expect(applicantCaseSequence[2].getNextStep({})).toBe('/applicant/keep-details-private/save');

    expect(applicantCaseSequence[3].url).toBe('/applicant/keep-details-private/private_details_confirmed');
    expect(applicantCaseSequence[3].showInSection).toBe('aboutApplicantCase');
    expect(applicantCaseSequence[3].getNextStep({})).toBe('/applicant/task-list');

    expect(applicantCaseSequence[4].url).toBe('/applicant/keep-details-private/private_details_not_confirmed');
    expect(applicantCaseSequence[4].showInSection).toBe('aboutApplicantCase');
    expect(applicantCaseSequence[4].getNextStep({})).toBe('/applicant/task-list');

    expect(applicantCaseSequence[5].url).toBe('/applicant/confirm-contact-details/checkanswers');
    expect(applicantCaseSequence[5].showInSection).toBe('aboutApplicantCase');
    expect(applicantCaseSequence[5].getNextStep({})).toBe('/applicant/confirm-contact-details/save');

    expect(applicantCaseSequence[6].url).toBe('/applicant/confirm-contact-details/personaldetails');
    expect(applicantCaseSequence[6].showInSection).toBe('aboutApplicantCase');
    expect(applicantCaseSequence[6].getNextStep({})).toBe('/applicant/confirm-contact-details/checkanswers');

    expect(applicantCaseSequence[7].url).toBe('/applicant/confirm-contact-details/contactdetails');
    expect(applicantCaseSequence[7].showInSection).toBe('aboutApplicantCase');
    expect(applicantCaseSequence[7].getNextStep({})).toBe('/applicant/confirm-contact-details/checkanswers');

    expect(applicantCaseSequence[8].url).toBe('/applicant/confirm-contact-details/addressdetails');
    expect(applicantCaseSequence[8].showInSection).toBe('aboutApplicantCase');
    expect(applicantCaseSequence[8].getNextStep({})).toBe('/applicant/confirm-contact-details/address/lookup');

    expect(applicantCaseSequence[9].url).toBe('/applicant/confirm-contact-details/address/lookup');
    expect(applicantCaseSequence[9].showInSection).toBe('aboutApplicantCase');
    expect(applicantCaseSequence[9].getNextStep({})).toBe('/applicant/confirm-contact-details/address/select');

    expect(applicantCaseSequence[10].url).toBe('/applicant/confirm-contact-details/address/select');
    expect(applicantCaseSequence[10].showInSection).toBe('aboutApplicantCase');
    expect(applicantCaseSequence[10].getNextStep({})).toBe('/applicant/confirm-contact-details/addressconfirmation');

    expect(applicantCaseSequence[11].url).toBe('/applicant/confirm-contact-details/address/lookup');
    expect(applicantCaseSequence[11].showInSection).toBe('aboutApplicantCase');
    expect(applicantCaseSequence[11].getNextStep({})).toBe('/applicant/confirm-contact-details/addressconfirmation');

    expect(applicantCaseSequence[12].url).toBe('/applicant/confirm-contact-details/addressconfirmation');
    expect(applicantCaseSequence[12].showInSection).toBe('aboutApplicantCase');
    expect(applicantCaseSequence[12].getNextStep({})).toBe('/applicant/confirm-contact-details/addresshistory');

    expect(applicantCaseSequence[13].url).toBe('/applicant/confirm-contact-details/address/manual');
    expect(applicantCaseSequence[13].showInSection).toBe('aboutApplicantCase');
    expect(applicantCaseSequence[13].getNextStep({})).toBe('/applicant/confirm-contact-details/addresshistory');

    expect(applicantCaseSequence[14].url).toBe('/applicant/confirm-contact-details/addresshistory');
    expect(applicantCaseSequence[14].showInSection).toBe('aboutApplicantCase');
    expect(applicantCaseSequence[14].getNextStep({})).toBe('/applicant/confirm-contact-details/checkanswers');

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

    // expect(applicantCaseSequence[18].url).toBe('/applicant/support-you-need-during-case/reasonable-adjustments');
    // expect(applicantCaseSequence[18].showInSection).toBe('aboutApplicantCase');
    // expect(applicantCaseSequence[18].getNextStep(applicantReasonableAdjustmentsMockData.session.userCase)).toBe(
    //   '/applicant/support-you-need-during-case/documents-support'
    // );

    // expect(applicantCaseSequence[19].url).toBe('/applicant/support-you-need-during-case/documents-support');
    // expect(applicantCaseSequence[19].showInSection).toBe('aboutApplicantCase');
    // expect(applicantCaseSequence[19].getNextStep(applicantReasonableAdjustmentsMockData.session.userCase)).toBe(
    //   '/applicant/support-you-need-during-case/communication-help'
    // );

    // expect(applicantCaseSequence[20].url).toBe('/applicant/support-you-need-during-case/communication-help');
    // expect(applicantCaseSequence[20].showInSection).toBe('aboutApplicantCase');
    // expect(applicantCaseSequence[20].getNextStep(applicantReasonableAdjustmentsMockData.session.userCase)).toBe(
    //   '/applicant/support-you-need-during-case/court-hearing-support'
    // );

    // expect(applicantCaseSequence[21].url).toBe('/applicant/support-you-need-during-case/court-hearing-support');
    // expect(applicantCaseSequence[21].showInSection).toBe('aboutApplicantCase');
    // expect(applicantCaseSequence[21].getNextStep(applicantReasonableAdjustmentsMockData.session.userCase)).toBe(
    //   '/applicant/support-you-need-during-case/court-hearing-comfort'
    // );

    // expect(applicantCaseSequence[22].url).toBe('/applicant/support-you-need-during-case/court-hearing-comfort');
    // expect(applicantCaseSequence[22].showInSection).toBe('aboutApplicantCase');
    // expect(applicantCaseSequence[22].getNextStep(applicantReasonableAdjustmentsMockData.session.userCase)).toBe(
    //   '/applicant/support-you-need-during-case/travelling-to-court'
    // );

    // expect(applicantCaseSequence[23].url).toBe('/applicant/support-you-need-during-case/travelling-to-court');
    // expect(applicantCaseSequence[23].showInSection).toBe('aboutApplicantCase');
    // expect(applicantCaseSequence[23].getNextStep(applicantReasonableAdjustmentsMockData.session.userCase)).toBe(
    //   '/applicant/support-you-need-during-case/unable-to-take-court-proceedings'
    // );

    // expect(applicantCaseSequence[24].url).toBe(
    //   '/applicant/support-you-need-during-case/unable-to-take-court-proceedings'
    // );
    // expect(applicantCaseSequence[24].showInSection).toBe('aboutApplicantCase');
    // expect(applicantCaseSequence[24].getNextStep(applicantReasonableAdjustmentsMockData.session.userCase)).toBe(
    //   '/applicant/support-you-need-during-case/summary'
    // );

    expect(applicantCaseSequence[25].url).toBe('/applicant/support-you-need-during-case/safety-arrangements');
    expect(applicantCaseSequence[25].showInSection).toBe('aboutApplicantCase');
    expect(applicantCaseSequence[25].getNextStep({})).toBe('/applicant/support-you-need-during-case/summary');

    expect(applicantCaseSequence[26].url).toBe('/applicant/support-you-need-during-case/summary');
    expect(applicantCaseSequence[26].showInSection).toBe('aboutApplicantCase');
    expect(applicantCaseSequence[26].getNextStep({})).toBe('/applicant/support-you-need-during-case/summary/save');

    expect(applicantCaseSequence[27].url).toBe('/applicant/yourdocuments/alldocuments/alldocuments');
    expect(applicantCaseSequence[27].showInSection).toBe('aboutApplicantCase');
    expect(applicantCaseSequence[27].getNextStep({})).toBe('/applicant/task-list');

    expect(applicantCaseSequence[28].url).toBe('/applicant/yourdocuments/alldocuments/alldocuments');
    expect(applicantCaseSequence[28].showInSection).toBe('aboutApplicantCase');
    expect(applicantCaseSequence[28].getNextStep({})).toBe(
      '/applicant/yourdocuments/alldocuments/yourwitnessstatements'
    );

    expect(applicantCaseSequence[29].url).toBe('/applicant/yourdocuments/alldocuments/yourwitnessstatements');
    expect(applicantCaseSequence[29].showInSection).toBe('aboutApplicantCase');
    expect(applicantCaseSequence[29].getNextStep({})).toBe('/applicant/yourdocuments/alldocuments/alldocuments');

    expect(applicantCaseSequence[30].url).toBe('/applicant/yourdocuments/alldocuments/alldocuments');
    expect(applicantCaseSequence[30].showInSection).toBe('aboutApplicantCase');
    expect(applicantCaseSequence[30].getNextStep({})).toBe('/applicant/yourdocuments/alldocuments/orders');

    expect(applicantCaseSequence[31].url).toBe('/applicant/yourdocuments/alldocuments/orders');
    expect(applicantCaseSequence[31].showInSection).toBe('aboutApplicantCase');
    expect(applicantCaseSequence[31].getNextStep({})).toBe('/applicant/yourdocuments/alldocuments/alldocuments');

    expect(applicantCaseSequence[32].url).toBe('/applicant/yourdocuments/alldocuments/alldocuments');
    expect(applicantCaseSequence[32].showInSection).toBe('aboutApplicantCase');
    expect(applicantCaseSequence[32].getNextStep({})).toBe('/applicant/yourdocuments/alldocuments/positionstatements');

    expect(applicantCaseSequence[33].url).toBe('/applicant/yourdocuments/alldocuments/positionstatements');
    expect(applicantCaseSequence[33].showInSection).toBe('aboutApplicantCase');
    expect(applicantCaseSequence[33].getNextStep({})).toBe('/applicant/yourdocuments/alldocuments/alldocuments');

    expect(applicantCaseSequence[34].url).toBe('/applicant/yourdocuments/alldocuments/alldocuments');
    expect(applicantCaseSequence[34].showInSection).toBe('aboutApplicantCase');
    expect(applicantCaseSequence[34].getNextStep({})).toBe(
      '/applicant/yourdocuments/alldocuments/otherpeoplewitnessstatement'
    );

    expect(applicantCaseSequence[35].url).toBe('/applicant/yourdocuments/alldocuments/otherpeoplewitnessstatement');
    expect(applicantCaseSequence[35].showInSection).toBe('aboutApplicantCase');
    expect(applicantCaseSequence[35].getNextStep({})).toBe('/applicant/yourdocuments/alldocuments/alldocuments');

    expect(applicantCaseSequence[36].url).toBe('/applicant/task-list');
    expect(applicantCaseSequence[36].showInSection).toBe('aboutApplicantCase');
    expect(applicantCaseSequence[36].getNextStep({})).toBe(
      '/applicant/yourdocuments/alldocuments/yourwitnessstatements'
    );

    expect(applicantCaseSequence[37].url).toBe('/applicant/yourdocuments/alldocuments/yourwitnessstatements');
    expect(applicantCaseSequence[37].showInSection).toBe('aboutApplicantCase');
    expect(applicantCaseSequence[37].getNextStep({})).toBe('/applicant/task-list');

    expect(applicantCaseSequence[38].url).toBe('/applicant/yourdocuments/alldocuments/alldocuments');
    expect(applicantCaseSequence[38].showInSection).toBe('aboutApplicantCase');
    expect(applicantCaseSequence[38].getNextStep({})).toBe('/applicant/yourdocuments/alldocuments/medicalreports');

    expect(applicantCaseSequence[39].url).toBe('/applicant/yourdocuments/alldocuments/medicalreports');
    expect(applicantCaseSequence[39].showInSection).toBe('aboutApplicantCase');
    expect(applicantCaseSequence[39].getNextStep({})).toBe('/applicant/yourdocuments/alldocuments/alldocuments');

    expect(applicantCaseSequence[40].url).toBe('/applicant/yourdocuments/alldocuments/alldocuments');
    expect(applicantCaseSequence[40].showInSection).toBe('aboutApplicantCase');
    expect(applicantCaseSequence[40].getNextStep({})).toBe('/applicant/yourdocuments/alldocuments/digitaldownloads');

    expect(applicantCaseSequence[41].url).toBe('/applicant/yourdocuments/alldocuments/digitaldownloads');
    expect(applicantCaseSequence[41].showInSection).toBe('aboutApplicantCase');
    expect(applicantCaseSequence[41].getNextStep({})).toBe('/applicant/yourdocuments/alldocuments/alldocuments');

    expect(applicantCaseSequence[42].url).toBe('/applicant/yourdocuments/alldocuments/alldocuments');
    expect(applicantCaseSequence[42].showInSection).toBe('aboutApplicantCase');
    expect(applicantCaseSequence[42].getNextStep({})).toBe('/applicant/yourdocuments/alldocuments/lettersfromschool');

    expect(applicantCaseSequence[43].url).toBe('/applicant/yourdocuments/alldocuments/lettersfromschool');
    expect(applicantCaseSequence[43].showInSection).toBe('aboutApplicantCase');
    expect(applicantCaseSequence[43].getNextStep({})).toBe('/applicant/yourdocuments/alldocuments/alldocuments');

    expect(applicantCaseSequence[44].url).toBe('/applicant/yourdocuments/alldocuments/alldocuments');
    expect(applicantCaseSequence[44].showInSection).toBe('aboutApplicantCase');
    expect(applicantCaseSequence[44].getNextStep({})).toBe('/applicant/yourdocuments/alldocuments/medicalrecords');

    expect(applicantCaseSequence[45].url).toBe('/applicant/yourdocuments/alldocuments/medicalrecords');
    expect(applicantCaseSequence[45].showInSection).toBe('aboutApplicantCase');
    expect(applicantCaseSequence[45].getNextStep({})).toBe('/applicant/yourdocuments/alldocuments/alldocuments');

    expect(applicantCaseSequence[46].url).toBe('/applicant/yourdocuments/alldocuments/alldocuments');
    expect(applicantCaseSequence[46].showInSection).toBe('aboutApplicantCase');
    expect(applicantCaseSequence[46].getNextStep({})).toBe('/applicant/yourdocuments/alldocuments/previousorders');

    expect(applicantCaseSequence[47].url).toBe('/applicant/yourdocuments/alldocuments/previousorders');
    expect(applicantCaseSequence[47].showInSection).toBe('aboutApplicantCase');
    expect(applicantCaseSequence[47].getNextStep({})).toBe('/applicant/yourdocuments/alldocuments/alldocuments');

    expect(applicantCaseSequence[48].url).toBe('/applicant/yourdocuments/alldocuments/alldocuments');
    expect(applicantCaseSequence[48].showInSection).toBe('aboutApplicantCase');
    expect(applicantCaseSequence[48].getNextStep({})).toBe(
      '/applicant/yourdocuments/alldocuments/witness_availability'
    );

    expect(applicantCaseSequence[49].url).toBe('/applicant/yourdocuments/alldocuments/witness_availability');
    expect(applicantCaseSequence[49].showInSection).toBe('aboutApplicantCase');
    expect(applicantCaseSequence[49].getNextStep({})).toBe('/applicant/yourdocuments/alldocuments/alldocuments');

    expect(applicantCaseSequence[50].url).toBe('/applicant/yourdocuments/alldocuments/alldocuments');
    expect(applicantCaseSequence[50].showInSection).toBe('aboutApplicantCase');
    expect(applicantCaseSequence[50].getNextStep({})).toBe(
      '/applicant/yourdocuments/alldocuments/paternity_test_reports'
    );

    expect(applicantCaseSequence[51].url).toBe('/applicant/yourdocuments/alldocuments/paternity_test_reports');
    expect(applicantCaseSequence[51].showInSection).toBe('aboutApplicantCase');
    expect(applicantCaseSequence[51].getNextStep({})).toBe('/applicant/yourdocuments/alldocuments/alldocuments');

    expect(applicantCaseSequence[52].url).toBe('/applicant/yourdocuments/alldocuments/alldocuments');
    expect(applicantCaseSequence[52].showInSection).toBe('aboutApplicantCase');
    expect(applicantCaseSequence[52].getNextStep({})).toBe('/applicant/yourdocuments/alldocuments/drug_alcohol_tests');

    expect(applicantCaseSequence[53].url).toBe('/applicant/yourdocuments/alldocuments/drug_alcohol_tests');
    expect(applicantCaseSequence[53].showInSection).toBe('aboutApplicantCase');
    expect(applicantCaseSequence[53].getNextStep({})).toBe('/applicant/yourdocuments/alldocuments/alldocuments');

    expect(applicantCaseSequence[54].url).toBe('/applicant/yourdocuments/alldocuments/alldocuments');
    expect(applicantCaseSequence[54].showInSection).toBe('aboutApplicantCase');
    expect(applicantCaseSequence[54].getNextStep({})).toBe('/applicant/yourdocuments/alldocuments/police_disclosures');

    expect(applicantCaseSequence[55].url).toBe('/applicant/yourdocuments/alldocuments/police_disclosures');
    expect(applicantCaseSequence[55].showInSection).toBe('aboutApplicantCase');
    expect(applicantCaseSequence[55].getNextStep({})).toBe('/applicant/yourdocuments/alldocuments/alldocuments');

    expect(applicantCaseSequence[56].url).toBe('/applicant/upload-document');
    expect(applicantCaseSequence[56].showInSection).toBe('aboutRespondentCase');
    expect(applicantCaseSequence[56].getNextStep({})).toBe('/applicant/upload-document/start');

    expect(applicantCaseSequence[57].url).toBe('/applicant/upload-document/start');
    expect(applicantCaseSequence[57].showInSection).toBe('aboutRespondentCase');
    expect(applicantCaseSequence[57].getNextStep({})).toBe('/applicant/upload-document/document-sharing-details');

    expect(applicantCaseSequence[58].url).toBe('/applicant/upload-document/document-sharing-details');
    expect(applicantCaseSequence[58].showInSection).toBe('aboutRespondentCase');
    expect(applicantCaseSequence[58].getNextStep({})).toBe('/applicant/upload-document/upload-your-documents');

    expect(applicantCaseSequence[59].url).toBe('/applicant/upload-document/upload-your-documents');
    expect(applicantCaseSequence[59].showInSection).toBe('aboutRespondentCase');
    expect(applicantCaseSequence[59].getNextStep({})).toBe('/applicant/upload-document/upload-documents-success');

    expect(applicantCaseSequence[60].url).toBe('/applicant/upload-document/upload-documents-success');
    expect(applicantCaseSequence[60].showInSection).toBe('aboutRespondentCase');
    expect(applicantCaseSequence[60].getNextStep({})).toBe('/applicant/task-list');

    expect(applicantCaseSequence[61].url).toBe('/applicant/yourdocuments/alldocuments/alldocuments');
    expect(applicantCaseSequence[61].showInSection).toBe('aboutApplicantCase');
    expect(applicantCaseSequence[61].getNextStep({})).toBe(
      '/applicant/yourdocuments/alldocuments/tenancy_and_mortgage_availability'
    );

    expect(applicantCaseSequence[62].url).toBe(
      '/applicant/yourdocuments/alldocuments/tenancy_and_mortgage_availability'
    );
    expect(applicantCaseSequence[62].showInSection).toBe('aboutApplicantCase');
    expect(applicantCaseSequence[62].getNextStep({})).toBe('/applicant/yourdocuments/alldocuments/alldocuments');

    expect(applicantCaseSequence[63].url).toBe('/applicant/yourdocuments/alldocuments/alldocuments');
    expect(applicantCaseSequence[63].showInSection).toBe('aboutApplicantCase');
    expect(applicantCaseSequence[63].getNextStep({})).toBe('/applicant/yourdocuments/alldocuments/applicationmade');

    expect(applicantCaseSequence[64].url).toBe('/applicant/yourdocuments/alldocuments/applicationmade');
    expect(applicantCaseSequence[64].showInSection).toBe('aboutApplicantCase');
    expect(applicantCaseSequence[64].getNextStep({})).toBe('/applicant/yourdocuments/alldocuments/alldocuments');

    expect(applicantCaseSequence[65].url).toBe('/applicant/yourdocuments/alldocuments/alldocuments');
    expect(applicantCaseSequence[65].showInSection).toBe('aboutApplicantCase');
    expect(applicantCaseSequence[65].getNextStep({})).toBe('/applicant/yourdocuments/alldocuments/otherDocuments');

    expect(applicantCaseSequence[66].url).toBe('/applicant/yourdocuments/alldocuments/otherDocuments');
    expect(applicantCaseSequence[66].showInSection).toBe('aboutApplicantCase');
    expect(applicantCaseSequence[66].getNextStep({})).toBe('/applicant/yourdocuments/alldocuments/alldocuments');

    expect(applicantCaseSequence[67].url).toBe('/applicant/task-list');
    expect(applicantCaseSequence[67].showInSection).toBe('aboutApplicantCase');
    expect(applicantCaseSequence[67].getNextStep({})).toBe('/applicant/witnessstatements');

    expect(applicantCaseSequence[68].url).toBe('/applicant/witnessstatements');
    expect(applicantCaseSequence[68].showInSection).toBe('aboutApplicantCase');
    expect(applicantCaseSequence[68].getNextStep({})).toBe('/applicant/task-list');

    expect(applicantCaseSequence[69].url).toBe('/applicant/yourdocuments/alldocuments/alldocuments');
    expect(applicantCaseSequence[69].showInSection).toBe('aboutRespondentCase');
    expect(applicantCaseSequence[69].getNextStep({})).toBe('/applicant/yourdocuments/alldocuments/safeguarding_letter');

    expect(applicantCaseSequence[70].url).toBe('/applicant/yourdocuments/alldocuments/safeguarding_letter');
    expect(applicantCaseSequence[70].showInSection).toBe('aboutRespondentCase');
    expect(applicantCaseSequence[70].getNextStep({})).toBe('/applicant/yourdocuments/alldocuments/alldocuments');

    expect(applicantCaseSequence[71].url).toBe('/applicant/yourdocuments/alldocuments/alldocuments');
    expect(applicantCaseSequence[71].showInSection).toBe('aboutRespondentCase');
    expect(applicantCaseSequence[71].getNextStep({})).toBe('/applicant/yourdocuments/alldocuments/section7_report');

    expect(applicantCaseSequence[72].url).toBe('/applicant/yourdocuments/alldocuments/section7_report');
    expect(applicantCaseSequence[72].showInSection).toBe('aboutRespondentCase');
    expect(applicantCaseSequence[72].getNextStep({})).toBe('/applicant/yourdocuments/alldocuments/alldocuments');

    expect(applicantCaseSequence[73].url).toBe('/applicant/yourdocuments/alldocuments/alldocuments');
    expect(applicantCaseSequence[73].showInSection).toBe('aboutRespondentCase');
    expect(applicantCaseSequence[73].getNextStep({})).toBe('/applicant/yourdocuments/alldocuments/section37_report');

    expect(applicantCaseSequence[74].url).toBe('/applicant/yourdocuments/alldocuments/section37_report');
    expect(applicantCaseSequence[74].showInSection).toBe('aboutRespondentCase');
    expect(applicantCaseSequence[74].getNextStep({})).toBe('/applicant/yourdocuments/alldocuments/alldocuments');

    expect(applicantCaseSequence[75].url).toBe('/applicant/yourdocuments/alldocuments/alldocuments');
    expect(applicantCaseSequence[75].showInSection).toBe('aboutRespondentCase');
    expect(applicantCaseSequence[75].getNextStep({})).toBe('/applicant/yourdocuments/alldocuments/risk_assessment_16a');

    expect(applicantCaseSequence[76].url).toBe('/applicant/yourdocuments/alldocuments/risk_assessment_16a');
    expect(applicantCaseSequence[76].showInSection).toBe('aboutRespondentCase');
    expect(applicantCaseSequence[76].getNextStep({})).toBe('/applicant/yourdocuments/alldocuments/alldocuments');
  });
});

// const applicantReasonableAdjustmentsMockData = mockRequest({
//   session: {
//     userCase: {
//       reasonableAdjustments: [
//         'I need documents in an alternative format',
//         'I need help communicating and understanding',
//         'I need to bring support with me to a hearing',
//         'I need something to feel comfortable during a hearing',
//         'I need help travelling to, or moving around court buildings',
//         'Is there a reason you are unable to take part in the court proceedings?',
//         'No, I do not need any extra support at this time',
//       ],
//       appplicantDocsSupportPage: ['none'],
//       appplicantHelpCommunicationPage: ['none'],
//       appplicantCourtHearingPage: ['none'],
//       appplicantCourtComfortPage: ['none'],
//       appplicantTravellingToCourtPage: ['none'],
//       applicantUnableToTakeCourtProceedings: ['none'],
//     },
//   },
// });

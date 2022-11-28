import { respondentCaseSequence } from './respondentcaseSequence';

describe('respondent1Sequence', () => {
  test('should contain 1 entries in respondent 1 screen sequence', () => {
    expect(respondentCaseSequence).toHaveLength(88);
    expect(respondentCaseSequence[0].url).toBe('/respondent/task-list');
    expect(respondentCaseSequence[0].showInSection).toBe('aboutRespondentCase');
    expect(respondentCaseSequence[0].getNextStep({})).toBe('/respondent/task-list');

    expect(respondentCaseSequence[1].url).toBe('/tasklistresponse/consent-to-application/consent');
    expect(respondentCaseSequence[1].showInSection).toBe('aboutRespondentCase');
    expect(respondentCaseSequence[1].getNextStep({})).toBe('/tasklistresponse/consent-to-application/summary');

    expect(respondentCaseSequence[2].url).toBe('/tasklistresponse/consent-to-application/summary');
    expect(respondentCaseSequence[2].showInSection).toBe('aboutRespondentCase');
    expect(respondentCaseSequence[2].getNextStep({})).toBe('/tasklistresponse/consent-to-application/save');

    expect(respondentCaseSequence[3].url).toBe('/respondent/keep-details-private/details_known');
    expect(respondentCaseSequence[3].showInSection).toBe('aboutRespondentCase');
    expect(respondentCaseSequence[3].getNextStep({})).toBe('/respondent/keep-details-private/start_alternative');

    expect(respondentCaseSequence[4].url).toBe('/respondent/keep-details-private/start_alternative');
    expect(respondentCaseSequence[4].showInSection).toBe('aboutRespondentCase');
    expect(respondentCaseSequence[4].getNextStep({})).toBe('/respondent/keep-details-private/save');

    expect(respondentCaseSequence[5].url).toBe('/respondent/keep-details-private/private_details_confirmed');
    expect(respondentCaseSequence[5].showInSection).toBe('aboutRespondentCase');
    expect(respondentCaseSequence[5].getNextStep({})).toBe('/respondent/task-list');

    expect(respondentCaseSequence[6].url).toBe('/respondent/keep-details-private/private_details_not_confirmed');
    expect(respondentCaseSequence[6].showInSection).toBe('aboutRespondentCase');
    expect(respondentCaseSequence[6].getNextStep({})).toBe('/respondent/task-list');

    expect(respondentCaseSequence[7].url).toBe('/tasklistresponse/miam/miam-start');
    expect(respondentCaseSequence[7].showInSection).toBe('aboutRespondentCase');
    expect(respondentCaseSequence[7].getNextStep({})).toBe('/tasklistresponse/miam/summary');

    expect(respondentCaseSequence[8].url).toBe('/tasklistresponse/miam/willingness-to-attend-miam');
    expect(respondentCaseSequence[8].showInSection).toBe('aboutRespondentCase');
    expect(respondentCaseSequence[8].getNextStep({})).toBe('/tasklistresponse/miam/summary');

    expect(respondentCaseSequence[9].url).toBe('/tasklistresponse/miam/summary');
    expect(respondentCaseSequence[9].showInSection).toBe('aboutRespondentCase');
    expect(respondentCaseSequence[9].getNextStep({})).toBe('/tasklistresponse/miam/save');

    expect(respondentCaseSequence[10].url).toBe('/respondent/confirm-contact-details/checkanswers');
    expect(respondentCaseSequence[10].showInSection).toBe('aboutRespondentCase');
    expect(respondentCaseSequence[10].getNextStep({})).toBe('/respondent/confirm-contact-details/save');

    expect(respondentCaseSequence[11].url).toBe('/respondent/confirm-contact-details/personaldetails');
    expect(respondentCaseSequence[11].showInSection).toBe('aboutRespondentCase');
    expect(respondentCaseSequence[11].getNextStep({})).toBe('/respondent/confirm-contact-details/checkanswers');

    expect(respondentCaseSequence[12].url).toBe('/respondent/confirm-contact-details/contactdetails');
    expect(respondentCaseSequence[12].showInSection).toBe('aboutRespondentCase');
    expect(respondentCaseSequence[12].getNextStep({})).toBe('/respondent/confirm-contact-details/checkanswers');

    expect(respondentCaseSequence[13].url).toBe('/respondent/confirm-contact-details/addressdetails');
    expect(respondentCaseSequence[13].showInSection).toBe('aboutRespondentCase');
    expect(respondentCaseSequence[13].getNextStep({})).toBe('/respondent/confirm-contact-details/address/lookup');

    expect(respondentCaseSequence[14].url).toBe('/respondent/confirm-contact-details/address/lookup');
    expect(respondentCaseSequence[14].showInSection).toBe('aboutRespondentCase');
    expect(respondentCaseSequence[14].getNextStep({})).toBe('/respondent/confirm-contact-details/address/select');

    expect(respondentCaseSequence[15].url).toBe('/respondent/confirm-contact-details/address/select');
    expect(respondentCaseSequence[15].showInSection).toBe('aboutRespondentCase');
    expect(respondentCaseSequence[15].getNextStep({})).toBe('/respondent/confirm-contact-details/addressconfirmation');

    expect(respondentCaseSequence[16].url).toBe('/respondent/confirm-contact-details/address/lookup');
    expect(respondentCaseSequence[16].showInSection).toBe('aboutRespondentCase');
    expect(respondentCaseSequence[16].getNextStep({})).toBe('/respondent/confirm-contact-details/addressconfirmation');

    expect(respondentCaseSequence[17].url).toBe('/respondent/confirm-contact-details/addressconfirmation');
    expect(respondentCaseSequence[17].showInSection).toBe('aboutRespondentCase');
    expect(respondentCaseSequence[17].getNextStep({})).toBe('/respondent/confirm-contact-details/addresshistory');

    expect(respondentCaseSequence[18].url).toBe('/respondent/confirm-contact-details/address/manual');
    expect(respondentCaseSequence[18].showInSection).toBe('aboutRespondentCase');
    expect(respondentCaseSequence[18].getNextStep({})).toBe('/respondent/confirm-contact-details/addresshistory');

    expect(respondentCaseSequence[19].url).toBe('/respondent/confirm-contact-details/addresshistory');
    expect(respondentCaseSequence[19].showInSection).toBe('aboutRespondentCase');
    expect(respondentCaseSequence[19].getNextStep({})).toBe('/respondent/confirm-contact-details/checkanswers');

    expect(respondentCaseSequence[20].url).toBe('/respondent/task-list');
    expect(respondentCaseSequence[20].showInSection).toBe('aboutRespondentCase');
    expect(respondentCaseSequence[20].getNextStep({})).toBe('/respondent/yourdocuments/alldocuments/orders');

    expect(respondentCaseSequence[21].url).toBe('/respondent/yourdocuments/alldocuments/orders');
    expect(respondentCaseSequence[21].showInSection).toBe('aboutRespondentCase');
    expect(respondentCaseSequence[21].getNextStep({})).toBe('/respondent/task-list');

    expect(respondentCaseSequence[22].url).toBe('/respondent/task-list');
    expect(respondentCaseSequence[22].showInSection).toBe('aboutRespondentCase');
    expect(respondentCaseSequence[22].getNextStep({})).toBe('/respondent/yourdocuments/alldocuments/alldocuments');

    expect(respondentCaseSequence[23].url).toBe('/respondent/yourdocuments/alldocuments/alldocuments');
    expect(respondentCaseSequence[23].showInSection).toBe('aboutRespondentCase');
    expect(respondentCaseSequence[23].getNextStep({})).toBe('/respondent/task-list');

    expect(respondentCaseSequence[24].url).toBe('/respondent/upload-document');
    expect(respondentCaseSequence[24].showInSection).toBe('aboutRespondentCase');
    expect(respondentCaseSequence[24].getNextStep({})).toBe('/respondent/upload-document/start');

    expect(respondentCaseSequence[25].url).toBe('/respondent/upload-document/start');
    expect(respondentCaseSequence[25].showInSection).toBe('aboutRespondentCase');
    expect(respondentCaseSequence[25].getNextStep({})).toBe('/respondent/upload-document/document-sharing-details');

    expect(respondentCaseSequence[26].url).toBe('/respondent/upload-document/document-sharing-details');
    expect(respondentCaseSequence[26].showInSection).toBe('aboutRespondentCase');
    expect(respondentCaseSequence[26].getNextStep({})).toBe('/respondent/upload-document/upload-your-documents');

    expect(respondentCaseSequence[27].url).toBe('/respondent/upload-document/upload-your-documents');
    expect(respondentCaseSequence[27].showInSection).toBe('aboutRespondentCase');
    expect(respondentCaseSequence[27].getNextStep({})).toBe('/respondent/upload-document/upload-documents-success');

    expect(respondentCaseSequence[28].url).toBe('/respondent/upload-document/upload-documents-success');
    expect(respondentCaseSequence[28].showInSection).toBe('aboutRespondentCase');
    expect(respondentCaseSequence[28].getNextStep({})).toBe('/respondent/task-list');

    expect(respondentCaseSequence[29].url).toBe('/respondent/yourdocuments/alldocuments/alldocuments');
    expect(respondentCaseSequence[29].showInSection).toBe('aboutRespondentCase');
    expect(respondentCaseSequence[29].getNextStep({})).toBe(
      '/respondent/yourdocuments/alldocuments/yourwitnessstatements'
    );

    expect(respondentCaseSequence[29].url).toBe('/respondent/yourdocuments/alldocuments/alldocuments');
    expect(respondentCaseSequence[29].showInSection).toBe('aboutRespondentCase');
    expect(respondentCaseSequence[29].getNextStep({})).toBe(
      '/respondent/yourdocuments/alldocuments/yourwitnessstatements'
    );

    expect(respondentCaseSequence[30].url).toBe('/respondent/yourdocuments/alldocuments/yourwitnessstatements');
    expect(respondentCaseSequence[30].showInSection).toBe('aboutRespondentCase');
    expect(respondentCaseSequence[30].getNextStep({})).toBe('/respondent/yourdocuments/alldocuments/alldocuments');

    expect(respondentCaseSequence[31].url).toBe('/respondent/yourdocuments/alldocuments/alldocuments');
    expect(respondentCaseSequence[31].showInSection).toBe('aboutRespondentCase');
    expect(respondentCaseSequence[31].getNextStep({})).toBe(
      '/respondent/yourdocuments/alldocuments/positionstatements'
    );

    expect(respondentCaseSequence[32].url).toBe('/respondent/yourdocuments/alldocuments/positionstatements');
    expect(respondentCaseSequence[32].showInSection).toBe('aboutRespondentCase');
    expect(respondentCaseSequence[32].getNextStep({})).toBe('/respondent/yourdocuments/alldocuments/alldocuments');

    expect(respondentCaseSequence[33].url).toBe('/respondent/yourdocuments/alldocuments/alldocuments');
    expect(respondentCaseSequence[33].showInSection).toBe('aboutRespondentCase');
    expect(respondentCaseSequence[33].getNextStep({})).toBe('/respondent/yourdocuments/alldocuments/lettersfromschool');

    expect(respondentCaseSequence[34].url).toBe('/respondent/yourdocuments/alldocuments/lettersfromschool');
    expect(respondentCaseSequence[34].showInSection).toBe('aboutRespondentCase');
    expect(respondentCaseSequence[34].getNextStep({})).toBe('/respondent/yourdocuments/alldocuments/alldocuments');

    expect(respondentCaseSequence[35].url).toBe('/respondent/yourdocuments/alldocuments/alldocuments');
    expect(respondentCaseSequence[35].showInSection).toBe('aboutRespondentCase');
    expect(respondentCaseSequence[35].getNextStep({})).toBe('/respondent/yourdocuments/alldocuments/digitaldownloads');

    expect(respondentCaseSequence[36].url).toBe('/respondent/yourdocuments/alldocuments/digitaldownloads');
    expect(respondentCaseSequence[36].showInSection).toBe('aboutRespondentCase');
    expect(respondentCaseSequence[36].getNextStep({})).toBe('/respondent/yourdocuments/alldocuments/alldocuments');

    expect(respondentCaseSequence[37].url).toBe('/respondent/yourdocuments/alldocuments/alldocuments');
    expect(respondentCaseSequence[37].showInSection).toBe('aboutRespondentCase');
    expect(respondentCaseSequence[37].getNextStep({})).toBe(
      '/respondent/yourdocuments/alldocuments/drug_alcohol_tests'
    );

    expect(respondentCaseSequence[38].url).toBe('/respondent/yourdocuments/alldocuments/drug_alcohol_tests');
    expect(respondentCaseSequence[38].showInSection).toBe('aboutRespondentCase');
    expect(respondentCaseSequence[38].getNextStep({})).toBe('/respondent/yourdocuments/alldocuments/alldocuments');

    expect(respondentCaseSequence[39].url).toBe('/respondent/yourdocuments/alldocuments/alldocuments');
    expect(respondentCaseSequence[39].showInSection).toBe('aboutRespondentCase');
    expect(respondentCaseSequence[39].getNextStep({})).toBe('/respondent/yourdocuments/alldocuments/medicalrecords');

    expect(respondentCaseSequence[40].url).toBe('/respondent/yourdocuments/alldocuments/medicalrecords');
    expect(respondentCaseSequence[40].showInSection).toBe('aboutRespondentCase');
    expect(respondentCaseSequence[40].getNextStep({})).toBe('/respondent/yourdocuments/alldocuments/alldocuments');

    expect(respondentCaseSequence[41].url).toBe('/respondent/yourdocuments/alldocuments/alldocuments');
    expect(respondentCaseSequence[41].showInSection).toBe('aboutRespondentCase');
    expect(respondentCaseSequence[41].getNextStep({})).toBe('/respondent/yourdocuments/alldocuments/medicalreports');

    expect(respondentCaseSequence[42].url).toBe('/respondent/yourdocuments/alldocuments/medicalreports');
    expect(respondentCaseSequence[42].showInSection).toBe('aboutRespondentCase');
    expect(respondentCaseSequence[42].getNextStep({})).toBe('/respondent/yourdocuments/alldocuments/alldocuments');

    expect(respondentCaseSequence[43].url).toBe('/respondent/yourdocuments/alldocuments/alldocuments');
    expect(respondentCaseSequence[43].showInSection).toBe('aboutRespondentCase');
    expect(respondentCaseSequence[43].getNextStep({})).toBe(
      '/respondent/yourdocuments/alldocuments/otherpeoplewitnessstatement'
    );

    expect(respondentCaseSequence[44].url).toBe('/respondent/yourdocuments/alldocuments/otherpeoplewitnessstatement');
    expect(respondentCaseSequence[44].showInSection).toBe('aboutRespondentCase');
    expect(respondentCaseSequence[44].getNextStep({})).toBe('/respondent/yourdocuments/alldocuments/alldocuments');

    expect(respondentCaseSequence[45].url).toBe('/respondent/yourdocuments/alldocuments/alldocuments');
    expect(respondentCaseSequence[45].showInSection).toBe('aboutRespondentCase');
    expect(respondentCaseSequence[45].getNextStep({})).toBe(
      '/respondent/yourdocuments/alldocuments/paternity_test_reports'
    );

    expect(respondentCaseSequence[46].url).toBe('/respondent/yourdocuments/alldocuments/paternity_test_reports');
    expect(respondentCaseSequence[46].showInSection).toBe('aboutRespondentCase');
    expect(respondentCaseSequence[46].getNextStep({})).toBe('/respondent/yourdocuments/alldocuments/alldocuments');

    expect(respondentCaseSequence[47].url).toBe('/respondent/yourdocuments/alldocuments/alldocuments');
    expect(respondentCaseSequence[47].showInSection).toBe('aboutRespondentCase');
    expect(respondentCaseSequence[47].getNextStep({})).toBe(
      '/respondent/yourdocuments/alldocuments/police_disclosures'
    );

    expect(respondentCaseSequence[48].url).toBe('/respondent/yourdocuments/alldocuments/police_disclosures');
    expect(respondentCaseSequence[48].showInSection).toBe('aboutRespondentCase');
    expect(respondentCaseSequence[48].getNextStep({})).toBe('/respondent/yourdocuments/alldocuments/alldocuments');

    expect(respondentCaseSequence[49].url).toBe('/respondent/yourdocuments/alldocuments/alldocuments');
    expect(respondentCaseSequence[49].showInSection).toBe('aboutRespondentCase');
    expect(respondentCaseSequence[49].getNextStep({})).toBe(
      '/respondent/yourdocuments/alldocuments/witness_availability'
    );

    expect(respondentCaseSequence[50].url).toBe('/respondent/yourdocuments/alldocuments/witness_availability');
    expect(respondentCaseSequence[50].showInSection).toBe('aboutRespondentCase');
    expect(respondentCaseSequence[50].getNextStep({})).toBe('/respondent/yourdocuments/alldocuments/alldocuments');

    expect(respondentCaseSequence[51].url).toBe('/respondent/yourdocuments/alldocuments/alldocuments');
    expect(respondentCaseSequence[51].showInSection).toBe('aboutRespondentCase');
    expect(respondentCaseSequence[51].getNextStep({})).toBe(
      '/respondent/yourdocuments/alldocuments/tenancy_and_mortgage_availability'
    );

    expect(respondentCaseSequence[52].url).toBe(
      '/respondent/yourdocuments/alldocuments/tenancy_and_mortgage_availability'
    );
    expect(respondentCaseSequence[52].showInSection).toBe('aboutRespondentCase');
    expect(respondentCaseSequence[52].getNextStep({})).toBe('/respondent/yourdocuments/alldocuments/alldocuments');

    expect(respondentCaseSequence[53].url).toBe('/respondent/yourdocuments/alldocuments/alldocuments');
    expect(respondentCaseSequence[53].showInSection).toBe('aboutApplicantCase');
    expect(respondentCaseSequence[53].getNextStep({})).toBe('/respondent/yourdocuments/alldocuments/previousorders');

    expect(respondentCaseSequence[54].url).toBe('/respondent/yourdocuments/alldocuments/previousorders');
    expect(respondentCaseSequence[54].showInSection).toBe('aboutApplicantCase');
    expect(respondentCaseSequence[54].getNextStep({})).toBe('/respondent/yourdocuments/alldocuments/alldocuments');

    expect(respondentCaseSequence[55].url).toBe('/respondent/yourdocuments/alldocuments/alldocuments');
    expect(respondentCaseSequence[55].showInSection).toBe('aboutRespondentCase');
    expect(respondentCaseSequence[55].getNextStep({})).toBe('/respondent/yourdocuments/alldocuments/applicationmade');

    expect(respondentCaseSequence[56].url).toBe('/respondent/yourdocuments/alldocuments/applicationmade');
    expect(respondentCaseSequence[56].showInSection).toBe('aboutRespondentCase');
    expect(respondentCaseSequence[56].getNextStep({})).toBe('/respondent/yourdocuments/alldocuments/alldocuments');

    expect(respondentCaseSequence[57].url).toBe('/respondent/yourdocuments/alldocuments/alldocuments');
    expect(respondentCaseSequence[57].showInSection).toBe('aboutRespondentCase');
    expect(respondentCaseSequence[57].getNextStep({})).toBe('/respondent/yourdocuments/alldocuments/otherDocuments');

    expect(respondentCaseSequence[58].url).toBe('/respondent/yourdocuments/alldocuments/otherDocuments');
    expect(respondentCaseSequence[58].showInSection).toBe('aboutRespondentCase');
    expect(respondentCaseSequence[58].getNextStep({})).toBe('/respondent/yourdocuments/alldocuments/alldocuments');

    expect(respondentCaseSequence[59].url).toBe('/respondent/task-list');
    expect(respondentCaseSequence[59].showInSection).toBe('aboutRespondentCase');
    expect(respondentCaseSequence[59].getNextStep({})).toBe('/tasklistresponse/start');

    expect(respondentCaseSequence[59].url).toBe('/respondent/task-list');
    expect(respondentCaseSequence[59].showInSection).toBe('aboutRespondentCase');
    expect(respondentCaseSequence[59].getNextStep({})).toBe('/tasklistresponse/start');

    expect(respondentCaseSequence[60].url).toBe('/tasklistresponse/start');
    expect(respondentCaseSequence[60].showInSection).toBe('aboutRespondentCase');
    expect(respondentCaseSequence[60].getNextStep({})).toBe('/tasklistresponse/summary');

    expect(respondentCaseSequence[61].url).toBe('/tasklistresponse/summary');
    expect(respondentCaseSequence[61].showInSection).toBe('aboutRespondentCase');
    expect(respondentCaseSequence[61].getNextStep({})).toBe('/tasklistresponse/summary-confirmation/submit');

    expect(respondentCaseSequence[62].url).toBe('/tasklistresponse/summary-confirmation');
    expect(respondentCaseSequence[62].showInSection).toBe('aboutRespondentCase');
    expect(respondentCaseSequence[62].getNextStep({})).toBe('/respondent/task-list');

    expect(respondentCaseSequence[63].url).toBe('/respondent/task-list');
    expect(respondentCaseSequence[63].showInSection).toBe('aboutCaAndDaRespondentCase');
    expect(respondentCaseSequence[63].getNextStep({})).toBe('/respondent/task-list');

    expect(respondentCaseSequence[64].url).toBe('/respondent/task-list');
    expect(respondentCaseSequence[64].showInSection).toBe('aboutCaAndDaRespondentCase');
    expect(respondentCaseSequence[64].getNextStep({})).toBe(
      '/respondent/support-you-need-during-case/attending-the-court'
    );

    expect(respondentCaseSequence[64].url).toBe('/respondent/task-list');
    expect(respondentCaseSequence[64].showInSection).toBe('aboutCaAndDaRespondentCase');
    expect(respondentCaseSequence[64].getNextStep({})).toBe(
      '/respondent/support-you-need-during-case/attending-the-court'
    );

    expect(respondentCaseSequence[65].url).toBe('/respondent/support-you-need-during-case/attending-the-court');
    expect(respondentCaseSequence[65].showInSection).toBe('aboutCaAndDaRespondentCase');
    expect(respondentCaseSequence[65].getNextStep({})).toBe(
      '/respondent/support-you-need-during-case/language-requirements'
    );

    expect(respondentCaseSequence[66].url).toBe('/respondent/support-you-need-during-case/language-requirements');
    expect(respondentCaseSequence[66].showInSection).toBe('aboutCaAndDaRespondentCase');
    expect(respondentCaseSequence[66].getNextStep({})).toBe(
      '/respondent/support-you-need-during-case/special-arrangements'
    );

    expect(respondentCaseSequence[67].url).toBe('/respondent/support-you-need-during-case/special-arrangements');
    expect(respondentCaseSequence[67].showInSection).toBe('aboutCaAndDaRespondentCase');
    expect(respondentCaseSequence[67].getNextStep({})).toBe(
      '/respondent/support-you-need-during-case/reasonable-adjustments'
    );

    expect(respondentCaseSequence[68].url).toBe('/respondent/support-you-need-during-case/reasonable-adjustments');
    expect(respondentCaseSequence[68].showInSection).toBe('aboutCaAndDaRespondentCase');
    expect(respondentCaseSequence[68].getNextStep(reasonableAdjustmentsMockData.session.userCase)).toBe(
      '/respondent/support-you-need-during-case/documents-support'
    );

    expect(respondentCaseSequence[69].url).toBe('/respondent/support-you-need-during-case/documents-support');
    expect(respondentCaseSequence[69].showInSection).toBe('aboutCaAndDaRespondentCase');
    expect(respondentCaseSequence[69].getNextStep(reasonableAdjustmentsMockData.session.userCase)).toBe(
      '/respondent/support-you-need-during-case/communication-help'
    );

    expect(respondentCaseSequence[70].url).toBe('/respondent/support-you-need-during-case/communication-help');
    expect(respondentCaseSequence[70].showInSection).toBe('aboutCaAndDaRespondentCase');
    expect(respondentCaseSequence[70].getNextStep(reasonableAdjustmentsMockData.session.userCase)).toBe(
      '/respondent/support-you-need-during-case/court-hearing-support'
    );

    expect(respondentCaseSequence[71].url).toBe('/respondent/support-you-need-during-case/court-hearing-support');
    expect(respondentCaseSequence[71].showInSection).toBe('aboutCaAndDaRespondentCase');
    expect(respondentCaseSequence[71].getNextStep(reasonableAdjustmentsMockData.session.userCase)).toBe(
      '/respondent/support-you-need-during-case/court-hearing-comfort'
    );

    expect(respondentCaseSequence[72].url).toBe('/respondent/support-you-need-during-case/court-hearing-comfort');
    expect(respondentCaseSequence[72].showInSection).toBe('aboutCaAndDaRespondentCase');
    expect(respondentCaseSequence[72].getNextStep(reasonableAdjustmentsMockData.session.userCase)).toBe(
      '/respondent/support-you-need-during-case/travelling-to-court'
    );

    expect(respondentCaseSequence[73].url).toBe('/respondent/support-you-need-during-case/travelling-to-court');
    expect(respondentCaseSequence[73].showInSection).toBe('aboutCaAndDaRespondentCase');
    expect(respondentCaseSequence[73].getNextStep(reasonableAdjustmentsMockData.session.userCase)).toBe(
      '/respondent/support-you-need-during-case/summary'
    );

    expect(respondentCaseSequence[74].url).toBe('/respondent/support-you-need-during-case/travelling-to-court');
    expect(respondentCaseSequence[74].showInSection).toBe('aboutCaAndDaRespondentCase');
    expect(respondentCaseSequence[74].getNextStep(reasonableAdjustmentsMockData.session.userCase)).toBe(
      '/respondent/support-you-need-during-case/summary'
    );

    expect(respondentCaseSequence[75].url).toBe('/respondent/support-you-need-during-case/summary');
    expect(respondentCaseSequence[75].showInSection).toBe('aboutCaAndDaRespondentCase');
    expect(respondentCaseSequence[75].getNextStep({})).toBe('/respondent/task-list');

    expect(respondentCaseSequence[76].url).toBe('/tasklistresponse/start');
    expect(respondentCaseSequence[76].showInSection).toBe('aboutRespondentCase');
    expect(respondentCaseSequence[76].getNextStep({})).toBe('/tasklistresponse/legalrepresentation/start');

    expect(respondentCaseSequence[77].url).toBe('/tasklistresponse/legalrepresentation/start');
    expect(respondentCaseSequence[77].showInSection).toBe('aboutRespondentCase');
    expect(respondentCaseSequence[77].getNextStep({})).toBe('/tasklistresponse/legalrepresentation/solicitornotdirect');

    expect(respondentCaseSequence[78].url).toBe('/tasklistresponse/legalrepresentation/start');
    expect(respondentCaseSequence[78].showInSection).toBe('aboutRespondentCase');
    expect(respondentCaseSequence[78].getNextStep({})).toBe('/tasklistresponse/start');

    expect(respondentCaseSequence[79].url).toBe('/tasklistresponse/legalrepresentation/solicitornotdirect');
    expect(respondentCaseSequence[79].showInSection).toBe('aboutRespondentCase');
    expect(respondentCaseSequence[79].getNextStep({})).toBe('/tasklistresponse/start');

    expect(respondentCaseSequence[80].url).toBe('/tasklistresponse/legalrepresentation/solicitornotdirect');
    expect(respondentCaseSequence[80].showInSection).toBe('aboutRespondentCase');
    expect(respondentCaseSequence[80].getNextStep({})).toBe('/tasklistresponse/start');

    expect(respondentCaseSequence[80].url).toBe('/respondent/yourdocuments/alldocuments/alldocuments');
    expect(respondentCaseSequence[80].showInSection).toBe('aboutRespondentCase');
    expect(respondentCaseSequence[80].getNextStep({})).toBe(
      '/respondent/yourdocuments/alldocuments/safeguarding_letter'
    );

    expect(respondentCaseSequence[81].url).toBe('/respondent/yourdocuments/alldocuments/safeguarding_letter');
    expect(respondentCaseSequence[81].showInSection).toBe('aboutRespondentCase');
    expect(respondentCaseSequence[81].getNextStep({})).toBe('/respondent/yourdocuments/alldocuments/alldocuments');

    expect(respondentCaseSequence[82].url).toBe('/respondent/yourdocuments/alldocuments/alldocuments');
    expect(respondentCaseSequence[82].showInSection).toBe('aboutRespondentCase');
    expect(respondentCaseSequence[82].getNextStep({})).toBe('/respondent/yourdocuments/alldocuments/section7_report');

    expect(respondentCaseSequence[83].url).toBe('/respondent/yourdocuments/alldocuments/section7_report');
    expect(respondentCaseSequence[83].showInSection).toBe('aboutRespondentCase');
    expect(respondentCaseSequence[83].getNextStep({})).toBe('/respondent/yourdocuments/alldocuments/alldocuments');

    expect(respondentCaseSequence[84].url).toBe('/respondent/yourdocuments/alldocuments/alldocuments');
    expect(respondentCaseSequence[84].showInSection).toBe('aboutRespondentCase');
    expect(respondentCaseSequence[84].getNextStep({})).toBe('/respondent/yourdocuments/alldocuments/section37_report');

    expect(respondentCaseSequence[85].url).toBe('/respondent/yourdocuments/alldocuments/section37_report');
    expect(respondentCaseSequence[85].showInSection).toBe('aboutRespondentCase');
    expect(respondentCaseSequence[85].getNextStep({})).toBe('/respondent/yourdocuments/alldocuments/alldocuments');

    expect(respondentCaseSequence[86].url).toBe('/respondent/yourdocuments/alldocuments/alldocuments');
    expect(respondentCaseSequence[86].showInSection).toBe('aboutRespondentCase');
    expect(respondentCaseSequence[86].getNextStep({})).toBe(
      '/respondent/yourdocuments/alldocuments/risk_assessment_16a'
    );

    expect(respondentCaseSequence[87].url).toBe('/respondent/yourdocuments/alldocuments/risk_assessment_16a');
    expect(respondentCaseSequence[87].showInSection).toBe('aboutRespondentCase');
    expect(respondentCaseSequence[87].getNextStep({})).toBe('/respondent/yourdocuments/alldocuments/alldocuments');
  });
});

const reasonableAdjustmentsMockData = mockRequest({
  session: {
    userCase: {
      respondentReasonableAdjustments: [
        'document format',
        'comminication help',
        'hearing support',
        'hearing comfort',
        'travel help',
        'no need of support',
      ],
      respondentDocsSupportPage: ['none'],
      respondentHelpCommunicationPage: ['none'],
      respondentCourtHearingPage: ['none'],
      respondentCourtComfortPage: ['none'],
      respondentTravellingToCourtPage: ['none'],
    },
  },
});

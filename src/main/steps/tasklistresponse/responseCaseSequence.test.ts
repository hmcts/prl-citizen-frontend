import { responseCaseSequence } from './responseCaseSequence';

describe('respondent1Sequence', () => {
  test('should contain 1 entries in respondent 1 screen sequence', () => {
    expect(responseCaseSequence).toHaveLength(43);
    expect(responseCaseSequence[0].url).toBe('/respondent/task-list');
    expect(responseCaseSequence[0].showInSection).toBe('aboutRespondentCase');
    expect(responseCaseSequence[0].getNextStep({})).toBe('/respondent/task-list');

    expect(responseCaseSequence[1].url).toBe('/tasklistresponse/consent-to-application/consent');
    expect(responseCaseSequence[1].showInSection).toBe('aboutRespondentCase');
    expect(responseCaseSequence[1].getNextStep({})).toBe('/tasklistresponse/consent-to-application/summary');

    expect(responseCaseSequence[2].url).toBe('/tasklistresponse/consent-to-application/summary');
    expect(responseCaseSequence[2].showInSection).toBe('aboutRespondentCase');
    expect(responseCaseSequence[2].getNextStep({})).toBe('/tasklistresponse/consent-to-application/save');

    expect(responseCaseSequence[3].url).toBe('/respondent/keep-details-private/details_known');
    expect(responseCaseSequence[3].showInSection).toBe('aboutRespondentCase');
    expect(responseCaseSequence[3].getNextStep({})).toBe('/respondent/keep-details-private/start_alternative');

    expect(responseCaseSequence[4].url).toBe('/respondent/keep-details-private/start_alternative');
    expect(responseCaseSequence[4].showInSection).toBe('aboutRespondentCase');
    expect(responseCaseSequence[4].getNextStep({})).toBe('/respondent/keep-details-private/save');

    expect(responseCaseSequence[5].url).toBe('/respondent/keep-details-private/private_details_confirmed');
    expect(responseCaseSequence[5].showInSection).toBe('aboutRespondentCase');

    expect(responseCaseSequence[6].url).toBe('/respondent/keep-details-private/private_details_not_confirmed');
    expect(responseCaseSequence[6].showInSection).toBe('aboutRespondentCase');
    expect(responseCaseSequence[6].getNextStep({})).toBe('/tasklistresponse/start');

    expect(responseCaseSequence[7].url).toBe('/tasklistresponse/miam/miam-start');
    expect(responseCaseSequence[7].showInSection).toBe('aboutRespondentCase');
    expect(responseCaseSequence[7].getNextStep({})).toBe('/tasklistresponse/miam/summary');

    expect(responseCaseSequence[8].url).toBe('/tasklistresponse/miam/willingness-to-attend-miam');
    expect(responseCaseSequence[8].showInSection).toBe('aboutRespondentCase');
    expect(responseCaseSequence[8].getNextStep({})).toBe('/tasklistresponse/miam/summary');

    expect(responseCaseSequence[9].url).toBe('/tasklistresponse/miam/summary');
    expect(responseCaseSequence[9].showInSection).toBe('aboutRespondentCase');
    expect(responseCaseSequence[9].getNextStep({})).toBe('/tasklistresponse/miam/save');

    expect(responseCaseSequence[10].url).toBe('/respondent/confirm-contact-details/checkanswers');
    expect(responseCaseSequence[10].showInSection).toBe('aboutRespondentCase');
    expect(responseCaseSequence[10].getNextStep({})).toBe('/tasklistresponse/start');

    expect(responseCaseSequence[11].url).toBe('/respondent/confirm-contact-details/personaldetails');
    expect(responseCaseSequence[11].showInSection).toBe('aboutRespondentCase');
    expect(responseCaseSequence[11].getNextStep({})).toBe('/tasklistresponse/start');

    expect(responseCaseSequence[12].url).toBe('/respondent/confirm-contact-details/contactdetails');
    expect(responseCaseSequence[12].showInSection).toBe('aboutRespondentCase');
    expect(responseCaseSequence[12].getNextStep({})).toBe('/tasklistresponse/start');

    expect(responseCaseSequence[13].url).toBe('/respondent/confirm-contact-details/addressdetails');
    expect(responseCaseSequence[13].showInSection).toBe('aboutRespondentCase');
    expect(responseCaseSequence[13].getNextStep({})).toBe('/respondent/confirm-contact-details/address/lookup');

    expect(responseCaseSequence[14].url).toBe('/respondent/confirm-contact-details/address/lookup');
    expect(responseCaseSequence[14].showInSection).toBe('aboutRespondentCase');
    expect(responseCaseSequence[14].getNextStep({})).toBe('/respondent/confirm-contact-details/address/select');

    expect(responseCaseSequence[15].url).toBe('/respondent/confirm-contact-details/address/select');
    expect(responseCaseSequence[15].showInSection).toBe('aboutRespondentCase');
    expect(responseCaseSequence[15].getNextStep({})).toBe('/respondent/confirm-contact-details/addressconfirmation');

    expect(responseCaseSequence[16].url).toBe('/respondent/confirm-contact-details/address/lookup');
    expect(responseCaseSequence[16].showInSection).toBe('aboutRespondentCase');
    expect(responseCaseSequence[16].getNextStep({})).toBe('/respondent/confirm-contact-details/addressconfirmation');

    expect(responseCaseSequence[17].url).toBe('/respondent/confirm-contact-details/addressconfirmation');
    expect(responseCaseSequence[17].showInSection).toBe('aboutRespondentCase');
    expect(responseCaseSequence[17].getNextStep({})).toBe('/respondent/confirm-contact-details/addresshistory');

    expect(responseCaseSequence[18].url).toBe('/respondent/confirm-contact-details/address/manual');
    expect(responseCaseSequence[18].showInSection).toBe('aboutRespondentCase');
    expect(responseCaseSequence[18].getNextStep({})).toBe('/respondent/confirm-contact-details/addresshistory');

    expect(responseCaseSequence[19].url).toBe('/respondent/confirm-contact-details/addresshistory');
    expect(responseCaseSequence[19].showInSection).toBe('aboutRespondentCase');
    expect(responseCaseSequence[19].getNextStep({})).toBe('/tasklistresponse/start');

    expect(responseCaseSequence[20].url).toBe('/tasklistresponse/international-factors/start');
    expect(responseCaseSequence[20].showInSection).toBe('aboutRespondentCase');
    expect(responseCaseSequence[20].getNextStep({})).toBe('/tasklistresponse/international-factors/parents');

    expect(responseCaseSequence[21].url).toBe('/tasklistresponse/international-factors/parents');
    expect(responseCaseSequence[21].showInSection).toBe('aboutRespondentCase');
    expect(responseCaseSequence[21].getNextStep({})).toBe('/tasklistresponse/international-factors/jurisdiction');

    expect(responseCaseSequence[22].url).toBe('/tasklistresponse/international-factors/jurisdiction');
    expect(responseCaseSequence[22].showInSection).toBe('aboutRespondentCase');
    expect(responseCaseSequence[22].getNextStep({})).toBe('/tasklistresponse/international-factors/request');

    expect(responseCaseSequence[23].url).toBe('/tasklistresponse/international-factors/request');
    expect(responseCaseSequence[23].showInSection).toBe('aboutRespondentCase');
    expect(responseCaseSequence[23].getNextStep({})).toBe('/tasklistresponse/international-factors/summary');

    expect(responseCaseSequence[24].url).toBe('/tasklistresponse/international-factors/summary');
    expect(responseCaseSequence[24].showInSection).toBe('aboutRespondentCase');
    expect(responseCaseSequence[24].getNextStep({})).toBe('/tasklistresponse/international-factors/save');

    expect(responseCaseSequence[25].url).toBe('/tasklistresponse/safety_concerns/main_page');
    expect(responseCaseSequence[25].showInSection).toBe('aboutRespondentCase');
    expect(responseCaseSequence[25].getNextStep({})).toBe('/tasklistresponse/safety_concerns/your_safety');

    expect(responseCaseSequence[26].url).toBe('/tasklistresponse/safety_concerns/your_safety');
    expect(responseCaseSequence[26].showInSection).toBe('aboutRespondentCase');
    expect(responseCaseSequence[26].getNextStep({})).toBe('/tasklistresponse/safety_concerns/domestic_abuse_risk');

    expect(responseCaseSequence[27].url).toBe('/tasklistresponse/safety_concerns/domestic_abuse_risk');
    expect(responseCaseSequence[27].showInSection).toBe('aboutRespondentCase');
    expect(responseCaseSequence[27].getNextStep({})).toBe('/tasklistresponse/safety_concerns/domestic_abuse_risk_no');

    expect(responseCaseSequence[28].url).toBe('/tasklistresponse/safety_concerns/domestic_abuse_risk_no');
    expect(responseCaseSequence[28].showInSection).toBe('aboutRespondentCase');
    expect(responseCaseSequence[28].getNextStep({})).toBe('/tasklistresponse/start');

    expect(responseCaseSequence[29].url).toBe('/tasklistresponse/proceedings/start');
    expect(responseCaseSequence[29].showInSection).toBe('aboutRespondentCase');

    expect(responseCaseSequence[30].url).toBe('/tasklistresponse/proceedings/court-proceedings');
    expect(responseCaseSequence[30].showInSection).toBe('aboutRespondentCase');
    expect(responseCaseSequence[30].getNextStep({})).toBe('/tasklistresponse/proceedings/summary');

    expect(responseCaseSequence[31].url).toBe('/tasklistresponse/proceedings/summary');
    expect(responseCaseSequence[31].showInSection).toBe('aboutRespondentCase');
    expect(responseCaseSequence[31].getNextStep({})).toBe('/tasklistresponse/start');

    expect(responseCaseSequence[32].url).toBe('/respondent/upload-document');
    expect(responseCaseSequence[32].showInSection).toBe('aboutRespondentCase');
    expect(responseCaseSequence[32].getNextStep({})).toBe('/respondent/upload-document/start');

    expect(responseCaseSequence[33].url).toBe('/respondent/upload-document/start');
    expect(responseCaseSequence[33].showInSection).toBe('aboutRespondentCase');
    expect(responseCaseSequence[33].getNextStep({})).toBe('/respondent/upload-document/document-sharing-details');

    expect(responseCaseSequence[34].url).toBe('/respondent/upload-document/document-sharing-details');
    expect(responseCaseSequence[34].showInSection).toBe('aboutRespondentCase');
    expect(responseCaseSequence[34].getNextStep({})).toBe('/respondent/upload-document/upload-your-documents');

    expect(responseCaseSequence[35].url).toBe('/respondent/upload-document/upload-your-documents');
    expect(responseCaseSequence[35].showInSection).toBe('aboutRespondentCase');
    expect(responseCaseSequence[35].getNextStep({})).toBe('/respondent/upload-document/upload-documents-success');

    expect(responseCaseSequence[36].url).toBe('/respondent/upload-document/upload-documents-success');
    expect(responseCaseSequence[36].showInSection).toBe('aboutRespondentCase');
    expect(responseCaseSequence[36].getNextStep({})).toBe('/tasklistresponse/start');

    expect(responseCaseSequence[37].url).toBe('/tasklistresponse/start');
    expect(responseCaseSequence[37].showInSection).toBe('aboutRespondentCase');
    expect(responseCaseSequence[37].getNextStep({})).toBe(
      '/tasklistresponse/allegations-of-harm-and-violence/safety-concerns-guidance-page'
    );

    expect(responseCaseSequence[38].url).toBe(
      '/tasklistresponse/allegations-of-harm-and-violence/safety-concerns-guidance-page'
    );
    expect(responseCaseSequence[38].showInSection).toBe('aboutRespondentCase');
    expect(responseCaseSequence[38].getNextStep({})).toBe(
      '/tasklistresponse/allegations-of-harm-and-violence/your-or-child-safety-concerns'
    );

    expect(responseCaseSequence[39].url).toBe(
      '/tasklistresponse/allegations-of-harm-and-violence/your-or-child-safety-concerns'
    );
    expect(responseCaseSequence[39].showInSection).toBe('aboutRespondentCase');
    expect(responseCaseSequence[39].getNextStep({})).toBe(
      '/tasklistresponse/allegations-of-harm-and-violence/check-answers-yes'
    );

    expect(responseCaseSequence[40].url).toBe('/tasklistresponse/allegations-of-harm-and-violence/check-answers-yes');
    expect(responseCaseSequence[40].showInSection).toBe('aboutRespondentCase');
    expect(responseCaseSequence[40].getNextStep({})).toBe('/tasklistresponse/start');

    expect(responseCaseSequence[41].url).toBe('/tasklistresponse/allegations-of-harm-and-violence/check-answers-no');
    expect(responseCaseSequence[41].showInSection).toBe('aboutRespondentCase');
    expect(responseCaseSequence[41].getNextStep({})).toBe('/tasklistresponse/start');

    expect(responseCaseSequence[42].url).toBe('/tasklistresponse/allegations-of-harm-and-violence/only-child-abuse');
    expect(responseCaseSequence[42].showInSection).toBe('aboutRespondentCase');
    expect(responseCaseSequence[42].getNextStep({})).toBe('/tasklistresponse/start');
  });
});

import { responseCaseSequence } from './responseCaseSequence';

describe('respondent1Sequence', () => {
  test('should contain 1 entries in respondent 1 screen sequence', () => {
    expect(responseCaseSequence).toHaveLength(37);
    expect(responseCaseSequence[0].url).toBe('/respondent/task-list');
    expect(responseCaseSequence[0].showInSection).toBe('aboutRespondentCase');
    expect(responseCaseSequence[0].getNextStep({})).toBe('/respondent/task-list');

    expect(responseCaseSequence[1].url).toBe('/respondent/consent-to-application/consent');
    expect(responseCaseSequence[1].showInSection).toBe('aboutRespondentCase');
    expect(responseCaseSequence[1].getNextStep({})).toBe('/respondent/consent-to-application/summary');

    expect(responseCaseSequence[2].url).toBe('/respondent/consent-to-application/summary');
    expect(responseCaseSequence[2].showInSection).toBe('aboutRespondentCase');
    expect(responseCaseSequence[2].getNextStep({})).toBe('/respondent/task-list');

    expect(responseCaseSequence[3].url).toBe('/respondent/keep-details-private/details_known');
    expect(responseCaseSequence[3].showInSection).toBe('aboutRespondentCase');
    expect(responseCaseSequence[3].getNextStep({})).toBe('/respondent/keep-details-private/start_alternative');

    expect(responseCaseSequence[4].url).toBe('/respondent/keep-details-private/start_alternative');
    expect(responseCaseSequence[4].showInSection).toBe('aboutRespondentCase');
    expect(responseCaseSequence[4].getNextStep({})).toBe(
      '/respondent/keep-details-private/private_details_not_confirmed'
    );

    expect(responseCaseSequence[5].url).toBe('/respondent/keep-details-private/private_details_confirmed');
    expect(responseCaseSequence[5].showInSection).toBe('aboutRespondentCase');

    expect(responseCaseSequence[6].url).toBe('/respondent/keep-details-private/private_details_not_confirmed');
    expect(responseCaseSequence[6].showInSection).toBe('aboutRespondentCase');
    expect(responseCaseSequence[6].getNextStep({})).toBe('/respondent/task-list');

    expect(responseCaseSequence[7].url).toBe('/respondent/miam/miam-start');
    expect(responseCaseSequence[7].showInSection).toBe('aboutRespondentCase');
    expect(responseCaseSequence[7].getNextStep({})).toBe('/respondent/miam/summary');

    expect(responseCaseSequence[8].url).toBe('/respondent/miam/willingness-to-attend-miam');
    expect(responseCaseSequence[8].showInSection).toBe('aboutRespondentCase');
    expect(responseCaseSequence[8].getNextStep({})).toBe('/respondent/miam/summary');

    expect(responseCaseSequence[9].url).toBe('/respondent/miam/summary');
    expect(responseCaseSequence[9].showInSection).toBe('aboutRespondentCase');
    expect(responseCaseSequence[9].getNextStep({})).toBe('/respondent/task-list');

    expect(responseCaseSequence[10].url).toBe('/respondent/confirm-contact-details/checkanswers');
    expect(responseCaseSequence[10].showInSection).toBe('aboutRespondentCase');
    expect(responseCaseSequence[10].getNextStep({})).toBe('/respondent/task-list');

    expect(responseCaseSequence[11].url).toBe('/respondent/confirm-contact-details/personaldetails');
    expect(responseCaseSequence[11].showInSection).toBe('aboutRespondentCase');
    expect(responseCaseSequence[11].getNextStep({})).toBe('/respondent/task-list');

    expect(responseCaseSequence[12].url).toBe('/respondent/confirm-contact-details/contactdetails');
    expect(responseCaseSequence[12].showInSection).toBe('aboutRespondentCase');
    expect(responseCaseSequence[12].getNextStep({})).toBe('/respondent/task-list');

    expect(responseCaseSequence[13].url).toBe('/respondent/confirm-contact-details/addressdetails');
    expect(responseCaseSequence[13].showInSection).toBe('aboutRespondentCase');
    expect(responseCaseSequence[13].getNextStep({})).toBe('/respondent/confirm-contact-details/addresslookup');

    expect(responseCaseSequence[14].url).toBe('/respondent/confirm-contact-details/addresslookup');
    expect(responseCaseSequence[14].showInSection).toBe('aboutRespondentCase');
    expect(responseCaseSequence[14].getNextStep({})).toBe('/respondent/confirm-contact-details/addresslookupcont');

    expect(responseCaseSequence[15].url).toBe('/respondent/confirm-contact-details/addresslookupcont');
    expect(responseCaseSequence[15].showInSection).toBe('aboutRespondentCase');
    expect(responseCaseSequence[15].getNextStep({})).toBe('/respondent/confirm-contact-details/addressconfirmation');

    expect(responseCaseSequence[16].url).toBe('/respondent/confirm-contact-details/addresslookup');
    expect(responseCaseSequence[16].showInSection).toBe('aboutRespondentCase');
    expect(responseCaseSequence[16].getNextStep({})).toBe('/respondent/confirm-contact-details/addressconfirmation');

    expect(responseCaseSequence[17].url).toBe('/respondent/confirm-contact-details/addressconfirmation');
    expect(responseCaseSequence[17].showInSection).toBe('aboutRespondentCase');
    expect(responseCaseSequence[17].getNextStep({})).toBe('/respondent/task-list');

    expect(responseCaseSequence[18].url).toBe('/respondent/confirm-contact-details/addressblank');
    expect(responseCaseSequence[18].showInSection).toBe('aboutRespondentCase');
    expect(responseCaseSequence[18].getNextStep({})).toBe('/respondent/task-list');

    expect(responseCaseSequence[19].url).toBe('/respondent/confirm-contact-details/addresshistory');
    expect(responseCaseSequence[19].showInSection).toBe('aboutRespondentCase');
    expect(responseCaseSequence[19].getNextStep({})).toBe('/respondent/task-list');

    expect(responseCaseSequence[20].url).toBe('/respondent/international-factors/start');
    expect(responseCaseSequence[20].showInSection).toBe('aboutRespondentCase');
    expect(responseCaseSequence[20].getNextStep({})).toBe('/respondent/international-factors/parents');

    expect(responseCaseSequence[21].url).toBe('/respondent/international-factors/parents');
    expect(responseCaseSequence[21].showInSection).toBe('aboutRespondentCase');
    expect(responseCaseSequence[21].getNextStep({})).toBe('/respondent/international-factors/jurisdiction');

    expect(responseCaseSequence[22].url).toBe('/respondent/international-factors/jurisdiction');
    expect(responseCaseSequence[22].showInSection).toBe('aboutRespondentCase');
    expect(responseCaseSequence[22].getNextStep({})).toBe('/respondent/international-factors/request');

    expect(responseCaseSequence[23].url).toBe('/respondent/international-factors/request');
    expect(responseCaseSequence[23].showInSection).toBe('aboutRespondentCase');
    expect(responseCaseSequence[23].getNextStep({})).toBe('/respondent/international-factors/summary');

    expect(responseCaseSequence[24].url).toBe('/respondent/international-factors/summary');
    expect(responseCaseSequence[24].showInSection).toBe('aboutRespondentCase');
    expect(responseCaseSequence[24].getNextStep({})).toBe('/respondent/task-list');

    // expect(responseCaseSequence[27].url).toBe('/respondent/safety_concerns/domestic_abuse_risk');
    // expect(responseCaseSequence[27].showInSection).toBe('aboutRespondentCase');
    // expect(responseCaseSequence[27].getNextStep({})).toBe('/respondent/safety_concerns/domestic_abuse_risk_no');

    // expect(responseCaseSequence[28].url).toBe('/respondent/safety_concerns/domestic_abuse_risk_no');
    // expect(responseCaseSequence[28].showInSection).toBe('aboutRespondentCase');
    // expect(responseCaseSequence[28].getNextStep({})).toBe('/respondent/task-list');

    // expect(responseCaseSequence[29].url).toBe('/respondent/proceedings/start');
    // expect(responseCaseSequence[29].showInSection).toBe('aboutRespondentCase');

    // expect(responseCaseSequence[30].url).toBe('/respondent/proceedings/court-proceedings');
    // expect(responseCaseSequence[30].showInSection).toBe('aboutRespondentCase');
    // expect(responseCaseSequence[30].getNextStep({})).toBe('/respondent/proceedings/summary');

    // expect(responseCaseSequence[31].url).toBe('/respondent/proceedings/summary');
    // expect(responseCaseSequence[31].showInSection).toBe('aboutRespondentCase');
    // expect(responseCaseSequence[31].getNextStep({})).toBe('/respondent/task-list');
  });
});

import { tasklistresponseCaseSequence } from './tasklistresponseCaseSequence';

describe('respondent1Sequence', () => {
  test('should contain 1 entries in respondent 1 screen sequence', () => {
    expect(tasklistresponseCaseSequence).toHaveLength(42);
    expect(tasklistresponseCaseSequence[0].url).toBe('/respondent/task-list');
    expect(tasklistresponseCaseSequence[0].showInSection).toBe('aboutRespondentCase');
    expect(tasklistresponseCaseSequence[0].getNextStep({})).toBe('/respondent/task-list');

    expect(tasklistresponseCaseSequence[1].url).toBe('/respondent/consent-to-application/consent');
    expect(tasklistresponseCaseSequence[1].showInSection).toBe('aboutRespondentCase');
    expect(tasklistresponseCaseSequence[1].getNextStep({})).toBe('/respondent/consent-to-application/summary');

    expect(tasklistresponseCaseSequence[2].url).toBe('/respondent/consent-to-application/summary');
    expect(tasklistresponseCaseSequence[2].showInSection).toBe('aboutRespondentCase');
    expect(tasklistresponseCaseSequence[2].getNextStep({})).toBe('/respondent/consent-to-application/save');

    expect(tasklistresponseCaseSequence[3].url).toBe('/respondent/keep-details-private/details_known');
    expect(tasklistresponseCaseSequence[3].showInSection).toBe('aboutRespondentCase');
    expect(tasklistresponseCaseSequence[3].getNextStep({})).toBe('/respondent/keep-details-private/start_alternative');

    expect(tasklistresponseCaseSequence[4].url).toBe('/respondent/keep-details-private/start_alternative');
    expect(tasklistresponseCaseSequence[4].showInSection).toBe('aboutRespondentCase');
    expect(tasklistresponseCaseSequence[4].getNextStep({})).toBe(
      '/respondent/keep-details-private/private_details_not_confirmed'
    );

    expect(tasklistresponseCaseSequence[5].url).toBe('/respondent/keep-details-private/private_details_confirmed');
    expect(tasklistresponseCaseSequence[5].showInSection).toBe('aboutRespondentCase');

    expect(tasklistresponseCaseSequence[6].url).toBe('/respondent/keep-details-private/private_details_not_confirmed');
    expect(tasklistresponseCaseSequence[6].showInSection).toBe('aboutRespondentCase');
    expect(tasklistresponseCaseSequence[6].getNextStep({})).toBe('/respondent/task-list');

    expect(tasklistresponseCaseSequence[7].url).toBe('/respondent/miam/miam-start');
    expect(tasklistresponseCaseSequence[7].showInSection).toBe('aboutRespondentCase');
    expect(tasklistresponseCaseSequence[7].getNextStep({})).toBe('/respondent/miam/summary');

    expect(tasklistresponseCaseSequence[8].url).toBe('/respondent/miam/willingness-to-attend-miam');
    expect(tasklistresponseCaseSequence[8].showInSection).toBe('aboutRespondentCase');
    expect(tasklistresponseCaseSequence[8].getNextStep({})).toBe('/respondent/miam/summary');

    expect(tasklistresponseCaseSequence[9].url).toBe('/respondent/miam/summary');
    expect(tasklistresponseCaseSequence[9].showInSection).toBe('aboutRespondentCase');
    expect(tasklistresponseCaseSequence[9].getNextStep({})).toBe('/respondent/task-list');

    expect(tasklistresponseCaseSequence[10].url).toBe('/respondent/confirm-contact-details/checkanswers');
    expect(tasklistresponseCaseSequence[10].showInSection).toBe('aboutRespondentCase');
    expect(tasklistresponseCaseSequence[10].getNextStep({})).toBe('/respondent/task-list');

    expect(tasklistresponseCaseSequence[11].url).toBe('/respondent/confirm-contact-details/personaldetails');
    expect(tasklistresponseCaseSequence[11].showInSection).toBe('aboutRespondentCase');
    expect(tasklistresponseCaseSequence[11].getNextStep({})).toBe('/respondent/task-list');

    expect(tasklistresponseCaseSequence[12].url).toBe('/respondent/confirm-contact-details/contactdetails');
    expect(tasklistresponseCaseSequence[12].showInSection).toBe('aboutRespondentCase');
    expect(tasklistresponseCaseSequence[12].getNextStep({})).toBe('/respondent/task-list');

    expect(tasklistresponseCaseSequence[13].url).toBe('/respondent/confirm-contact-details/addressdetails');
    expect(tasklistresponseCaseSequence[13].showInSection).toBe('aboutRespondentCase');
    expect(tasklistresponseCaseSequence[13].getNextStep({})).toBe('/respondent/confirm-contact-details/addresslookup');

    expect(tasklistresponseCaseSequence[14].url).toBe('/respondent/confirm-contact-details/addresslookup');
    expect(tasklistresponseCaseSequence[14].showInSection).toBe('aboutRespondentCase');
    expect(tasklistresponseCaseSequence[14].getNextStep({})).toBe(
      '/respondent/confirm-contact-details/addresslookupcont'
    );

    expect(tasklistresponseCaseSequence[15].url).toBe('/respondent/confirm-contact-details/addresslookupcont');
    expect(tasklistresponseCaseSequence[15].showInSection).toBe('aboutRespondentCase');
    expect(tasklistresponseCaseSequence[15].getNextStep({})).toBe(
      '/respondent/confirm-contact-details/addressconfirmation'
    );

    expect(tasklistresponseCaseSequence[16].url).toBe('/respondent/confirm-contact-details/addresslookup');
    expect(tasklistresponseCaseSequence[16].showInSection).toBe('aboutRespondentCase');
    expect(tasklistresponseCaseSequence[16].getNextStep({})).toBe(
      '/respondent/confirm-contact-details/addressconfirmation'
    );

    expect(tasklistresponseCaseSequence[17].url).toBe('/respondent/confirm-contact-details/addressconfirmation');
    expect(tasklistresponseCaseSequence[17].showInSection).toBe('aboutRespondentCase');
    expect(tasklistresponseCaseSequence[17].getNextStep({})).toBe('/respondent/task-list');

    expect(tasklistresponseCaseSequence[18].url).toBe('/respondent/confirm-contact-details/addressblank');
    expect(tasklistresponseCaseSequence[18].showInSection).toBe('aboutRespondentCase');
    expect(tasklistresponseCaseSequence[18].getNextStep({})).toBe('/respondent/task-list');

    expect(tasklistresponseCaseSequence[19].url).toBe('/respondent/confirm-contact-details/addresshistory');
    expect(tasklistresponseCaseSequence[19].showInSection).toBe('aboutRespondentCase');
    expect(tasklistresponseCaseSequence[19].getNextStep({})).toBe('/respondent/task-list');

    expect(tasklistresponseCaseSequence[20].url).toBe('/tasklistresponse/international-factors/start');
    expect(tasklistresponseCaseSequence[20].showInSection).toBe('aboutRespondentCase');
    expect(tasklistresponseCaseSequence[20].getNextStep({})).toBe('/tasklistresponse/international-factors/parents');

    expect(tasklistresponseCaseSequence[21].url).toBe('/tasklistresponse/international-factors/parents');
    expect(tasklistresponseCaseSequence[21].showInSection).toBe('aboutRespondentCase');
    expect(tasklistresponseCaseSequence[21].getNextStep({})).toBe(
      '/tasklistresponse/international-factors/jurisdiction'
    );

    expect(tasklistresponseCaseSequence[22].url).toBe('/tasklistresponse/international-factors/jurisdiction');
    expect(tasklistresponseCaseSequence[22].showInSection).toBe('aboutRespondentCase');
    expect(tasklistresponseCaseSequence[22].getNextStep({})).toBe('/tasklistresponse/international-factors/request');

    expect(tasklistresponseCaseSequence[23].url).toBe('/tasklistresponse/international-factors/request');
    expect(tasklistresponseCaseSequence[23].showInSection).toBe('aboutRespondentCase');
    expect(tasklistresponseCaseSequence[23].getNextStep({})).toBe('/tasklistresponse/international-factors/summary');

    expect(tasklistresponseCaseSequence[24].url).toBe('/tasklistresponse/international-factors/summary');
    expect(tasklistresponseCaseSequence[24].showInSection).toBe('aboutRespondentCase');
    expect(tasklistresponseCaseSequence[24].getNextStep({})).toBe('/tasklistresponse/start');

    // expect(tasklistresponseCaseSequence[27].url).toBe('/respondent/safety_concerns/domestic_abuse_risk');
    // expect(tasklistresponseCaseSequence[27].showInSection).toBe('aboutRespondentCase');
    // expect(tasklistresponseCaseSequence[27].getNextStep({})).toBe('/respondent/safety_concerns/domestic_abuse_risk_no');

    // expect(tasklistresponseCaseSequence[28].url).toBe('/respondent/safety_concerns/domestic_abuse_risk_no');
    // expect(tasklistresponseCaseSequence[28].showInSection).toBe('aboutRespondentCase');
    // expect(tasklistresponseCaseSequence[28].getNextStep({})).toBe('/respondent/task-list');

    // expect(tasklistresponseCaseSequence[29].url).toBe('/respondent/proceedings/start');
    // expect(tasklistresponseCaseSequence[29].showInSection).toBe('aboutRespondentCase');

    // expect(tasklistresponseCaseSequence[30].url).toBe('/respondent/proceedings/court-proceedings');
    // expect(tasklistresponseCaseSequence[30].showInSection).toBe('aboutRespondentCase');
    // expect(tasklistresponseCaseSequence[30].getNextStep({})).toBe('/respondent/proceedings/summary');

    // expect(tasklistresponseCaseSequence[31].url).toBe('/respondent/proceedings/summary');
    // expect(tasklistresponseCaseSequence[31].showInSection).toBe('aboutRespondentCase');
    // expect(tasklistresponseCaseSequence[31].getNextStep({})).toBe('/respondent/task-list');
  });
});

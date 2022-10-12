import { respondentCaseSequence } from './respondentcaseSequence';

describe('respondent1Sequence', () => {
  test('should contain 1 entries in respondent 1 screen sequence', () => {
    expect(respondentCaseSequence).toHaveLength(77);
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

    expect(respondentCaseSequence[5].url).toBe('/respondent/confirm-contact-details/checkanswers');
    expect(respondentCaseSequence[5].showInSection).toBe('aboutRespondentCase');
    expect(respondentCaseSequence[5].getNextStep({})).toBe('/respondent/task-list');

    expect(respondentCaseSequence[6].url).toBe('/respondent/confirm-contact-details/personaldetails');
    expect(respondentCaseSequence[6].showInSection).toBe('aboutRespondentCase');
    expect(respondentCaseSequence[6].getNextStep({})).toBe('/respondent/task-list');

    expect(respondentCaseSequence[7].url).toBe('/respondent/confirm-contact-details/contactdetails');
    expect(respondentCaseSequence[7].showInSection).toBe('aboutRespondentCase');
    expect(respondentCaseSequence[7].getNextStep({})).toBe('/respondent/task-list');

    expect(respondentCaseSequence[8].url).toBe('/respondent/confirm-contact-details/addressdetails');
    expect(respondentCaseSequence[8].showInSection).toBe('aboutRespondentCase');
    expect(respondentCaseSequence[8].getNextStep({})).toBe('/respondent/confirm-contact-details/addresslookup');

    expect(respondentCaseSequence[9].url).toBe('/respondent/confirm-contact-details/addresslookup');
    expect(respondentCaseSequence[9].showInSection).toBe('aboutRespondentCase');
    expect(respondentCaseSequence[9].getNextStep({})).toBe('/respondent/confirm-contact-details/addresslookupcont');

    expect(respondentCaseSequence[10].url).toBe('/respondent/confirm-contact-details/addresslookupcont');
    expect(respondentCaseSequence[10].showInSection).toBe('aboutRespondentCase');
    expect(respondentCaseSequence[10].getNextStep({})).toBe('/respondent/confirm-contact-details/addressconfirmation');

    expect(respondentCaseSequence[11].url).toBe('/respondent/confirm-contact-details/addresslookup');
    expect(respondentCaseSequence[11].showInSection).toBe('aboutRespondentCase');
    expect(respondentCaseSequence[11].getNextStep({})).toBe('/respondent/confirm-contact-details/addressconfirmation');

    expect(respondentCaseSequence[12].url).toBe('/respondent/confirm-contact-details/addressconfirmation');
    expect(respondentCaseSequence[12].showInSection).toBe('aboutRespondentCase');
    expect(respondentCaseSequence[12].getNextStep({})).toBe('/respondent/task-list');

    expect(respondentCaseSequence[13].url).toBe('/respondent/confirm-contact-details/addressblank');
    expect(respondentCaseSequence[13].showInSection).toBe('aboutRespondentCase');
    expect(respondentCaseSequence[13].getNextStep({})).toBe('/respondent/task-list');

    expect(respondentCaseSequence[14].url).toBe('/respondent/confirm-contact-details/addresshistory');
    expect(respondentCaseSequence[14].showInSection).toBe('aboutRespondentCase');
    expect(respondentCaseSequence[14].getNextStep({})).toBe('/respondent/task-list');

    expect(respondentCaseSequence[15].url).toBe('/respondent/task-list');
    expect(respondentCaseSequence[15].showInSection).toBe('aboutRespondentCase');
    expect(respondentCaseSequence[15].getNextStep({})).toBe('/respondent/yourdocuments/alldocuments/orders');

    expect(respondentCaseSequence[16].url).toBe('/respondent/yourdocuments/alldocuments/orders');
    expect(respondentCaseSequence[16].showInSection).toBe('aboutRespondentCase');
    expect(respondentCaseSequence[16].getNextStep({})).toBe('/respondent/task-list');

    // expect(respondentCaseSequence[27].url).toBe('/respondent/safety_concerns/domestic_abuse_risk');
    // expect(respondentCaseSequence[27].showInSection).toBe('aboutRespondentCase');
    // expect(respondentCaseSequence[27].getNextStep({})).toBe('/respondent/safety_concerns/domestic_abuse_risk_no');

    // expect(respondentCaseSequence[28].url).toBe('/respondent/safety_concerns/domestic_abuse_risk_no');
    // expect(respondentCaseSequence[28].showInSection).toBe('aboutRespondentCase');
    // expect(respondentCaseSequence[28].getNextStep({})).toBe('/respondent/task-list');

    // expect(respondentCaseSequence[29].url).toBe('/respondent/proceedings/start');
    // expect(respondentCaseSequence[29].showInSection).toBe('aboutRespondentCase');

    // expect(respondentCaseSequence[30].url).toBe('/respondent/proceedings/court-proceedings');
    // expect(respondentCaseSequence[30].showInSection).toBe('aboutRespondentCase');
    // expect(respondentCaseSequence[30].getNextStep({})).toBe('/respondent/proceedings/summary');

    // expect(respondentCaseSequence[31].url).toBe('/respondent/proceedings/summary');
    // expect(respondentCaseSequence[31].showInSection).toBe('aboutRespondentCase');
    // expect(respondentCaseSequence[31].getNextStep({})).toBe('/respondent/task-list');
  });
});

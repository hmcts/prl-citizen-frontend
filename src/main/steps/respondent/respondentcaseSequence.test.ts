import { repondentCaseSequence } from './respondentcaseSequence';

describe('applicant1Sequence', () => {
  test('should contain 1 entries in applicant 1 screen sequence', () => {
    expect(repondentCaseSequence).toHaveLength(32);
    expect(repondentCaseSequence[0].url).toBe('/respondent/task-list');
    expect(repondentCaseSequence[0].showInSection).toBe('aboutRespondentCase');
    expect(repondentCaseSequence[0].getNextStep({})).toBe('/respondent/task-list');

    expect(repondentCaseSequence[1].url).toBe('/respondent/consent-to-application/consent');
    expect(repondentCaseSequence[1].showInSection).toBe('aboutRespondentCase');
    expect(repondentCaseSequence[1].getNextStep({})).toBe('/respondent/consent-to-application/summary');

    expect(repondentCaseSequence[2].url).toBe('/respondent/consent-to-application/summary');
    expect(repondentCaseSequence[2].showInSection).toBe('aboutRespondentCase');
    expect(repondentCaseSequence[2].getNextStep({})).toBe('/respondent/task-list');

    expect(repondentCaseSequence[3].url).toBe('/respondent/keep-details-private/details_known');
    expect(repondentCaseSequence[3].showInSection).toBe('aboutRespondentCase');
    expect(repondentCaseSequence[3].getNextStep({})).toBe('/respondent/keep-details-private/start_alternative');

    expect(repondentCaseSequence[4].url).toBe('/respondent/keep-details-private/start_alternative');
    expect(repondentCaseSequence[4].showInSection).toBe('aboutRespondentCase');
    expect(repondentCaseSequence[4].getNextStep({})).toBe(
      '/respondent/keep-details-private/private_details_not_confirmed'
    );

    expect(repondentCaseSequence[5].url).toBe('/respondent/keep-details-private/private_details_confirmed');
    expect(repondentCaseSequence[5].showInSection).toBe('aboutRespondentCase');

    expect(repondentCaseSequence[6].url).toBe('/respondent/keep-details-private/private_details_not_confirmed');
    expect(repondentCaseSequence[6].showInSection).toBe('aboutRespondentCase');
    expect(repondentCaseSequence[6].getNextStep({})).toBe('/respondent/task-list');

    expect(repondentCaseSequence[7].url).toBe('/respondent/miam/miam-start');
    expect(repondentCaseSequence[7].showInSection).toBe('aboutRespondentCase');
    expect(repondentCaseSequence[7].getNextStep({})).toBe('/respondent/miam/summary');

    expect(repondentCaseSequence[8].url).toBe('/respondent/miam/willingness-to-attend-miam');
    expect(repondentCaseSequence[8].showInSection).toBe('aboutRespondentCase');
    expect(repondentCaseSequence[8].getNextStep({})).toBe('/respondent/miam/summary');

    expect(repondentCaseSequence[9].url).toBe('/respondent/miam/summary');
    expect(repondentCaseSequence[9].showInSection).toBe('aboutRespondentCase');
    expect(repondentCaseSequence[9].getNextStep({})).toBe('/respondent/task-list');

    expect(repondentCaseSequence[10].url).toBe('/respondent/confirmcontactdetails/checkanswers');
    expect(repondentCaseSequence[10].showInSection).toBe('aboutRespondentCase');
    expect(repondentCaseSequence[10].getNextStep({})).toBe('/respondent/task-list');

    expect(repondentCaseSequence[11].url).toBe('/respondent/confirmcontactdetails/personaldetails');
    expect(repondentCaseSequence[11].showInSection).toBe('aboutRespondentCase');
    expect(repondentCaseSequence[11].getNextStep({})).toBe('/respondent/task-list');

    expect(repondentCaseSequence[12].url).toBe('/respondent/confirmcontactdetails/contactdetails');
    expect(repondentCaseSequence[12].showInSection).toBe('aboutRespondentCase');
    expect(repondentCaseSequence[12].getNextStep({})).toBe('/respondent/task-list');

    expect(repondentCaseSequence[13].url).toBe('/respondent/confirmcontactdetails/addressdetails');
    expect(repondentCaseSequence[13].showInSection).toBe('aboutRespondentCase');
    expect(repondentCaseSequence[13].getNextStep({})).toBe('/respondent/confirmcontactdetails/addresslookup');

    expect(repondentCaseSequence[14].url).toBe('/respondent/confirmcontactdetails/addresslookup');
    expect(repondentCaseSequence[14].showInSection).toBe('aboutRespondentCase');
    expect(repondentCaseSequence[14].getNextStep({})).toBe('/respondent/confirmcontactdetails/addresslookupcont');

    expect(repondentCaseSequence[15].url).toBe('/respondent/confirmcontactdetails/addresslookupcont');
    expect(repondentCaseSequence[15].showInSection).toBe('aboutRespondentCase');
    expect(repondentCaseSequence[15].getNextStep({})).toBe('/respondent/confirmcontactdetails/addressconfirmation');

    expect(repondentCaseSequence[16].url).toBe('/respondent/confirmcontactdetails/addresslookup');
    expect(repondentCaseSequence[16].showInSection).toBe('aboutRespondentCase');
    expect(repondentCaseSequence[16].getNextStep({})).toBe('/respondent/confirmcontactdetails/addressconfirmation');

    expect(repondentCaseSequence[17].url).toBe('/respondent/confirmcontactdetails/addressconfirmation');
    expect(repondentCaseSequence[17].showInSection).toBe('aboutRespondentCase');
    expect(repondentCaseSequence[17].getNextStep({})).toBe('/respondent/task-list');

    expect(repondentCaseSequence[18].url).toBe('/respondent/confirmcontactdetails/addressblank');
    expect(repondentCaseSequence[18].showInSection).toBe('aboutRespondentCase');
    expect(repondentCaseSequence[18].getNextStep({})).toBe('/respondent/task-list');

    expect(repondentCaseSequence[19].url).toBe('/respondent/confirmcontactdetails/addresshistory');
    expect(repondentCaseSequence[19].showInSection).toBe('aboutRespondentCase');
    expect(repondentCaseSequence[19].getNextStep({})).toBe('/respondent/task-list');

    expect(repondentCaseSequence[20].url).toBe('/respondent/international-factors/start');
    expect(repondentCaseSequence[20].showInSection).toBe('aboutRespondentCase');
    expect(repondentCaseSequence[20].getNextStep({})).toBe('/respondent/international-factors/parents');

    expect(repondentCaseSequence[21].url).toBe('/respondent/international-factors/parents');
    expect(repondentCaseSequence[21].showInSection).toBe('aboutRespondentCase');
    expect(repondentCaseSequence[21].getNextStep({})).toBe('/respondent/international-factors/jurisdiction');

    expect(repondentCaseSequence[22].url).toBe('/respondent/international-factors/jurisdiction');
    expect(repondentCaseSequence[22].showInSection).toBe('aboutRespondentCase');
    expect(repondentCaseSequence[22].getNextStep({})).toBe('/respondent/international-factors/request');

    expect(repondentCaseSequence[23].url).toBe('/respondent/international-factors/request');
    expect(repondentCaseSequence[23].showInSection).toBe('aboutRespondentCase');
    expect(repondentCaseSequence[23].getNextStep({})).toBe('/respondent/international-factors/summary');

    expect(repondentCaseSequence[24].url).toBe('/respondent/international-factors/summary');
    expect(repondentCaseSequence[24].showInSection).toBe('aboutRespondentCase');
    expect(repondentCaseSequence[24].getNextStep({})).toBe('/respondent/task-list');

    expect(repondentCaseSequence[25].url).toBe('/respondent/safety_concerns/main_page');
    expect(repondentCaseSequence[25].showInSection).toBe('aboutRespondentCase');
    expect(repondentCaseSequence[25].getNextStep({})).toBe('/respondent/safety_concerns/your_safety');

    expect(repondentCaseSequence[26].url).toBe('/respondent/safety_concerns/your_safety');
    expect(repondentCaseSequence[26].showInSection).toBe('aboutRespondentCase');
    expect(repondentCaseSequence[26].getNextStep({})).toBe('/respondent/safety_concerns/domestic_abuse_risk');

    expect(repondentCaseSequence[27].url).toBe('/respondent/safety_concerns/domestic_abuse_risk');
    expect(repondentCaseSequence[27].showInSection).toBe('aboutRespondentCase');
    expect(repondentCaseSequence[27].getNextStep({})).toBe('/respondent/safety_concerns/domestic_abuse_risk_no');

    expect(repondentCaseSequence[28].url).toBe('/respondent/safety_concerns/domestic_abuse_risk_no');
    expect(repondentCaseSequence[28].showInSection).toBe('aboutRespondentCase');
    expect(repondentCaseSequence[28].getNextStep({})).toBe('/respondent/task-list');

    expect(repondentCaseSequence[29].url).toBe('/respondent/proceedings/start');
    expect(repondentCaseSequence[29].showInSection).toBe('aboutRespondentCase');
    //expect(repondentCaseSequence[29].getNextStep({})).toBe('/respondent/proceedings/court-proceedings');

    expect(repondentCaseSequence[30].url).toBe('/respondent/proceedings/court-proceedings');
    expect(repondentCaseSequence[30].showInSection).toBe('aboutRespondentCase');
    expect(repondentCaseSequence[30].getNextStep({})).toBe('/respondent/proceedings/summary');

    expect(repondentCaseSequence[31].url).toBe('/respondent/proceedings/summary');
    expect(repondentCaseSequence[31].showInSection).toBe('aboutRespondentCase');
    expect(repondentCaseSequence[31].getNextStep({})).toBe('/respondent/task-list');
  });
});

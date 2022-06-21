import { respondentCaseSequence } from './respondentcaseSequence';

describe('respondent1Sequence', () => {
  test('should contain 1 entries in respondent 1 screen sequence', () => {
    expect(respondentCaseSequence).toHaveLength(23);
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

    expect(respondentCaseSequence[5].url).toBe('/respondent/miam/miam-start');
    expect(respondentCaseSequence[5].showInSection).toBe('aboutRespondentCase');

    expect(respondentCaseSequence[6].url).toBe('/respondent/miam/willingness-to-attend-miam');
    expect(respondentCaseSequence[6].showInSection).toBe('aboutRespondentCase');
    expect(respondentCaseSequence[6].getNextStep({})).toBe('/respondent/miam/summary');

    expect(respondentCaseSequence[7].url).toBe('/respondent/miam/summary');
    expect(respondentCaseSequence[7].showInSection).toBe('aboutRespondentCase');
    expect(respondentCaseSequence[7].getNextStep({})).toBe('/respondent/task-list');

    expect(respondentCaseSequence[8].url).toBe('/respondent/confirm-contact-details/checkanswers');
    expect(respondentCaseSequence[8].showInSection).toBe('aboutRespondentCase');
    expect(respondentCaseSequence[8].getNextStep({})).toBe('/respondent/task-list');

    expect(respondentCaseSequence[9].url).toBe('/respondent/confirm-contact-details/personaldetails');
    expect(respondentCaseSequence[9].showInSection).toBe('aboutRespondentCase');
    expect(respondentCaseSequence[9].getNextStep({})).toBe('/respondent/task-list');

    expect(respondentCaseSequence[10].url).toBe('/respondent/confirm-contact-details/contactdetails');
    expect(respondentCaseSequence[10].showInSection).toBe('aboutRespondentCase');
    expect(respondentCaseSequence[10].getNextStep({})).toBe('/respondent/task-list');

    expect(respondentCaseSequence[11].url).toBe('/respondent/confirm-contact-details/addressdetails');
    expect(respondentCaseSequence[11].showInSection).toBe('aboutRespondentCase');
    expect(respondentCaseSequence[11].getNextStep({})).toBe('/respondent/confirm-contact-details/addresslookup');

    expect(respondentCaseSequence[16].url).toBe('/respondent/confirm-contact-details/addressblank');
    expect(respondentCaseSequence[16].showInSection).toBe('aboutRespondentCase');
    expect(respondentCaseSequence[16].getNextStep({})).toBe('/respondent/task-list');

    expect(respondentCaseSequence[15].url).toBe('/respondent/confirm-contact-details/addressconfirmation');
    expect(respondentCaseSequence[15].showInSection).toBe('aboutRespondentCase');
    expect(respondentCaseSequence[15].getNextStep({})).toBe('/respondent/task-list');

    expect(respondentCaseSequence[17].url).toBe('/respondent/confirm-contact-details/addresshistory');
    expect(respondentCaseSequence[17].showInSection).toBe('aboutRespondentCase');
    expect(respondentCaseSequence[17].getNextStep({})).toBe('/respondent/task-list');

    expect(respondentCaseSequence[18].url).toBe('/respondent/international-factors/start');
    expect(respondentCaseSequence[18].showInSection).toBe('aboutRespondentCase');
    expect(respondentCaseSequence[18].getNextStep({})).toBe('/respondent/international-factors/parents');


    expect(respondentCaseSequence[19].url).toBe('/respondent/international-factors/parents');
    expect(respondentCaseSequence[19].showInSection).toBe('aboutRespondentCase');
    expect(respondentCaseSequence[19].getNextStep({})).toBe('/respondent/international-factors/jurisdiction');

    expect(respondentCaseSequence[20].url).toBe('/respondent/international-factors/jurisdiction');
    expect(respondentCaseSequence[20].showInSection).toBe('aboutRespondentCase');
    expect(respondentCaseSequence[20].getNextStep({})).toBe('/respondent/international-factors/request');

    expect(respondentCaseSequence[21].url).toBe('/respondent/international-factors/request');
    expect(respondentCaseSequence[21].showInSection).toBe('aboutRespondentCase');
    expect(respondentCaseSequence[21].getNextStep({})).toBe('/respondent/international-factors/summary');

    expect(respondentCaseSequence[22].url).toBe('/respondent/international-factors/summary');
    expect(respondentCaseSequence[22].showInSection).toBe('aboutRespondentCase');
    expect(respondentCaseSequence[22].getNextStep({})).toBe('/respondent/task-list');

  });
});

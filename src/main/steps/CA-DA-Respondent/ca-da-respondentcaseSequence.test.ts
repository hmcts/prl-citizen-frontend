import { cAdARespondentCaseSequence } from './ca-da-respondentcaseSequence';

describe('cAdARespondentCaseSequence', () => {
  test('should contain 1 entries in ca-da-respondent 1 screen sequence', () => {
    expect(cAdARespondentCaseSequence).toHaveLength(12);

    expect(cAdARespondentCaseSequence[0].url).toBe('/ca-da-respondent/task-list');
    expect(cAdARespondentCaseSequence[0].showInSection).toBe('aboutCaAndDaRespondentCase');
    expect(cAdARespondentCaseSequence[0].getNextStep({})).toBe('/ca-da-respondent/task-list');

    expect(cAdARespondentCaseSequence[1].url).toBe('/ca-da-respondent/support-you-need-during-case');
    expect(cAdARespondentCaseSequence[1].showInSection).toBe('aboutCaAndDaRespondentCase');
    expect(cAdARespondentCaseSequence[1].getNextStep({})).toBe(
      '/ca-da-respondent/support-you-need-during-case/attending-the-court'
    );

    expect(cAdARespondentCaseSequence[2].url).toBe(
      '/ca-da-respondent/support-you-need-during-case/attending-the-court'
    );
    expect(cAdARespondentCaseSequence[2].showInSection).toBe('aboutCaAndDaRespondentCase');
    expect(cAdARespondentCaseSequence[2].getNextStep({})).toBe(
      '/ca-da-respondent/support-you-need-during-case/language-requirements'
    );

    expect(cAdARespondentCaseSequence[3].url).toBe(
      '/ca-da-respondent/support-you-need-during-case/language-requirements'
    );
    expect(cAdARespondentCaseSequence[3].showInSection).toBe('aboutCaAndDaRespondentCase');
    expect(cAdARespondentCaseSequence[3].getNextStep({})).toBe(
      '/ca-da-respondent/support-you-need-during-case/special-arrangements'
    );

    expect(cAdARespondentCaseSequence[4].url).toBe(
      '/ca-da-respondent/support-you-need-during-case/special-arrangements'
    );
    expect(cAdARespondentCaseSequence[4].showInSection).toBe('aboutCaAndDaRespondentCase');
    expect(cAdARespondentCaseSequence[4].getNextStep({})).toBe(
      '/ca-da-respondent/support-you-need-during-case/reasonable-adjustments'
    );

    expect(cAdARespondentCaseSequence[5].url).toBe(
      '/ca-da-respondent/support-you-need-during-case/reasonable-adjustments'
    );
    expect(cAdARespondentCaseSequence[5].showInSection).toBe('aboutCaAndDaRespondentCase');
    expect(cAdARespondentCaseSequence[5].getNextStep({})).toBe(
      '/ca-da-respondent/support-you-need-during-case/documents-support'
    );

    expect(cAdARespondentCaseSequence[6].url).toBe('/ca-da-respondent/support-you-need-during-case/documents-support');
    expect(cAdARespondentCaseSequence[6].showInSection).toBe('aboutCaAndDaRespondentCase');
    expect(cAdARespondentCaseSequence[6].getNextStep({})).toBe(
      '/ca-da-respondent/support-you-need-during-case/communication-help'
    );

    expect(cAdARespondentCaseSequence[7].url).toBe('/ca-da-respondent/support-you-need-during-case/communication-help');
    expect(cAdARespondentCaseSequence[7].showInSection).toBe('aboutCaAndDaRespondentCase');
    expect(cAdARespondentCaseSequence[7].getNextStep({})).toBe(
      '/ca-da-respondent/support-you-need-during-case/court-hearing-support'
    );

    expect(cAdARespondentCaseSequence[8].url).toBe(
      '/ca-da-respondent/support-you-need-during-case/court-hearing-support'
    );
    expect(cAdARespondentCaseSequence[8].showInSection).toBe('aboutCaAndDaRespondentCase');
    expect(cAdARespondentCaseSequence[8].getNextStep({})).toBe(
      '/ca-da-respondent/support-you-need-during-case/court-hearing-comfort'
    );

    expect(cAdARespondentCaseSequence[9].url).toBe(
      '/ca-da-respondent/support-you-need-during-case/court-hearing-comfort'
    );
    expect(cAdARespondentCaseSequence[9].showInSection).toBe('aboutCaAndDaRespondentCase');
    expect(cAdARespondentCaseSequence[9].getNextStep({})).toBe(
      '/ca-da-respondent/support-you-need-during-case/travelling-to-court'
    );

    expect(cAdARespondentCaseSequence[10].url).toBe(
      '/ca-da-respondent/support-you-need-during-case/travelling-to-court'
    );
    expect(cAdARespondentCaseSequence[10].showInSection).toBe('aboutCaAndDaRespondentCase');
    expect(cAdARespondentCaseSequence[10].getNextStep({})).toBe(
      '/ca-da-respondent/support-you-need-during-case/summary'
    );

    expect(cAdARespondentCaseSequence[11].url).toBe('/ca-da-respondent/support-you-need-during-case/summary');
    expect(cAdARespondentCaseSequence[11].showInSection).toBe('aboutCaAndDaRespondentCase');
    expect(cAdARespondentCaseSequence[11].getNextStep({})).toBe('/ca-da-respondent/task-list');
  });
});

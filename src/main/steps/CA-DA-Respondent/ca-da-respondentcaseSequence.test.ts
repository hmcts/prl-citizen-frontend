import { respondentCaseSequence } from './ca-da-respondentcaseSequence';

describe('respondentCaseSequence', () => {
  test('should contain 1 entries in ca-da-respondent 1 screen sequence', () => {
    expect(respondentCaseSequence).toHaveLength(11);

    expect(respondentCaseSequence[0].url).toBe('/ca-da-respondent/task-list');
    expect(respondentCaseSequence[0].showInSection).toBe('aboutCaAndDaRespondentCase');
    expect(respondentCaseSequence[0].getNextStep({})).toBe('/ca-da-respondent/task-list');

    expect(respondentCaseSequence[1].url).toBe('/ca-da-respondent/support-you-need-during-case');
    expect(respondentCaseSequence[1].showInSection).toBe('aboutCaAndDaRespondentCase');
    expect(respondentCaseSequence[1].getNextStep({})).toBe(
      '/ca-da-respondent/support-you-need-during-case/language-requirements'
    );

    expect(respondentCaseSequence[2].url).toBe('/ca-da-respondent/support-you-need-during-case/language-requirements');
    expect(respondentCaseSequence[2].showInSection).toBe('aboutCaAndDaRespondentCase');
    expect(respondentCaseSequence[2].getNextStep({})).toBe(
      '/ca-da-respondent/support-you-need-during-case/reasonable-adjustments'
    );

    expect(respondentCaseSequence[3].url).toBe('/ca-da-respondent/support-you-need-during-case/reasonable-adjustments');
    expect(respondentCaseSequence[3].showInSection).toBe('aboutCaAndDaRespondentCase');
    expect(respondentCaseSequence[3].getNextStep({})).toBe(
      '/ca-da-respondent/support-you-need-during-case/documents-support'
    );

    expect(respondentCaseSequence[4].url).toBe('/ca-da-respondent/support-you-need-during-case/documents-support');
    expect(respondentCaseSequence[4].showInSection).toBe('aboutCaAndDaRespondentCase');
    expect(respondentCaseSequence[4].getNextStep({})).toBe(
      '/ca-da-respondent/support-you-need-during-case/communication-help'
    );

    expect(respondentCaseSequence[5].url).toBe('/ca-da-respondent/support-you-need-during-case/communication-help');
    expect(respondentCaseSequence[5].showInSection).toBe('aboutCaAndDaRespondentCase');
    expect(respondentCaseSequence[5].getNextStep({})).toBe(
      '/ca-da-respondent/support-you-need-during-case/court-hearing-support'
    );

    expect(respondentCaseSequence[6].url).toBe('/ca-da-respondent/support-you-need-during-case/court-hearing-support');
    expect(respondentCaseSequence[6].showInSection).toBe('aboutCaAndDaRespondentCase');
    expect(respondentCaseSequence[6].getNextStep({})).toBe(
      '/ca-da-respondent/support-you-need-during-case/court-hearing-comfort'
    );

    expect(respondentCaseSequence[7].url).toBe('/ca-da-respondent/support-you-need-during-case/court-hearing-comfort');
    expect(respondentCaseSequence[7].showInSection).toBe('aboutCaAndDaRespondentCase');
    expect(respondentCaseSequence[7].getNextStep({})).toBe(
      '/ca-da-respondent/support-you-need-during-case/travelling-to-court'
    );

    expect(respondentCaseSequence[8].url).toBe('/ca-da-respondent/support-you-need-during-case/travelling-to-court');
    expect(respondentCaseSequence[8].showInSection).toBe('aboutCaAndDaRespondentCase');
    expect(respondentCaseSequence[8].getNextStep({})).toBe(
      '/ca-da-respondent/support-you-need-during-case/unable-to-take-court-proceedings'
    );

    expect(respondentCaseSequence[9].url).toBe(
      '/ca-da-respondent/support-you-need-during-case/unable-to-take-court-proceedings'
    );
    expect(respondentCaseSequence[9].showInSection).toBe('aboutCaAndDaRespondentCase');
    expect(respondentCaseSequence[9].getNextStep({})).toBe(
      '/ca-da-respondent/support-you-need-during-case/safety-arrangements'
    );

    expect(respondentCaseSequence[10].url).toBe('/ca-da-respondent/support-you-need-during-case/safety-arrangements');
    expect(respondentCaseSequence[10].showInSection).toBe('aboutCaAndDaRespondentCase');
    expect(respondentCaseSequence[10].getNextStep({})).toBe('/ca-da-respondent/task-list');
  });
});

import languageAssertions from '../../../../../test/unit/utils/languageAssertions';
import { FormContent, FormFields, FormOptions, LanguageLookup } from '../../../../app/form/Form';
import { atLeastOneFieldIsChecked } from '../../../../app/form/validation';
import { CommonContent, generatePageContent } from '../../../common/common.content';

import { generateContent } from './content';

jest.mock('../../../../app/form/validation');

const en = {
  caption: 'MIAM exemptions',
  title: 'Can you confirm that you previously attended a MIAM, or had a valid reason not to attend?',
  attendedMiamMidiation: 'Have you attended a Mediation Information and Assessment Meeting (MIAM)?',
  insetHtml: `<p class="govuk-body">If you are seeking a MIAM exemption, you will need to give more details. </p>
              <p class="govuk-body">The court needs this information to decide if you need to attend a MIAM.</p>`,
  select_all_apply: 'Select all that apply to you',
  fourMonthsPriorAttended: `In the 4 months prior to making the application, you attended 
                            a MIAM or participated in another form of non-court dispute resolution relating Have you attended a Mediation Information and Assessment Meeting (MIAM)
                            to the same or substantially the same dispute`,
  onTimeParticipation: `At the time of making the application, you are participating in another
                        form of non-court dispute resolution relating to the same or 
                        substantially the same dispute`,
  beforeInitiationProceeding: `This application would be made in existing proceedings which are continuing 
                               and you attended a MIAM before initiating those proceedings`,
  fourMonthsPriorFiled: `In the 4 months prior to making the application, you filed a relevant
                        family application confirming that a MIAM exemption applied and that application
                        related to the same or substantially the same dispute`,
  miamExamptionApplied: `The application would be made in existing proceedings which are continuing
                         and a MIAM exemption applied to the application for those proceedings`,
  beforStatingApplication: `The application would be made in existing proceedings which 
                            are continuing and and the applicant attended a MIAM before starting those proceedings`,
  noneOfTheAbove: 'None of the above',
  errors: {
    miam_previousAttendance: {
      required: 'Confirm if you previously attended a MIAM, or had a valid reason not to attend',
    },
  },
};

const cy = {
  caption: 'MIAM exemptions - welsh',
  title: 'Can you confirm that you previously attended a MIAM, or had a valid reason not to attend? - welsh',
  attendedMiamMidiation: 'Have you attended a Mediation Information and Assessment Meeting (MIAM)?',
  insetHtml: `<p class="govuk-body">If you are seeking a MIAM exemption, you will need to give more details. </p>
             <p class="govuk-body">The court needs this information to decide if you need to attend a MIAM.</p> - welsh`,
  select_all_apply: 'Select all that apply to you - welsh',
  fourMonthsPriorAttended: `In the 4 months prior to making the application, you attended 
                            a MIAM or participated in another form of non-court dispute resolution relating 
                            to the same or substantially the same dispute - welsh`,
  onTimeParticipation: `At the time of making the application, you are participating in another
                        form of non-court dispute resolution relating to the same or 
                        substantially the same dispute - welsh`,
  beforeInitiationProceeding: `This application would be made in existing proceedings which are continuing 
                                and you attended a MIAM before initiating those proceedings - welsh`,
  fourMonthsPriorFiled: `In the 4 months prior to making the application, you filed a relevant
                          family application confirming that a MIAM exemption applied and that application
                          related to the same or substantially the same dispute - welsh`,
  miamExamptionApplied: `The application would be made in existing proceedings which are continuing
                          and a MIAM exemption applied to the application for those proceedings - welsh`,
  beforStatingApplication: `The application would be made in existing proceedings which 
                            are continuing and and the applicant attended a MIAM before starting those proceedings - welsh`,
  noneOfTheAbove: 'None of the above  - welsh',
  errors: {
    miam_previousAttendance: {
      required: 'Confirm if you previously attended a MIAM, or had a valid reason not to attend - welsh',
    },
  },
};
/* eslint-disable @typescript-eslint/ban-types */
describe('Urgency requirements content', () => {
  const commonContent = { language: 'en' } as CommonContent;
  let generatedContent;
  let form;
  let fields;
  beforeEach(() => {
    generatedContent = generateContent(commonContent);
    form = generatedContent.form as FormContent;
    fields = form.fields as FormFields;
  });
  // eslint-disable-next-line jest/expect-expect
  test('should return correct english content', () => {
    languageAssertions('en', en, () => generateContent(commonContent));
  });

  // eslint-disable-next-line jest/expect-expect
  test('should return correct welsh content', () => {
    languageAssertions('cy', cy, () => generateContent({ ...commonContent, language: 'cy' }));
  });

  test('should contain riskUrgency field', () => {
    const previousAttendance = fields.miam_previousAttendance as FormOptions;
    expect(previousAttendance.type).toBe('checkboxes');

    expect((previousAttendance.hint as LanguageLookup)(generatedContent)).toBe(en.select_all_apply);
    expect((previousAttendance.values[0].label as LanguageLookup)(generatedContent)).toBe(en.fourMonthsPriorAttended);
    expect((previousAttendance.values[1].label as LanguageLookup)(generatedContent)).toBe(en.onTimeParticipation);
    expect((previousAttendance.values[2].label as LanguageLookup)(generatedContent)).toBe(
      en.beforeInitiationProceeding
    );
    expect((previousAttendance.values[3].label as LanguageLookup)(generatedContent)).toBe(en.fourMonthsPriorFiled);
    expect((previousAttendance.values[4].label as LanguageLookup)(generatedContent)).toBe(en.miamExamptionApplied);
    expect((previousAttendance.values[5].label as LanguageLookup)(generatedContent)).toBe(en.beforStatingApplication);
    expect((previousAttendance.values[7].label as LanguageLookup)(generatedContent)).toBe(en.noneOfTheAbove);
    expect(previousAttendance.values[7].behaviour).toBe('exclusive');

    (previousAttendance.validator as Function)('fourMonthsPriorFiled');
    expect(atLeastOneFieldIsChecked).toHaveBeenCalledWith('fourMonthsPriorFiled');
  });

  test('should contain continue button', () => {
    expect(
      (form?.onlycontinue?.text as LanguageLookup)(generatePageContent({ language: 'en' }) as Record<string, never>)
    ).toBe('Continue');
  });

  test('should contain saveAndComeLater button', () => {
    expect(
      (form?.saveAndComeLater?.text as LanguageLookup)(generatePageContent({ language: 'en' }) as Record<string, never>)
    ).toBe('Save and come back later');
  });
});

import languageAssertions from '../../../../../test/unit/utils/languageAssertions';
import { FormContent, FormFields, FormOptions, LanguageLookup } from '../../../../app/form/Form';
import { atLeastOneFieldIsChecked } from '../../../../app/form/validation';
import { CommonContent, generatePageContent } from '../../../common/common.content';

import { generateContent } from './content';

jest.mock('../../../../app/form/validation');

const en = {
  caption: 'MIAM exemptions',
  title: 'Can you confirm that you previously attended a MIAM, or had a valid reason not to attend?',
  insetHtml: `<p class="govuk-body">If you are seeking a MIAM exemption, you will need to give more details. </p>
              <p class="govuk-body">The court needs this information to decide if you need to attend a MIAM.</p>`,
  select_all_apply: 'Select all that apply to you',
  fourMonthsPriorAttended: `In the 4 months prior to making the application, you attended 
                            a MIAM or participated in another form of non-court dispute resolution relating 
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
  caption: 'Esemptiadau MIAM',
  title:
    'A allwch chi gadarnhau eich bod wedi mynychu MIAM yn barod, neu fod gennych reswm dilys dros beidio â mynychu?',
  insetHtml: `<p class="govuk-body">Os ydych chi’n ceisio esemptiad rhag mynychu MIAM, bydd angen i chi ddarparu mwy o fanylion. </p>
             <p class="govuk-body">Mae’r llys angen yr wybodaeth hon i benderfynu a oes angen i chi fynychu MIAM ai peidio.</p>`,
  select_all_apply: "Dewiswch bob un sy'n berthnasol i chi",
  fourMonthsPriorAttended:
    'Yn y 4 mis cyn gwneud y cais, bu ichi fynychu MIAM neu gymryd rhan mewn math arall o broses i ddatrys anghydfod y tu allan i’r llys yn ymwneud â’r un anghydfod neu yr un anghydfod i raddau helaeth',
  onTimeParticipation:
    'Ar adeg gwneud y cais, bu ichi gymryd rhan mewn math arall o broses i ddatrys anghydfod y tu allan i’r llys yn ymwneud â’r un anghydfod neu yr un anghydfod i raddau helaeth',
  beforeInitiationProceeding:
    'Byddai’r cais yn cael ei wneud ynghylch achos presennol sy’n parhau a bu ichi fynychu MIAM cyn cychwyn yr achos hwnnw',
  fourMonthsPriorFiled:
    'Yn y 4 mis cyn gwneud y cais, bu ichi ffeilio cais perthnasol i’r llys teulu yn cadarnhau bod esemptiad rhag mynychu MIAM yn berthnasol a bod y cais yn ymwneud â’r un anghydfod neu yr un anghydfod i raddau helaeth',
  miamExamptionApplied:
    'Byddai’r cais yn cael ei wneud ynghylch achos presennol sy’n parhau ac roedd esemptiad rhag mynychu MIAM yn berthnasol pan wnaed y cais ynghylch yr achos hwnnw',
  beforStatingApplication:
    'Byddai’r cais yn cael ei wneud ynghylch achos presennol sy’n parhau a mynychodd y ceisydd MIAM cyn cychwyn yr achos hwnnw',
  noneOfTheAbove: "Dim un o'r uchod",
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

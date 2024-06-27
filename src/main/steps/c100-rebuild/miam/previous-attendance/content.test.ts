import languageAssertions from '../../../../../test/unit/utils/languageAssertions';
import { FormContent, FormFields, FormOptions, LanguageLookup } from '../../../../app/form/Form';
import { atLeastOneFieldIsChecked } from '../../../../app/form/validation';
import { CommonContent, en as enContent, generatePageContent } from '../../../common/common.content';

import { generateContent } from './content';

jest.mock('../../../../app/form/validation');

const en = {
  caption: 'MIAM exemptions',
  title: 'Previous MIAM attendance or non-court dispute resolution (NCDR)',
  content: 'You need to give the court evidence of why you cannot attend a MIAM.',
  evidenceForPreviousMIAM: 'What evidence do you have that you previously attended a MIAM or NCDR?',
  fourMonthsPriorAttended:
    'In the 4 months before making the application, you attended a MIAM or participated in another form of NCDR relating to the same (or substantially the same) dispute',
  fourMonthsPriorAttendedHint:
    'If you attended a MIAM or NCDR, you’ll need to provide a signed document from the mediator',
  miamExamptionApplied:
    'The application would be made in existing proceedings which are continuing and a MIAM exemption applied to the application for those proceedings',
  miamExamptionAppliedHint: 'You will need to provide a signed document from the mediator',
  noneOfThese: 'None of these',
  errors: {
    miam_previousAttendance: {
      required: 'Select what evidence you have that you previously attended a MIAM or NCDR',
    },
  },
};

const cy = {
  caption: 'Esemptiadau MIAM',
  title: 'Wedi mynychu MIAM yn barod neu ddatrys anghydfod y tu allan i’r llys (NCDR)',
  content: 'Mae angen i chi roi tystiolaeth i’r llys pam na allwch fynychu MIAM.',
  evidenceForPreviousMIAM: 'Pa dystiolaeth sydd gennych eich bod eisoes wedi mynychu MIAM?',
  fourMonthsPriorAttended:
    'Yn y 4 mis cyn gwneud y cais, bu ichi fynychu MIAM neu gymryd rhan mewn math arall o NCDR yn ymwneud â’r un anghydfod (neu’r un anghydfod i raddau helaeth)',
  fourMonthsPriorAttendedHint:
    'Os ydych wedi mynychu MIAM neu NCDR, bydd angen i chi ddarparu dogfen wedi’i llofnodi gan y cyfryngwr',
  miamExamptionApplied:
    'Byddai’r cais hwn yn cael ei wneud mewn achos presennol sydd ar y gweill a bu ichi fynychu MIAM cyn cychwyn yr achos hwnnw',
  miamExamptionAppliedHint: 'Bydd angen i chi ddarparu dogfen wedi’i llofnodi gan y cyfryngwr',
  noneOfThese: 'Dim un o’r rhain',
  errors: {
    miam_previousAttendance: {
      required: 'Dewiswch pa dystiolaeth sydd gennych eich bod eisoes wedi mynychu MIAM neu NCDR',
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
    expect(previousAttendance.type).toBe('radios');

    expect((previousAttendance.label as LanguageLookup)(generatedContent)).toBe(en.evidenceForPreviousMIAM);
    expect((previousAttendance.values[0].label as LanguageLookup)(generatedContent)).toBe(en.fourMonthsPriorAttended);
    expect((previousAttendance.values[0].hint as LanguageLookup)(generatedContent)).toBe(
      en.fourMonthsPriorAttendedHint
    );
    expect((previousAttendance.values[1].label as LanguageLookup)(generatedContent)).toBe(en.miamExamptionApplied);
    expect((previousAttendance.values[1].hint as LanguageLookup)(generatedContent)).toBe(en.miamExamptionAppliedHint);
    expect((previousAttendance.values[2].divider as Function)(enContent)).toBe('or');
    expect((previousAttendance.values[3].label as LanguageLookup)(generatedContent)).toBe(en.noneOfThese);
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

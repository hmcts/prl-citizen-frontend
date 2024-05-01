import languageAssertions from '../../../../../test/unit/utils/languageAssertions';
import { FormContent, FormFields, FormOptions, LanguageLookup } from '../../../../app/form/Form';
import { CommonContent, generatePageContent } from '../../../common/common.content';

import { generateContent } from './content';

const en = {
  title: 'MIAM exemptions',
  label: 'What are your reasons for not attending a MIAM?',
  courtcommunication: 'You need to give the court details of why you have not attended a MIAM.',
  optionHint: 'Select all reasons that apply.',
  domesticViolence: 'Domestic abuse',
  childProtection: 'Child protection concerns',
  urgentHearing: 'Urgency',
  previousMIAMOrExempt: 'Previous attendance of a MIAM, or non-court dispute resolution',
  validExemption: 'Other reason',
  noReason: 'None of these',
  summaryText: 'Contacts for help',
  continue: 'Save and continue',
  divider: 'or',
  errors: {
    miam_nonAttendanceReasons: {
      required: 'Select reasons for not attending a MIAM',
    },
  },
};

const cy = {
  title: 'Esemptiadau MIAM',
  label: 'Beth yw eich rhesymau dros beidio â mynychu MIAM?',
  courtcommunication: 'Mae angen i chi roi manylion i’r llys pam nad ydych wedi mynychu MIAM.',
  optionHint: "Dewiswch bob rheswm sy'n berthnasol.",
  domesticViolence: 'Cam-drin domestig',
  childProtection: 'Pryderon amddiffyn plant',
  urgentHearing: 'Cais brys',
  previousMIAMOrExempt: 'Wedi mynychu MIAM yn barod neu ddatrys anghydfod y tu allan i’r llys (NCDR)',
  validExemption: 'Rheswm arall',
  noReason: 'Dim un o’r rhain',
  summaryText: 'Cysylltiadau am gymorth',
  continue: 'Cadw’r cais a dychwelyd ato yn hwyrach ymlaen',
  divider: 'neu',
  errors: {
    miam_nonAttendanceReasons: {
      required: 'Dewiswch eich rhesymau dilys dros beidio â mynychu MIAM',
    },
  },
};

jest.mock('../../../../app/form/validation');
/* eslint-disable @typescript-eslint/ban-types */
describe('citizen-home content', () => {
  const commonContent = { language: 'en' } as CommonContent;
  let generatedContent;
  let form;
  let fields;
  beforeEach(() => {
    generatedContent = generateContent(commonContent);
    form = generatedContent.form as FormContent;
    fields = form.fields as FormFields;
  });

  test('should return correct english content', () => {
    const miam_nonAttendanceReasons = fields.miam_nonAttendanceReasons as FormOptions;

    expect(miam_nonAttendanceReasons.type).toBe('checkboxes');
    expect((miam_nonAttendanceReasons.hint as LanguageLookup)(generatedContent)).toBe(en.optionHint);
    expect((miam_nonAttendanceReasons.values[0].label as LanguageLookup)(generatedContent)).toBe(en.domesticViolence);
    expect((miam_nonAttendanceReasons.values[1].label as LanguageLookup)(generatedContent)).toBe(en.childProtection);
    expect((miam_nonAttendanceReasons.values[2].label as LanguageLookup)(generatedContent)).toBe(en.urgentHearing);
    expect((miam_nonAttendanceReasons.values[3].label as LanguageLookup)(generatedContent)).toBe(
      en.previousMIAMOrExempt
    );
    expect((miam_nonAttendanceReasons.values[4].label as LanguageLookup)(generatedContent)).toBe(en.validExemption);
    expect((miam_nonAttendanceReasons.values[6].label as LanguageLookup)(generatedContent)).toBe(en.noReason);

    expect(miam_nonAttendanceReasons.values[6].behaviour).toBe('exclusive');
  });

  test('should return correct english content Data', () => {
    languageAssertions('en', en, () => generateContent(commonContent));
  });

  test('should return correct welsh content Data', () => {
    const commonContentcy = { language: 'cy' } as CommonContent;
    languageAssertions('cy', cy, () => generateContent(commonContentcy));
  });

  test('should contain continue button', () => {
    expect(
      (form?.onlycontinue.text as LanguageLookup)(generatePageContent({ language: 'en' }) as Record<string, never>)
    ).toBe('Continue');
  });

  test('should contain saveAndComeLater button', () => {
    expect(
      (form?.saveAndComeLater.text as LanguageLookup)(generatePageContent({ language: 'en' }) as Record<string, never>)
    ).toBe('Save and come back later');
  });
});

/* eslint-enable @typescript-eslint/ban-types */

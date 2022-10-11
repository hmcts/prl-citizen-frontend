import languageAssertions from '../../../../../test/unit/utils/languageAssertions';
import { FormContent, FormFields, FormOptions, LanguageLookup } from '../../../../app/form/Form';
import { CommonContent, generatePageContent } from '../../../common/common.content';

import { generateContent } from './content';

const en = {
  section: 'MIAM exemptions',
  title: 'What are your valid reasons for not attending a MIAM?',
  courtcommunication:
    'The court needs more information to assess if your reasons are valid. If you cannot provide enough supporting information, you will be asked to attend a MIAM.',
  optionHint: 'Select all that apply to you - you will be asked to provide further details next',
  domesticViolence: 'I have evidence of domestic violence and abuse',
  childProtection: 'I have child protection concerns',
  urgentHearing: 'I have a reason for an urgent hearing',
  previousMIAMOrExempt: 'I have previously attended a MIAM, or already have a court confirmed exemption',
  validExemption: 'I have other valid reasons to be exempt from a MIAM',
  noReason: 'None of the above',
  summaryText: 'Contacts for help',
  continue: 'Save and continue',
  errors: {
    miam_nonAttendanceReasons: {
      required: 'Select your valid reasons for not attending a MIAM',
    },
  },
};

const cy = {
  section: 'MIAM exemptions',
  title: 'What are your valid reasons for not attending a MIAM?',
  courtcommunication:
    'The court needs more information to assess if your reasons are valid. If you cannot provide enough supporting information, you will be asked to attend a MIAM.',
  optionHint: 'Select all that apply to you - you will be asked to provide further details next',
  domesticViolence: 'I have evidence of domestic violence and abuse',
  childProtection: 'I have child protection concerns',
  urgentHearing: 'I have a reason for an urgent hearing',
  previousMIAMOrExempt: 'I have previously attended a MIAM, or already have a court confirmed exemption',
  validExemption: 'I have other valid reasons to be exempt from a MIAM',
  noReason: 'None of the above',
  summaryText: 'Contacts for help',
  continue: 'Save and continue',
  errors: {
    miam_nonAttendanceReasons: {
      required: 'Select your valid reasons for not attending a MIAM',
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
    languageAssertions('cy', cy, () => generateContent(commonContent));
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

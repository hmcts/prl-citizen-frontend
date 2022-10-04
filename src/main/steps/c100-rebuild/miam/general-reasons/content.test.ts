import languageAssertions from '../../../../../test/unit/utils/languageAssertions';
import { FormContent, FormFields, FormOptions, LanguageLookup } from '../../../../app/form/Form';
import { CommonContent } from '../../../common/common.content';

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
    miamNonAttendanceReason: {
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
    miamNonAttendanceReason: {
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
    const miamNonAttendanceReason = fields.miamNonAttendanceReason as FormOptions;

    expect(miamNonAttendanceReason.type).toBe('checkboxes');
    expect((miamNonAttendanceReason.hint as LanguageLookup)(generatedContent)).toBe(en.optionHint);
    expect((miamNonAttendanceReason.values[0].label as LanguageLookup)(generatedContent)).toBe(en.domesticViolence);
    expect((miamNonAttendanceReason.values[1].label as LanguageLookup)(generatedContent)).toBe(en.childProtection);
    expect((miamNonAttendanceReason.values[2].label as LanguageLookup)(generatedContent)).toBe(en.urgentHearing);
    expect((miamNonAttendanceReason.values[3].label as LanguageLookup)(generatedContent)).toBe(en.previousMIAMOrExempt);
    expect((miamNonAttendanceReason.values[4].label as LanguageLookup)(generatedContent)).toBe(en.validExemption);
    expect((miamNonAttendanceReason.values[6].label as LanguageLookup)(generatedContent)).toBe(en.noReason);

    expect(miamNonAttendanceReason.values[6].behaviour).toBe('exclusive');
  });

  // eslint-disable-next-line jest/expect-expect
  test('should return correct english content Data', () => {
    languageAssertions('en', en, () => generateContent(commonContent));
  });

  // eslint-disable-next-line jest/expect-expect
  test('should return correct welsh content', () => {
    languageAssertions('cy', cy, () => generateContent({ ...commonContent, language: 'cy' }));
  });

  test('should contain Save and continue button', () => {
    expect((form.submit?.text as Function)(generatedContent)).toBe('Save and continue');
  });
});

/* eslint-enable @typescript-eslint/ban-types */

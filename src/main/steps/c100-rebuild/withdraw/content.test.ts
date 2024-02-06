/* eslint-disable @typescript-eslint/ban-types */
import languageAssertions from '../../../../test/unit/utils/languageAssertions';
import { FormContent, FormFields, FormOptions, LanguageLookup } from '../../../app/form/Form';
import { isFieldFilledIn, isTextAreaValid } from '../../../app/form/validation';
import { CommonContent, generatePageContent } from '../../common/common.content';

import { generateContent } from './content';

jest.mock('../../../app/form/validation');

const en = {
  title: 'Are you sure you want to withdraw your application?',
  paragraphs: [
    'The court will consider your reasons, and decide whether or not you can withdraw the application.',
    'If you have paid a court fee, you may not receive a refund.',
  ],
  warningText: {
    text: 'If you withdraw this application, you cannot resubmit it.',
    iconFallbackText: 'Warning',
  },
  one: 'Yes',
  two: 'No',
  withdrawApplicationReason: 'Why are you withdrawing this application?',
  errors: {
    withdrawApplication: {
      required: 'Select yes if you want to withdraw else select no.',
    },
    withdrawApplicationReason: {
      required: 'Provide details about withdrawing this application.',
      invalidCharacters: 'You have entered an invalid character. Special characters <,>,{,} are not allowed.',
      invalid:
        'You have exceeded the character limit accepted by the free text field. Please enter 5,000 characters or less.',
    },
  },
};

const cy = {
  title: 'Ydych chi’n siŵr eich bod eisiau tynnu eich cais yn ôl?',
  paragraphs: [
    'The court will consider your reasons, and decide whether or not you can withdraw the application. -welsh',
    'If you have paid a court fee, you may not receive a refund. -welsh',
  ],
  warningText: {
    text: 'If you withdraw this application, you cannot resubmit it. -welsh',
    iconFallbackText: 'Rhybudd',
  },
  one: 'Yes -welsh',
  two: 'No -welsh',
  withdrawApplicationReason: 'Why are you withdrawing this application? -welsh',
  errors: {
    withdrawApplication: {
      required: 'Select yes if you want to withdraw else select no. -welsh',
    },
    withdrawApplicationReason: {
      required: 'Rhowch ragor o fanylion ynghylch tynnu’r cais hwn yn ôl',
      invalidCharacters: 'Rydych wedi defnyddio nod annilys. Ni chaniateir y nodau arbennig hyn <,>,{,}',
      invalid:
        'Rydych wedi defnyddio mwy o nodau na’r hyn a ganiateir yn y blwch testun rhydd. Defnyddiwch 5,000 neu lai o nodau.',
    },
  },
};

describe('applicant personal details > applying-with > content', () => {
  const commonContent = { language: 'en', userCase: { applyingWith: 'alone' } } as unknown as CommonContent;
  // eslint-disable-next-line jest/expect-expect
  test('should return correct english content', () => {
    languageAssertions('en', en, () => generateContent(commonContent));
  });

  // eslint-disable-next-line jest/expect-expect
  test('should return correct welsh content', () => {
    languageAssertions('cy', cy, () => generateContent({ ...commonContent, language: 'cy' }));
  });
  test('should contain applyingWith field', () => {
    const generatedContent = generateContent(commonContent) as Record<string, never>;
    const form = generatedContent.form as FormContent;
    const fields = form.fields as FormFields;
    const applyingWithField = fields.withdrawApplication as FormOptions;
    expect(applyingWithField.type).toBe('radios');
    expect(applyingWithField.classes).toBe('govuk-radios');
    expect((applyingWithField.values[0].label as LanguageLookup)(generatedContent)).toBe(en.one);
    expect(
      (applyingWithField.values[0].subFields?.withdrawApplicationReason.label as LanguageLookup)(generatedContent)
    ).toBe(en.withdrawApplicationReason);
    (applyingWithField.values[0].subFields?.withdrawApplicationReason.validator as Function)('MOCK_VALUE');
    expect(isFieldFilledIn).toHaveBeenCalled();
    expect(isTextAreaValid).toHaveBeenCalled();
    expect((applyingWithField.values[1].label as LanguageLookup)(generatedContent)).toBe(en.two);
  });

  test('should contain Save and Continue button', () => {
    const generatedContent = generateContent(commonContent);
    const form = generatedContent.form as FormContent | undefined;
    expect(
      (form?.submit?.text as LanguageLookup)(generatePageContent({ language: 'en' }) as Record<string, never>)
    ).toBe('Save and continue');
  });
});

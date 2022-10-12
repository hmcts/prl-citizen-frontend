import languageAssertions from '../../../../../../test/unit/utils/languageAssertions';
import { FormContent, FormFields, FormOptions, LanguageLookup } from '../../../../../app/form/Form';
import { CommonContent, generatePageContent } from '../../../../common/common.content';

import { generateContent } from './content';

jest.mock('../../../../../app/form/validation');

const en = {
  title: 'Do any of the children have a passport?',
  guidanceParentalChildlink: 'https://www.gov.uk/government/collections/child-abduction',
  guidanceParentalChild: 'Guidance on parental child abduction',
  getHelpChildtoReturnlink: 'https://www.gov.uk/return-or-contact-abducted-child',
  getHelpChildtoReturn: 'Get help to return a child from abroad or arrange contact',
  stopChildgettingPassportlink: 'https://www.gov.uk/stop-child-passport',
  stopChildgettingPassport: 'Stop a child from getting a passport',
  caption: 'Safety concerns',
  one: 'Yes',
  two: 'No',
  errors: {
    passportOffice: {
      required: 'Select yes if any of the children have a passport',
    },
  },
};

const cy = {
  title: 'Do any of the children have a passport? - welsh',
  guidanceParentalChildlink: 'https://www.gov.uk/government/collections/child-abduction',
  guidanceParentalChild: 'Guidance on parental child abduction',
  getHelpChildtoReturnlink: 'https://www.gov.uk/return-or-contact-abducted-child',
  getHelpChildtoReturn: 'Get help to return a child from abroad or arrange contact',
  stopChildgettingPassportlink: 'https://www.gov.uk/stop-child-passport',
  stopChildgettingPassport: 'Stop a child from getting a passport',
  caption: 'Safety concerns - welsh',
  one: 'Yes - Welsh',
  two: 'No - Welsh',
  errors: {
    passportOffice: {
      required: 'Select yes if any of the children have a passport - welsh',
    },
  },
};

describe('safetyconcerns > abduction > passport-office', () => {
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
    const applyingWithField = fields.passportOffice as FormOptions;
    expect(applyingWithField.type).toBe('radios');
    expect(applyingWithField.classes).toBe('govuk-radios');
    expect((applyingWithField.values[0].label as LanguageLookup)(generatedContent)).toBe(en.one);
    expect((applyingWithField.values[1].label as LanguageLookup)(generatedContent)).toBe(en.two);
  });

  test('should contain Continue button', () => {
    const generatedContent = generateContent(commonContent);
    const form = generatedContent.form as FormContent | undefined;
    expect(
      (form?.submit?.text as LanguageLookup)(generatePageContent({ language: 'en' }) as Record<string, never>)
    ).toBe('Continue');
  });

  test('should contain saveAndComeLater button', () => {
    const generatedContent = generateContent(commonContent);
    const form = generatedContent.form as FormContent | undefined;
    expect(
      (form?.saveAndComeLater?.text as LanguageLookup)(generatePageContent({ language: 'en' }) as Record<string, never>)
    ).toBe('Save and come back later');
  });
});

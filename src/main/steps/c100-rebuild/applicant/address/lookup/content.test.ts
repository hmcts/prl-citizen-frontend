import languageAssertions from '../../../../../../test/unit/utils/languageAssertions';
import { FormContent, FormFields, FormOptions, LanguageLookup } from '../../../../../app/form/Form';
import { isInvalidPostcode } from '../../../../../app/form/validation';
import { CommonContent, generatePageContent } from '../../../../common/common.content';

import { generateContent } from './content';

const en = {
  title: 'Address of firstName lastName',
  errors: {
    addressPostcode: {
      required: 'Enter a real postcode',
      invalid: 'Enter a real postcode',
    },
  },
};

const cy = {
  title: 'Address of - welsh firstName lastName',
  errors: {
    addressPostcode: {
      required: 'Enter a real postcode - welsh',
      invalid: 'Enter a real postcode - welsh',
    },
  },
};

/* eslint-disable @typescript-eslint/ban-types, @typescript-eslint/no-explicit-any */
describe('applicant > address > lookup > content', () => {
  const commonContent = {
    language: 'en',
    userCase: {
      appl_allApplicants: [
        {
          id: '3d6cc3df-9c11-42c0-be69-84acfcbd6048',
          applicantFirstName: 'firstName',
          applicantLastName: 'lastName',
        },
      ],
    },
    additionalData: {
      req: {
        params: {
          applicantId: '3d6cc3df-9c11-42c0-be69-84acfcbd6048',
        },
      },
    },
  } as unknown as CommonContent;

  let generatedContent;

  beforeEach(() => {
    generatedContent = generateContent(commonContent);
  });

  test('should return correct english content', () => {
    languageAssertions('en', en, () => generateContent(commonContent));
  });

  test('should return correct welsh content', () => {
    languageAssertions('cy', cy, () => generateContent({ ...commonContent, language: 'cy' }));
  });

  test('should contain onlycontinue button', () => {
    expect(
      (generatedContent.form?.submit?.text as LanguageLookup)(
        generatePageContent({ language: 'en' }) as Record<string, never>
      )
    ).toBe('Continue');
  });

  test('should contain saveAndComeLater button', () => {
    expect(
      (generatedContent.form?.saveAndComeLater?.text as LanguageLookup)(
        generatePageContent({ language: 'en' }) as Record<string, never>
      )
    ).toBe('Save and come back later');
  });

  test('should contain addressPostcode field', () => {
    generatedContent = generateContent(commonContent) as Record<string, never>;
    const form = generatedContent.form as FormContent;
    const fields = form.fields as FormFields;
    const addressPostcodeField = fields.addressPostcode as FormOptions;

    expect(addressPostcodeField.type).toBe('text');
    expect(addressPostcodeField.classes).toBe('govuk-label govuk-input--width-10');
    expect(addressPostcodeField.labelSize).toBe(null);
    expect((addressPostcodeField.label as LanguageLookup)(generatedContent)).toBe('Current postcode');
    expect(addressPostcodeField.validator).toBe(isInvalidPostcode);
  });
});

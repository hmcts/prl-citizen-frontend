import languageAssertions from '../../../../../../test/unit/utils/languageAssertions';
import { FormContent, FormFields, LanguageLookup } from '../../../../../app/form/Form';
import { isFieldFilledIn, isInvalidPostcode } from '../../../../../app/form/validation';
import { CommonContent, generatePageContent } from '../../../../common/common.content';

import { generateContent } from './content';

const en = {
  title: 'Address of Dummy  Test1',
  errors: {
    address1: {
      required: 'Enter the first line of the address',
    },
    addressTown: {
      required: 'Enter the town or city',
    },
    addressPostcode: {
      required: 'Enter the postcode',
      invalid: 'Enter a valid postcode',
    },
    addressHistory: {
      required: 'Enter your details known',
    },
    provideDetailsOfPreviousAddresses: {
      required:
        'Provide details of previous addresses you have lived at in the last 5 years, starting with your most recent address',
    },
  },
};

const cy = {
  title: 'Address of - welsh Dummy  Test1',
  errors: {
    address1: {
      required: 'Enter the first line of the address - welsh',
    },
    addressTown: {
      required: 'Enter the town or city - welsh',
    },
    addressPostcode: {
      required: 'Enter the postcode - welsh',
      invalid: 'Enter a valid postcode - welsh',
    },
    addressHistory: {
      required: 'Enter your details known - welsh',
    },
    provideDetailsOfPreviousAddresses: {
      required:
        'Provide details of previous addresses you have lived at in the last 5 years, starting with your most recent address - welsh',
    },
  },
};

/* eslint-disable @typescript-eslint/ban-types, @typescript-eslint/no-explicit-any */
describe('respondent > address > manual > content', () => {
  let fields;
  let generatedContent;
  let form;
  const commonContent = {
    language: 'en',
    additionalData: {
      req: {
        params: {
          respondentId: '480e8295-4c5b-4b9b-827f-f9be423ec1c5',
        },
      },
    },
    userCase: {
      resp_Respondents: [
        {
          firstName: 'Dummy ',
          id: '480e8295-4c5b-4b9b-827f-f9be423ec1c5',
          lastName: 'Test1',
          address: {
            PostCode: 'AG11NB',
          },
        },
      ],
    },
  } as unknown as CommonContent;

  beforeEach(() => {
    generatedContent = generateContent(commonContent);
    form = generatedContent.form as FormContent;
    fields = form.fields as FormFields;
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
  test('should contain address1 field', () => {
    const { address1 } = fields as Record<string, FormFields>;
    const { address2 } = fields as Record<string, FormFields>;
    const { addressTown } = fields as Record<string, FormFields>;
    const { addressCounty } = fields as Record<string, FormFields>;
    const { addressPostcode } = fields as Record<string, FormFields>;
    const { addressHistory } = fields as Record<string, FormFields>;

    expect(address1.type).toBe('text');
    expect(address1.classes).toBe('govuk-label');
    expect(address1.labelSize).toBe(null);
    expect((address1.label as LanguageLookup)(generatedContent)).toBe('Building and street');
    // expect(address1.label).toBe('Building and street'),
    expect(address1.validator).toBe(isFieldFilledIn);

    expect(address2.type).toBe('text');
    expect(address2.classes).toBe('govuk-label');
    expect(address2.labelSize).toBe(null);

    expect(addressTown.type).toBe('text');
    expect(addressTown.classes).toBe('govuk-label govuk-!-width-two-thirds');
    expect(addressTown.labelSize).toBe(null);
    expect((addressTown.label as LanguageLookup)(generatedContent)).toBe('Town or city');
    expect(addressTown.validator).toBe(isFieldFilledIn);

    expect(addressCounty.type).toBe('text');
    expect(addressCounty.classes).toBe('govuk-label govuk-!-width-two-thirds');
    expect((addressCounty.label as LanguageLookup)(generatedContent)).toBe('County');
    expect(addressCounty.labelSize).toBe(null);

    expect(addressPostcode.type).toBe('text');
    expect(addressPostcode.classes).toBe('govuk-label govuk-input--width-10');
    expect((addressPostcode.label as LanguageLookup)(generatedContent)).toBe('Postcode');
    expect(addressPostcode.labelSize).toBe(null);
    expect(addressPostcode.validator).toBe(isInvalidPostcode);

    expect(addressHistory.type).toBe('radios');
    expect(addressHistory.classes).toBe('govuk-radios');
    expect((addressHistory.label as LanguageLookup)(generatedContent)).toBe(
      'Have you lived at this address for more than 5 years?'
    );
    expect((addressHistory.values[0].label as LanguageLookup)(generatedContent)).toBe('Yes');
    expect((addressHistory.values[1].label as LanguageLookup)(generatedContent)).toBe('No');
    const applyTextField = addressHistory.values[1].subFields!.provideDetailsOfPreviousAddresses;
    expect(applyTextField.type).toBe('textarea');
    expect((applyTextField.label as LanguageLookup)(generatedContent)).toBe(
      'Provide details of previous addresses you have lived at in the last 5 years'
    );
    expect((applyTextField.hint as LanguageLookup)(generatedContent)).toBe('Start with your most recent');
  });

  test('should contain saveAndComeLater button', () => {
    expect(
      (generatedContent.form?.saveAndComeLater?.text as LanguageLookup)(
        generatePageContent({ language: 'en' }) as Record<string, never>
      )
    ).toBe('Save and come back later');
  });
});

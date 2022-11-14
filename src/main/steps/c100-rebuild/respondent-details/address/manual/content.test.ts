import languageAssertions from '../../../../../../test/unit/utils/languageAssertions';
import { FormContent, FormFields, LanguageLookup } from '../../../../../app/form/Form';
import { CommonContent, generatePageContent } from '../../../../common/common.content';

import { generateContent } from './content';

const en = {
  title: 'Address details of Dummy  Test1',
  subtitle:
    "Include as much detail as you can. If there's information missing, your application may take longer to process.",
  errors: {
    AddressLine1: {
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
    addressUnknown: {
      cantHaveAddressAndUnknown: 'Cannot have an address and also "I dont know where they currently live"',
    },
  },
};

const cy = {
  title: 'Address details of - welsh Dummy  Test1',
  subtitle:
    "Include as much detail as you can. If there's information missing, your application may take longer to process. - welsh",
  errors: {
    AddressLine1: {
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
    addressUnknown: {
      cantHaveAddressAndUnknown: 'Cannot have an address and also "I dont know where they currently live" - welsh',
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
      (generatedContent.form?.onlycontinue?.text as LanguageLookup)(
        generatePageContent({ language: 'en' }) as Record<string, never>
      )
    ).toBe('Continue');
  });
  test('should contain address1 field', () => {
    const { AddressLine1 } = fields as Record<string, FormFields>;
    const { AddressLine2 } = fields as Record<string, FormFields>;
    const { PostTown } = fields as Record<string, FormFields>;
    // const { County } = fields as Record<string, FormFields>;
    const { Country } = fields as Record<string, FormFields>;
    const { PostCode } = fields as Record<string, FormFields>;
    const { addressUnknown } = fields as Record<string, FormFields>;

    expect(AddressLine1.type).toBe('text');
    expect(AddressLine1.classes).toBe('govuk-label');
    expect(AddressLine1.labelSize).toBe(null);
    expect((AddressLine1.label as LanguageLookup)(generatedContent)).toBe('Building and street');

    expect(AddressLine2.type).toBe('text');
    expect(AddressLine2.classes).toBe('govuk-label');
    expect(AddressLine2.labelSize).toBe(null);

    expect(PostTown.type).toBe('text');
    expect(PostTown.classes).toBe('govuk-label govuk-!-width-two-thirds');
    expect(PostTown.labelSize).toBe(null);
    expect((PostTown.label as LanguageLookup)(generatedContent)).toBe('Town or city');

    // expect(County.type).toBe('text');
    // expect(County.classes).toBe('govuk-label govuk-!-width-two-thirds');
    // expect((County.label as LanguageLookup)(generatedContent)).toBe('County');
    // expect(County.labelSize).toBe(null);

    expect(Country.type).toBe('text');
    expect(Country.classes).toBe('govuk-label govuk-!-width-two-thirds');
    expect((Country.label as LanguageLookup)(generatedContent)).toBe('Country');
    expect(Country.labelSize).toBe(null);

    expect(PostCode.type).toBe('text');
    expect(PostCode.classes).toBe('govuk-label govuk-input--width-10');
    expect((PostCode.label as LanguageLookup)(generatedContent)).toBe('Postcode');
    expect(PostCode.labelSize).toBe(null);

    expect(addressUnknown.type).toBe('checkboxes');
    expect(addressUnknown.classes).toBe('govuk-checkboxes');
    expect((addressUnknown.values[0].label as LanguageLookup)(generatedContent)).toBe(
      'I dont know where they currently live'
    );
  });

  test('should contain saveAndComeLater button', () => {
    expect(
      (generatedContent.form?.saveAndComeLater?.text as LanguageLookup)(
        generatePageContent({ language: 'en' }) as Record<string, never>
      )
    ).toBe('Save and come back later');
  });
});

import languageAssertions from '../../../../../../test/unit/utils/languageAssertions';
import { FormContent, FormFields, FormOptions, LanguageLookup } from '../../../../../app/form/Form';
import { isTextAreaValid } from '../../../../../app/form/validation';
import { CommonContent, generatePageContent } from '../../../../common/common.content';

import { generateContent } from './content';

jest.mock('../../../../../app/form/validation');

const name = 'Dummy  Test1';

const en = {
  title: `Address details of ${name}`,
  subtitle:
    "Include as much detail as you can. If there's information missing, your application may take longer to process.",
  addressLine1Hint: 'Court documents will be sent here',
  addressHistoryLabel: 'Have they lived at this address for more than 5 years?',
  provideDetailsOfPreviousAddressLabel:
    'Please provide details of all previous addresses for the last 5 years below, including the dates and starting with the most recent',
  addressHistoryDontKnowHintText: "Leave blank if you don't know",
  one: 'Yes',
  two: 'No',
  three: "Don't know",
  errors: {
    AddressLine1: {
      required: 'Enter the first line of the address',
    },
    PostTown: {
      required: 'Enter the town or city',
    },
    addressHistory: {
      required: 'Enter your details known',
    },
    addressUnknown: {
      cantHaveAddressAndUnknown: 'Cannot have an address and also "I dont know where they currently live"',
    },
    Country: {
      required: 'Enter the country ',
    },
    provideDetailsOfPreviousAddresses: {
      invalidCharacters: 'You have entered an invalid character. Special characters <,>,{,} are not allowed.',
      invalid:
        'You have exceeded the character limit accepted by the free text field. Please enter 5,000 characters or less.',
    },
  },
};

const cy = {
  title: `Cyfeiriad ${name}`,
  subtitle:
    'Dylech gynnwys cymaint o fanylion ag y gallwch. Os oes gwybodaeth ar goll, gall eich cais gymryd yn hirach i’w brosesu.',
  addressLine1Hint: 'Bydd dogfennau’r llys yn cael eu hanfon yma',
  addressHistoryLabel: 'A ydynt wedi byw yn y cyfeiriad hwn am 5 mlynedd neu fwy?',
  provideDetailsOfPreviousAddressLabel:
    'Os nad ydynt, rhowch fanylion yr holl gyfeiriadau blaenorol am y 5 mlynedd diwethaf, os yn hysbys, gan gynnwys y dyddiadau, gan ddechrau gyda’r diweddaraf',
  addressHistoryDontKnowHintText: 'Gadewch yn wag os nad ydych yn gwybod',
  one: 'Ydynt',
  two: 'Nac ydynt',
  three: 'Ddim yn gwybod',
  errors: {
    AddressLine1: {
      required: 'Nodwch linell gyntaf y cyfeiriad',
    },
    PostTown: {
      required: 'Nodwch y dref neu’r ddinas',
    },

    addressHistory: {
      required: 'Rhowch eich manylion hysbys',
    },
    addressUnknown: {
      cantHaveAddressAndUnknown: 'Methu cael cyfeiriad a hefyd “nid wyf yn gwybod lle maen nhw’n byw ar hyn o bryd',
    },
    Country: {
      required: 'Nodwch y wlad',
    },
    provideDetailsOfPreviousAddresses: {
      invalidCharacters: 'Rydych wedi defnyddio nod annilys. Ni chaniateir y nodau arbennig hyn <,>,{,}',
      invalid:
        'Rydych wedi defnyddio mwy o nodau na’r hyn a ganiateir yn y blwch testun rhydd. Defnyddiwch 5,000 neu lai o nodau.',
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
    const addressHistoryFields = fields.addressHistory as FormOptions;

    expect(addressHistoryFields.type).toBe('radios');
    expect(addressHistoryFields.classes).toBe('govuk-radios');
    expect((addressHistoryFields.label as Function)(generatedContent)).toBe(en.addressHistoryLabel);

    expect((addressHistoryFields.values[0].label as Function)(generatedContent)).toBe(en.one);
    expect(addressHistoryFields.values[0].value).toBe('yes');

    expect((addressHistoryFields.values[1].label as Function)(generatedContent)).toBe(en.two);
    expect(addressHistoryFields.values[1].value).toBe('no');

    expect(
      (addressHistoryFields.values[1].subFields?.provideDetailsOfPreviousAddresses.label as Function)(generatedContent)
    ).toBe(en.provideDetailsOfPreviousAddressLabel);
    expect(
      (addressHistoryFields.values[1].subFields?.provideDetailsOfPreviousAddresses.hint as Function)(generatedContent)
    ).toBe(en.addressHistoryDontKnowHintText);
    (addressHistoryFields.values[1].subFields?.provideDetailsOfPreviousAddresses.validator as Function)('MOCK_VALUE');
    expect(isTextAreaValid).toHaveBeenCalledWith('MOCK_VALUE');

    expect((addressHistoryFields.values[2].label as Function)(generatedContent)).toBe(en.three);
    expect(addressHistoryFields.values[2].value).toBe('dontKnow');
  });

  test('should contain saveAndComeLater button', () => {
    expect(
      (generatedContent.form?.saveAndComeLater?.text as LanguageLookup)(
        generatePageContent({ language: 'en' }) as Record<string, never>
      )
    ).toBe('Save and come back later');
  });
});

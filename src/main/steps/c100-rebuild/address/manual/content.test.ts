import languageAssertions from '../../../../../test/unit/utils/languageAssertions';
import { FormContent, FormFields, FormOptions, LanguageLookup } from '../../../../app/form/Form';
import { isFieldFilledIn } from '../../../../app/form/validation';
import { CommonContent, generatePageContent } from '../../../common/common.content';
import { C100UrlPartyType } from '../definitions';

import { en as manualEnContent } from './address-manual';
import { generateContent } from './content';

const en = {
  [C100UrlPartyType.APPLICANT]: {
    title: 'Address of Dummy  Test1',
    errors: {
      address1: {
        required: 'Enter the first line of the address',
      },
      addressTown: {
        required: 'Enter the town or city',
      },
      addressHistory: {
        required: 'Enter your details known',
      },
      provideDetailsOfPreviousAddresses: {
        required:
          'Provide details of previous addresses you have lived at in the last 5 years, starting with your most recent address',
      },
      country: {
        required: 'Enter the country',
      },
    },
  },
  [C100UrlPartyType.OTHER_PERSON]: {
    title: 'Address details of Dummy  Test1',
    addressLine1Hint: 'Court documents may be sent here',
    errors: {
      AddressLine1: {
        required: 'Enter the first line of the address',
      },
      PostTown: {
        required: 'Enter the town or city',
      },
      addressUnknown: {
        cantHaveAddressAndUnknown: 'Cannot have an address and also "I dont know where they currently live"',
      },
      Country: {
        required: 'Enter the country',
      },
    },
  },
  [C100UrlPartyType.RESPONDENT]: {
    title: 'Address details of Dummy  Test1',
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
  },
};

const cy = {
  [C100UrlPartyType.APPLICANT]: {
    title: 'Cyfeiriad Dummy  Test1',
    errors: {
      address1: {
        required: 'Nodwch linell gyntaf y cyfeiriad',
      },
      addressTown: {
        required: 'Nodwch y dref neu’r ddinas',
      },
      addressHistory: {
        required: 'Rhowch eich manylion hysbys',
      },
      provideDetailsOfPreviousAddresses: {
        required: 'Darparwch fanylion cyfeiriadau blaenorol rydych wedi byw ynddynt yn y 5 mlynedd diwethaf',
      },
      country: {
        required: 'Nodwch y wlad',
      },
    },
  },
  [C100UrlPartyType.OTHER_PERSON]: {
    title: 'Manylion cyfeiriad Dummy  Test1',
    addressLine1Hint: 'Gellir anfon dogfennau’r llys yma',
    errors: {
      AddressLine1: {
        required: 'Nodwch linell gyntaf y cyfeiriad',
      },
      PostTown: {
        required: ' Nodwch y dref neu’r ddinas',
      },
      addressUnknown: {
        cantHaveAddressAndUnknown: "Methu cael cyfeiriad a hefyd “nid wyf yn gwybod lle maen nhw'n byw ar hyn o bryd",
      },
      Country: {
        required: 'Nodwch y wlad',
      },
    },
  },
  [C100UrlPartyType.RESPONDENT]: {
    title: 'Cyfeiriad Dummy  Test1',
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
  },
};

/* eslint-disable @typescript-eslint/ban-types, @typescript-eslint/no-explicit-any */
describe('applicant > address > manual > content', () => {
  let fields;
  let generatedContent;
  let form;
  const commonContent = {
    language: 'en',
    additionalData: {
      req: {
        params: {
          id: '480e8295-4c5b-4b9b-827f-f9be423ec1c5',
          partyType: 'applicant',
        },
      },
    },
    userCase: {
      appl_allApplicants: [
        {
          applicantFirstName: 'Dummy ',
          id: '480e8295-4c5b-4b9b-827f-f9be423ec1c5',
          applicantLastName: 'Test1',
          applicantAddressPostcode: 'AG11NB',
        },
      ],
      resp_Respondents: [
        {
          firstName: 'Dummy ',
          id: '480e8295-4c5b-4b9b-827f-f9be423ec1c5',
          lastName: 'Test1',
          address: {},
          addressUnknown: 'Yes',
        },
      ],
      oprs_otherPersons: [
        {
          firstName: 'Dummy ',
          id: '480e8295-4c5b-4b9b-827f-f9be423ec1c5',
          lastName: 'Test1',
          address: {},
        },
      ],
    },
  } as unknown as CommonContent;

  beforeEach(() => {
    commonContent.additionalData!.req.params.partyType = 'applicant';
    generatedContent = generateContent(commonContent);
    form = generatedContent.form as FormContent;
    fields = form.fields as FormFields;
  });

  test('should return correct english content for applicant', () => {
    languageAssertions('en', en['applicant'], () => generateContent(commonContent));
  });

  test('should return correct welsh content for applicant', () => {
    languageAssertions('cy', cy['applicant'], () => generateContent({ ...commonContent, language: 'cy' }));
  });

  test('should return correct english content for other-person-details', () => {
    commonContent.additionalData!.req.params.partyType = 'other-person-details';

    languageAssertions('en', en['other-person-details'], () => generateContent(commonContent));
  });

  test('should return correct welsh content for other-person-details', () => {
    commonContent.additionalData!.req.params.partyType = 'other-person-details';

    languageAssertions('cy', cy['other-person-details'], () => generateContent({ ...commonContent, language: 'cy' }));
  });

  test('should return correct english content for respondent-details', () => {
    commonContent.additionalData!.req.params.partyType = 'respondent-details';

    languageAssertions('en', en['respondent-details'], () => generateContent(commonContent));
  });

  test('should return correct welsh content for respondent-details', () => {
    commonContent.additionalData!.req.params.partyType = 'respondent-details';

    languageAssertions('cy', cy['respondent-details'], () => generateContent({ ...commonContent, language: 'cy' }));
  });

  test('should contain onlycontinue button', () => {
    expect(
      (generatedContent.form?.onlycontinue?.text as LanguageLookup)(
        generatePageContent({ language: 'en' }) as Record<string, never>
      )
    ).toBe('Continue');
  });
  test('should contain address1 field', () => {
    const { address1 } = fields as Record<string, FormFields>;
    const { address2 } = fields as Record<string, FormFields>;
    const { addressTown } = fields as Record<string, FormFields>;
    const { addressCounty } = fields as Record<string, FormFields>;
    const { country } = fields as Record<string, FormFields>;
    const { addressPostcode } = fields as Record<string, FormFields>;
    const { addressHistory } = fields as Record<string, FormFields>;

    expect(address1.type).toBe('text');
    expect(address1.classes).toBe('govuk-label');
    expect(address1.labelSize).toBe(null);
    expect((address1.label as LanguageLookup)(generatedContent)).toBe('Building and street');
    expect(address1.validator).toBe(isFieldFilledIn);

    expect(address2.type).toBe('text');
    expect(address2.classes).toBe('govuk-label');
    expect(address2.labelSize).toBe(null);
    expect((address2.label as LanguageLookup)(generatedContent)).toBe(undefined);

    expect(addressTown.type).toBe('text');
    expect(addressTown.classes).toBe('govuk-label govuk-!-width-two-thirds');
    expect(addressTown.labelSize).toBe(null);
    expect((addressTown.label as LanguageLookup)(generatedContent)).toBe('Town or city');
    expect(addressTown.validator).toBe(isFieldFilledIn);

    expect(addressCounty.type).toBe('text');
    expect(addressCounty.classes).toBe('govuk-label govuk-!-width-two-thirds');
    expect((addressCounty.label as LanguageLookup)(generatedContent)).toBe('County');
    expect(addressCounty.labelSize).toBe(null);

    expect(country.type).toBe('text');
    expect(country.classes).toBe('govuk-label govuk-!-width-two-thirds');
    expect(country.labelSize).toBe(null);
    expect(country.validator).toBe(isFieldFilledIn);
    expect((country.label as LanguageLookup)(generatedContent)).toBe('Country');

    expect(addressPostcode.type).toBe('text');
    expect(addressPostcode.classes).toBe('govuk-label govuk-input--width-10');
    expect((addressPostcode.label as LanguageLookup)(generatedContent)).toBe('Postcode');

    expect(addressHistory.type).toBe('radios');
    expect(addressHistory.classes).toBe('govuk-radios');
    expect((addressHistory.label as LanguageLookup)(generatedContent)).toBe(
      'Have you lived at this address for more than 5 years?'
    );
    expect((addressHistory.section as Function)(generatedContent)).toBe(undefined);
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

  test('should contain address1 field for respondent', () => {
    commonContent.additionalData!.req.params = {
      id: '480e8295-4c5b-4b9b-827f-f9be423ec1c5',
      partyType: 'respondent-details',
    };
    generatedContent = generateContent(commonContent);
    form = generatedContent.form as FormContent;
    fields = form.fields as FormFields;

    const addressLine1Fields = fields.AddressLine1 as FormOptions;
    expect(addressLine1Fields.type).toBe('text');
    expect((addressLine1Fields.label as Function)(generatedContent)).toBe(manualEnContent().addressLine1);
    expect((addressLine1Fields.hint as Function)(generatedContent)).toBe(en['respondent-details'].addressLine1Hint);

    const addressLine2Fields = fields.AddressLine2 as FormOptions;
    expect(addressLine2Fields.type).toBe('text');

    const postTownFields = fields.PostTown as FormOptions;
    expect(postTownFields.type).toBe('text');
    expect((postTownFields.label as Function)(generatedContent)).toBe(manualEnContent().town);

    const countyFields = fields.County as FormOptions;
    expect(countyFields.type).toBe('text');
    expect((countyFields.label as Function)(generatedContent)).toBe(manualEnContent().county);

    const postCodeFields = fields.PostCode as FormOptions;
    expect(postCodeFields.type).toBe('text');
    expect((postCodeFields.label as Function)(generatedContent)).toBe(manualEnContent().postcode);

    const countryFields = fields.Country as FormOptions;
    expect(countryFields.type).toBe('text');
    expect((countryFields.label as Function)(generatedContent)).toBe(manualEnContent().country);

    const addressUnknownFields = fields.addressUnknown as FormOptions;
    expect(addressUnknownFields.type).toBe('checkboxes');
    expect((addressUnknownFields.values[0].label as Function)(generatedContent)).toBe(manualEnContent().explainNoLabel);

    const addressHistoryFields = fields.addressHistory as FormOptions;
    expect(addressHistoryFields.type).toBe('radios');
    expect(addressHistoryFields.classes).toBe('govuk-radios');
    expect((addressHistoryFields.label as Function)(generatedContent)).toBe(
      en['respondent-details'].addressHistoryLabel
    );

    expect((addressHistoryFields.values[0].label as Function)(generatedContent)).toBe(en['respondent-details'].one);
    expect(addressHistoryFields.values[0].value).toBe('yes');

    expect((addressHistoryFields.values[1].label as Function)(generatedContent)).toBe(en['respondent-details'].two);
    expect(addressHistoryFields.values[1].value).toBe('no');

    expect(
      (addressHistoryFields.values[1].subFields?.provideDetailsOfPreviousAddresses.label as Function)(generatedContent)
    ).toBe(en['respondent-details'].provideDetailsOfPreviousAddressLabel);
    expect(
      (addressHistoryFields.values[1].subFields?.provideDetailsOfPreviousAddresses.hint as Function)(generatedContent)
    ).toBe(en['respondent-details'].addressHistoryDontKnowHintText);
    // (addressHistoryFields.values[1].subFields?.provideDetailsOfPreviousAddresses.validator as Function)('MOCK_VALUE');
    // expect(isTextAreaValid).toHaveBeenCalledWith('MOCK_VALUE');

    expect((addressHistoryFields.values[2].label as Function)(generatedContent)).toBe(en['respondent-details'].three);
    expect(addressHistoryFields.values[2].value).toBe('dontKnow');
  });
});

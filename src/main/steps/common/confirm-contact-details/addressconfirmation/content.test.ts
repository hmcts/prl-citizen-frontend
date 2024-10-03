import languageAssertions from '../../../../../test/unit/utils/languageAssertions';
import { FormContent, FormFields, FormOptions } from '../../../../app/form/Form';
import { isFieldFilledIn, isInvalidPostcode } from '../../../../app/form/validation';
import { CommonContent, generatePageContent } from '../../../common/common.content';

import { generateContent } from './content';

const en = {
  title: 'Your Address',
  citizenUserAddress1: 'Building and street',
  citizenUserAddressTown: 'Town or city',
  citizenUserAddressCounty: 'County',
  citizenUserAddressPostcode: 'Postcode',
  errors: {
    citizenUserAddress1: {
      required: 'Enter the first line of the address',
    },
    citizenUserAddressTown: {
      required: 'Enter the town or city',
    },
    citizenUserAddressPostcode: {
      required: 'Enter a valid postcode',
      invalid: 'Enter a valid postcode',
    },
  },
};

const cy: typeof en = {
  title: 'Beth yw eich cyfeiriad?',
  citizenUserAddress1: 'Adeilad a stryd',
  citizenUserAddressTown: 'Tref neu ddinas',
  citizenUserAddressCounty: 'Sir',
  citizenUserAddressPostcode: 'Cod post',
  errors: {
    citizenUserAddress1: {
      required: 'Nodwch linell gyntaf y cyfeiriad',
    },
    citizenUserAddressTown: {
      required: 'Nodwch y dref neu’r ddinas',
    },
    citizenUserAddressPostcode: {
      required: 'Rhowch god post dilys.',
      invalid: 'Rhowch god post dilys.',
    },
  },
};

/* eslint-disable @typescript-eslint/ban-types, @typescript-eslint/no-explicit-any */
describe('address confirmation > content', () => {
  const commonContent = generatePageContent({
    language: 'en',
    userCase: {},
  }) as CommonContent;
  let generatedContent;
  let form;
  let fields;
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
  test('should contain  field', () => {
    const citizenUserAddress1Field = fields.citizenUserAddress1 as FormOptions;
    expect(citizenUserAddress1Field.type).toBe('text');
    expect(citizenUserAddress1Field.classes).toBe('govuk-label');
    expect((citizenUserAddress1Field.label as Function)(generatedContent)).toBe(en.citizenUserAddress1);
    expect(citizenUserAddress1Field.validator).toBe(isFieldFilledIn);

    const citizenUserAddress2Field = fields.citizenUserAddress2 as FormOptions;
    expect(citizenUserAddress2Field.type).toBe('text');
    expect(citizenUserAddress2Field.classes).toBe('govuk-label');
    expect((citizenUserAddress2Field.label as Function)(generatedContent)).toBe(undefined);

    const citizenUserAddressTownField = fields.citizenUserAddressTown as FormOptions;
    expect(citizenUserAddressTownField.type).toBe('text');
    expect(citizenUserAddressTownField.classes).toBe('govuk-label govuk-!-width-two-thirds');
    expect((citizenUserAddressTownField.label as Function)(generatedContent)).toBe(en.citizenUserAddressTown);
    expect(citizenUserAddressTownField.validator).toBe(isFieldFilledIn);

    const citizenUserAddressCountyField = fields.citizenUserAddressCounty as FormOptions;
    expect(citizenUserAddressCountyField.type).toBe('text');
    expect(citizenUserAddressCountyField.classes).toBe('govuk-label govuk-!-width-two-thirds');
    expect((citizenUserAddressCountyField.label as Function)(generatedContent)).toBe(en.citizenUserAddressCounty);

    const citizenUserAddressPostcodeField = fields.citizenUserAddressPostcode as FormOptions;
    expect(citizenUserAddressPostcodeField.type).toBe('text');
    expect(citizenUserAddressPostcodeField.classes).toBe('govuk-label govuk-input--width-10');
    expect((citizenUserAddressPostcodeField.label as Function)(generatedContent)).toBe(en.citizenUserAddressPostcode);
    expect(citizenUserAddressPostcodeField.validator).toBe(isInvalidPostcode);
  });
  test('should contain continue button', () => {
    expect((form.submit?.text as Function)(generatedContent)).toBe(undefined);
  });
});

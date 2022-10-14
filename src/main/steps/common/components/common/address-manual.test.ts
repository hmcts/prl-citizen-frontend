//import languageAssertions from '../../../../../test/unit/utils/languageAssertions';
import { FormContent, FormFields, FormOptions } from '../../../../app/form/Form';
import { isFieldFilledIn, isInvalidPostcode } from '../../../../app/form/validation';
import { CommonContent, generatePageContent } from '../../common.content';

import { generateContent } from './address-manual';

jest.mock('../../../../app/form/validation');

const enContent = {
  addressLine1: 'Building and street',
  addressLine2: 'Building and street2',
  town: 'Town or city',
  county: 'County',
  postcode: 'Postcode',
  enterInternationalAddress: 'Enter an international address',
  errors: {
    citizenUserManualAddress1: {
      required: 'Enter the first line of the address',
    },
    citizenUserManualAddressTown: {
      required: 'Enter the town or city',
    },
    citizenUserAddressPostcode: {
      required: 'Enter the postcode',
      invalid: 'Enter a real postcode',
    },
  },
};

// const cyContent = {
//   addressLine1: 'Adeilad a stryd',
//   addressLine2: 'Adeilad a stryd2',
//   town: 'Tref neu ddinas',
//   county: 'Sir',
//   postcode: 'Cod post',
//   enterInternationalAddress: 'Nac ydwdwch gyfeiriad rhyngwladol',
//   errors: {
//     citizenUserManualAddress1: {
//       required: 'Nac ydwdwch linell gyntaf y cyfeiriad',
//     },
//     citizenUserManualAddressTown: {
//       required: 'Nac ydwdwch y dref neu ddinas',
//     },
//     citizenUserAddressPostcode: {
//       required: 'Nac ydwdwch y cod post',
//       invalid: 'Nac ydwdwch god post dilys',
//     },
//   },
// };

/* eslint-disable @typescript-eslint/ban-types */
describe('common > components > manual-address > content', () => {
  const commonContent = { language: 'en', userCase: {} } as CommonContent;
  let generatedContent;
  let form;
  let fields;

  beforeEach(() => {
    generatedContent = generateContent(commonContent);
    form = generatedContent.form as FormContent;
    fields = form.fields as FormFields;
  });

  // test('should return correct english content', () => {
  //   languageAssertions('en', enContent, () => generateContent(commonContent));
  // });

  // test('should return correct welsh content', () => {
  //   languageAssertions('cy', cyContent, () => generateContent({ ...commonContent, language: 'cy' }));
  // });

  test('should contain citizenUserManualAddress1 field', () => {
    const address1Field = fields.citizenUserManualAddress1 as FormOptions;
    expect(address1Field.type).toBe('text');
    expect(address1Field.classes).toBe('govuk-label');
    expect((address1Field.label as Function)(generatedContent)).toBe(enContent.addressLine1);
    expect(address1Field.labelSize).toBe(null);
    expect(address1Field.validator).toBe(isFieldFilledIn);
  });

  // test('should contain citizenUserManualAddress2 field', () => {
  //   const address2Field = fields.citizenUserManualAddress2 as FormOptions;
  //   expect(address2Field.type).toBe('text');
  //   expect(address2Field.classes).toBe('govuk-label');
  //   expect((address2Field.label as Function)(generatedContent)).toBe(enContent.addressLine2);
  //   expect(address2Field.labelSize).toBe(null);
  // });

  test('should contain citizenUserManualAddressTown field', () => {
    const addressTownField = fields.citizenUserManualAddressTown as FormOptions;
    expect(addressTownField.type).toBe('text');
    expect(addressTownField.classes).toBe('govuk-label govuk-!-width-two-thirds');
    expect((addressTownField.label as Function)(generatedContent)).toBe(enContent.town);
    expect(addressTownField.labelSize).toBe(null);
    expect(addressTownField.validator).toBe(isFieldFilledIn);
  });

  test('should contain citizenUserManualAddressCounty field', () => {
    const addressCountyField = fields.citizenUserManualAddressCounty as FormOptions;
    expect(addressCountyField.type).toBe('text');
    expect(addressCountyField.classes).toBe('govuk-label govuk-!-width-two-thirds');
    expect((addressCountyField.label as Function)(generatedContent)).toBe(enContent.county);
    expect(addressCountyField.labelSize).toBe(null);
  });

  test('should contain citizenUserAddressPostcode field', () => {
    const addressPostcodeField = fields.citizenUserAddressPostcode as FormOptions;
    expect(addressPostcodeField.type).toBe('text');
    expect(addressPostcodeField.classes).toBe('govuk-label govuk-input--width-10');
    expect((addressPostcodeField.label as Function)(generatedContent)).toBe(enContent.postcode);
    expect(addressPostcodeField.labelSize).toBe(null);
    expect(addressPostcodeField.validator).toBe(isInvalidPostcode);
  });

  test('should contain submit button', () => {
    expect((form.submit.text as Function)(generatePageContent({ language: 'en' }))).toBe('Save and continue');
  });
});
/* eslint-enable @typescript-eslint/ban-types */

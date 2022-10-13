import { FormContent, FormFields, FormOptions } from '../../../../../app/form/Form';
import { ResourceReader } from '../../../../../modules/resourcereader/ResourceReader';
import { CommonContent } from '../../../../common/common.content';
import {
  generateContent as generateManualAddressContent,
  form as manualAddressForm,
} from '../../../../common/components/address-manual';

import { generateContent } from './content';

const resourceLoader = new ResourceReader();
resourceLoader.Loader('manual-address');
const translations = resourceLoader.getFileContents().translations;

const enContent = {
  ...translations.en,
};

const cyContent = {
  ...translations.cy,
};

/* eslint-disable @typescript-eslint/ban-types, @typescript-eslint/no-explicit-any */
describe('applicant1 > address > manual > content', () => {
  const commonContent = { language: 'en' } as CommonContent;
  let generatedContent;
  let form;
  let fields;
  const manualAddressFormFields = manualAddressForm.fields as FormFields;

  beforeEach(() => {
    generatedContent = generateContent(commonContent);
    form = generatedContent.form as FormContent;
    fields = form.fields as FormFields;
  });

  test('should return correct english content', () => {
    const manualAddressContent = generateManualAddressContent(commonContent);
    expect(generatedContent.section).toEqual(enContent.section);
    expect(generatedContent.title).toEqual(enContent.title);
    expect(generatedContent.errors).toEqual({
      citizenUserManualAddress1: (manualAddressContent.errors as any).address1,
      citizenUserManualAddressTown: (manualAddressContent.errors as any).addressTown,
      citizenUserManualAddressPostcode: (manualAddressContent.errors as any).addressPostcode,
    });
  });

  test('should return correct welsh content', () => {
    const manualAddressContent = generateManualAddressContent({ ...commonContent, language: 'cy' });
    generatedContent = generateContent({ ...commonContent, language: 'cy' });
    expect(generatedContent.section).toEqual(cyContent.section);
    expect(generatedContent.title).toEqual(cyContent.title);
    expect(generatedContent.errors).toEqual({
      citizenUserManualAddress1: (manualAddressContent.errors as any).address1,
      citizenUserManualAddressTown: (manualAddressContent.errors as any).addressTown,
      citizenUserManualAddressPostcode: (manualAddressContent.errors as any).addressPostcode,
    });
  });

  test('should contain citizenUserAddress1 field', () => {
    const citizenUserAddress1Field = fields.citizenUserManualAddress1 as FormOptions;
    expect(citizenUserAddress1Field).toEqual(manualAddressFormFields.address1);
  });

  test('should contain citizenUserAddress2 field', () => {
    const applicantAddress2Field = fields.citizenUserManualAddress2 as FormOptions;
    expect(applicantAddress2Field).toEqual(manualAddressFormFields.address2);
  });

  test('should contain citizenUserAddressTown field', () => {
    const citizenUserAddressTownField = fields.citizenUserManualAddressTown as FormOptions;
    expect(citizenUserAddressTownField).toEqual(manualAddressFormFields.addressTown);
  });

  test('should contain citizenUserAddressCounty field', () => {
    const citizenUserAddressCountyField = fields.citizenUserManualAddressCounty as FormOptions;
    expect(citizenUserAddressCountyField).toEqual(manualAddressFormFields.addressCounty);
  });

  test('should contain citizenUserAddressPostcode field', () => {
    const citizenUserAddressPostcodeField = fields.citizenUserManualAddressPostcode as FormOptions;
    expect(citizenUserAddressPostcodeField).toEqual(manualAddressFormFields.addressPostcode);
  });

  test('should contain continue button', () => {
    expect(generatedContent.continue).toEqual(enContent.continue);
  });
});
/* eslint-enable @typescript-eslint/ban-types, @typescript-eslint/no-explicit-any */

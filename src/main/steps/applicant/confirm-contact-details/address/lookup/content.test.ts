import { FormFields } from '../../../../../app/form/Form';
import { CommonContent } from '../../../../common/common.content';
import {
  form as addressLookupForm,
  generateContent as generateAddressLookupContent,
} from '../../../../common/components/address-lookup';
import { APPLICANT_MANUAL_ADDRESS } from '../../../../urls';
import { ResourceReader } from '../.././../../../modules/resourcereader/ResourceReader';

import { generateContent } from './content';

const resourceLoader = new ResourceReader();
resourceLoader.Loader('address-lookup');
const translations = resourceLoader.getFileContents().translations;

const enContent = {
  ...translations.en,
};

const cyContent = {
  ...translations.cy,
};

/* eslint-disable @typescript-eslint/ban-types, @typescript-eslint/no-explicit-any */
describe('applicant1 > address > lookup > content', () => {
  const commonContent = { language: 'en', userCase: {} } as CommonContent;
  let generatedContent;

  beforeEach(() => {
    generatedContent = generateContent(commonContent);
  });

  test('should return correct english content', () => {
    const addressLookupContent = generateAddressLookupContent(commonContent);
    expect(generatedContent.section).toEqual(enContent.section);
    expect(generatedContent.title).toEqual(enContent.title);
    expect(generatedContent.errors).toEqual({
      citizenUserAddressPostcode: (addressLookupContent.errors as any).addressPostcode,
    });
    expect(generatedContent.manualAddressUrl).toEqual(APPLICANT_MANUAL_ADDRESS);
  });

  test('should return correct welsh content', () => {
    const addressLookupContent = generateAddressLookupContent({ ...commonContent, language: 'cy' });
    generatedContent = generateContent({ ...commonContent, language: 'cy' });
    expect(generatedContent.section).toEqual(cyContent.section);
    expect(generatedContent.title).toEqual(cyContent.title);
    expect(generatedContent.errors).toEqual({
      citizenUserAddressPostcode: (addressLookupContent.errors as any).addressPostcode,
    });
    expect(generatedContent.manualAddressUrl).toEqual(APPLICANT_MANUAL_ADDRESS);
  });

  it('should have citizenUserAddressPostcode label when language: en and  applyingWith: alone', () => {
    const commonContent1 = { language: 'en' } as CommonContent;

    const generatedContent1 = generateContent(commonContent1);
    expect(generatedContent1.section).toBe('Your address');
  });

  it('should have an citizenUserAddressPostcode label when language: cy and  applyingWith: alone', () => {
    const commonContent1 = { language: 'cy' } as CommonContent;

    const generatedContent1 = generateContent(commonContent1);
    expect(generatedContent1.section).toBe('Your address (in welsh)');
  });

  test('should contain citizenUserAddressPostcode field', () => {
    const addressLookupFormFields = addressLookupForm.fields as FormFields;
    const fields = generatedContent.form.fields as FormFields;
    expect(fields.citizenUserAddressPostcode).toEqual(addressLookupFormFields.addressPostcode);
  });
});
/* eslint-enable @typescript-eslint/ban-types, @typescript-eslint/no-explicit-any */

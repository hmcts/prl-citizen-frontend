import { FormFields } from '../../../../../app/form/Form';
import { ResourceReader } from '../../../../../modules/resourcereader/ResourceReader';
import { CommonContent } from '../../../../common/common.content';
import {
  form as addressLookupForm,
  generateContent as generateAddressLookupContent,
} from '../../../../common/components/address-lookup';
import { interpolate } from '../../../../common/string-parser';
import { RESPONDENT_ADDRESS_MANUAL } from '../../../../urls';

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
  const commonContent = { language: 'en', userCase: { citizenUserFullName: 'test name' } } as CommonContent;
  let generatedContent;

  beforeEach(() => {
    generatedContent = generateContent(commonContent);
  });

  test('should return correct english content', () => {
    const addressLookupContent = generateAddressLookupContent(commonContent);
    expect(generatedContent.section).toEqual(enContent.section);
    expect(generatedContent.title).toEqual(interpolate(enContent.title, { name: 'test name' }));
    expect(generatedContent.errors).toEqual({
      citizenUserAddressPostcode: (addressLookupContent.errors as any).citizenUserAddressPostcode,
    });
    expect(generatedContent.manualAddressUrl).toEqual(RESPONDENT_ADDRESS_MANUAL);
  });

  test('should return correct welsh content', () => {
    const addressLookupContent = generateAddressLookupContent({ ...commonContent, language: 'cy' });
    generatedContent = generateContent({ ...commonContent, language: 'cy' });
    expect(generatedContent.section).toEqual(cyContent.section);
    expect(generatedContent.title).toEqual(interpolate(cyContent.title, { name: 'test name' }));
    expect(generatedContent.errors).toEqual({
      citizenUserAddressPostcode: (addressLookupContent.errors as any).citizenUserAddressPostcode,
    });
    expect(generatedContent.manualAddressUrl).toEqual(RESPONDENT_ADDRESS_MANUAL);
  });

  it('should have citizenUserAddressPostcode label when language: en and  applyingWith: alone', () => {
    const commonContent1 = { language: 'en', userCase: { citizenUserFullName: 'test name' } } as CommonContent;

    const generatedContent1 = generateContent(commonContent1);
    expect(generatedContent1.title).toBe('Find the address for test name');
  });

  it('should have an citizenUserAddressPostcode label when language: cy and  applyingWith: alone', () => {
    const commonContent1 = { language: 'cy', userCase: { citizenUserFullName: 'test name' } } as CommonContent;

    const generatedContent1 = generateContent(commonContent1);
    expect(generatedContent1.title).toBe('Dod o hyd i’r cyfeiriad ar gyfer test name');
  });

  test('should contain citizenUserAddressPostcode field', () => {
    const addressLookupFormFields = addressLookupForm.fields as FormFields;
    const fields = generatedContent.form.fields as FormFields;
    expect(fields.citizenUserAddressPostcode).toEqual(addressLookupFormFields.citizenUserAddressPostcode);
  });
});
/* eslint-enable @typescript-eslint/ban-types, @typescript-eslint/no-explicit-any */

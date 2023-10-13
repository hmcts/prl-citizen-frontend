//import { FormContent , FormFields , FormOptions } from "../../../../app/form/Form";

import languageAssertions from '../../../../../test/unit/utils/languageAssertions';
import { FormContent, FormFields, FormOptions } from '../../../../app/form/Form';
import { CommonContent } from '../../common.content';

import { generateContent } from './content';

//jest.mock('../../../app/form/validation');

const enContent = {
  title: 'Your address',
  citizenUserAddressText: 'address',
  continue: 'Save and continue',
  editAddress: 'Edit Address',
  errors: {},
};

const cyContent: typeof enContent = {
  title: 'Eich cyfeiriad',
  citizenUserAddressText: 'cyfeiriad',
  continue: 'Arbed a pharhau',
  editAddress: 'Golygu Cyfeiriad',
  errors: {},
};
/* eslint-disable @typescript-eslint/ban-types */
describe('address details', () => {
  const commonContent = { language: 'en', userCase: {} } as CommonContent;
  const commonContentcy = { language: 'cy', userCase: {} } as CommonContent;
  let generatedContent;
  let generatedContentcy;
  let form;
  let fields;
  beforeEach(() => {
    generatedContent = generateContent(commonContent);
    generatedContentcy = generateContent(commonContentcy);
    form = generatedContent.form as FormContent;
    fields = form.fields as FormFields;
  });

  test('should return correct english content', () => {
    expect(generatedContent.title).toEqual(enContent.title);
    expect(generatedContent.citizenUserAddressText).toEqual(enContent.citizenUserAddressText);
    expect(generatedContent.continue).toEqual(enContent.continue);
    expect(generatedContent.editAddress).toEqual(enContent.editAddress);
  });

  test('should return correct welsh content', () => {
    expect(generatedContentcy.title).toEqual(cyContent.title);
    expect(generatedContentcy.citizenUserAddressText).toEqual(cyContent.citizenUserAddressText);
    expect(generatedContentcy.continue).toEqual(cyContent.continue);
    expect(generatedContentcy.editAddress).toEqual(cyContent.editAddress);
  });

  test('should return correct english content using language assertions', () => {
    languageAssertions('en', enContent, () => generateContent(commonContent));
  });

  test('should return correct welsh content using language assertions', () => {
    languageAssertions('cy', cyContent, () => generateContent({ ...commonContent, language: 'cy' }));
  });
  test('should contain  field', () => {
    const citizenUserAddressTextField = fields.citizenUserAddressText as FormOptions;
    expect(citizenUserAddressTextField.type).toBe('label');
    expect((citizenUserAddressTextField.label as Function)(generatedContent)).toBe(enContent.citizenUserAddressText);
  });
  test('should contain continue button', () => {
    expect((form.submit?.text as Function)(generatedContent)).toBe('Save and continue');
    expect((form.editAddress?.text as Function)(generatedContent)).toBe(enContent.editAddress);
  });
});

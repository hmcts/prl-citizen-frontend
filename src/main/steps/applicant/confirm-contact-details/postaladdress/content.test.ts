import languageAssertions from '../../../../../test/unit/utils/languageAssertions';
import { FormContent, FormFields } from '../../../../app/form/Form';
import { CommonContent, generatePageContent } from '../../../common/common.content';

import { generateContent } from './content';

const en = {
  title: 'Postal address',
  addressLine1: 'Building and street',
  addressLine2: 'Address line 2',
  addressLine3: 'Address line 3',
  town: 'Town or city',
  country: 'Country',
  postcode: 'Postcode',
  continue: 'Save and continue',
  errors: {},
};

const cy: typeof en = {
  title: 'Postal address',
  addressLine1: 'Adeilad a stryd',
  addressLine2: 'Address line 2',
  addressLine3: 'Address line 3',
  town: 'Tref neu ddinas',
  country: 'Gwlad',
  postcode: 'Cod post',
  continue: 'Cadw a pharhau',
  errors: {},
};

/* eslint-disable @typescript-eslint/ban-types, @typescript-eslint/no-explicit-any */
describe('address history > content', () => {
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

  test('should contain postal address fields', () => {
    expect((fields.addressLine1.label as Function)(generatedContent)).toBe(en.addressLine1);
    expect((fields.town.label as Function)(generatedContent)).toBe(en.town);
    expect((fields.country.label as Function)(generatedContent)).toBe(en.country);
    expect((fields.postcode.label as Function)(generatedContent)).toBe(en.postcode);
  });

  test('should contain continue button', () => {
    expect((form.submit?.text as Function)(generatedContent)).toBe('Save and continue');
  });
});

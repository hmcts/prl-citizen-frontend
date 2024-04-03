import languageAssertions from '../../../../../test/unit/utils/languageAssertions';
import { C100Address } from '../../../../app/case/definition';
import { FormFields, FormInput } from '../../../../app/form/Form';
import { isInvalidPostcode } from '../../../../app/form/validation';
import { CommonContent } from '../../../common/common.content';

import { form, generateContent } from './address-lookup';

jest.mock('../../../../app/form/validation');

const en = {
  postcode: 'Current postcode',
  enterAddressManually: 'I live outside the UK',
  manualAddressUrl: '#',
};

const cy = {
  postcode: 'Cod post cyfredol',
  enterAddressManually: 'Rwy’n byw y tu allan i’r DU',
  manualAddressUrl: '#',
};

/* eslint-disable @typescript-eslint/ban-types */
describe('common > components > address-lookup > content', () => {
  const commonContent = { language: 'en', userCase: {} } as CommonContent;

  test('should return correct english content', () => {
    languageAssertions('en', en, () => generateContent(commonContent));
  });

  test('should return correct welsh content', () => {
    languageAssertions('cy', cy, () => generateContent({ ...commonContent, language: 'cy' }));
  });

  test('common form', () => {
    const generatedApplicantFormFields = form({ address: { PostCode: 'SW1A 1AA' } as unknown as C100Address })
      .fields as FormFields;
    const addressPostcode = generatedApplicantFormFields.PostCode as FormInput;
    expect(addressPostcode.type).toBe('text');
    expect(addressPostcode.value).toBe('SW1A 1AA');
    expect(addressPostcode.validator).toBe(isInvalidPostcode);
    expect((addressPostcode.label as Function)(generateContent(commonContent)));
  });
});

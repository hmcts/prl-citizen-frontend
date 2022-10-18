import languageAssertions from '../../../../../../test/unit/utils/languageAssertions';
import { FormFields } from '../../../../../app/form/Form';
import { CommonContent } from '../../../../common/common.content';
import {
  form as addressLookupForm
} from '../../../../common/components/address-lookup';

import { generateContent } from './content';

const enContent = {
    title: 'Address of Applicant',
    manualAddressUrl: '/c100-rebuild/applicant/address/manual',
    errors: {
      applicantAddressPostcode: {
        required: 'Enter a real postcode',
        invalid: 'Enter a real postcode',
      },
    },
};

const cyContent = {
    title: 'Address of Applicant - welsh',
    manualAddressUrl: '/c100-rebuild/applicant/address/manual',
    errors: {
      applicantAddressPostcode: {
        required: 'Enter a real postcode - welsh',
        invalid: 'Enter a real postcode - welsh',
      },
    },
};

/* eslint-disable @typescript-eslint/ban-types, @typescript-eslint/no-explicit-any */
describe('applicant1 > address > lookup > content', () => {
  const commonContent = { language: 'en', userCase: {} } as CommonContent;
  let generatedContent;

  beforeEach(() => {
    generatedContent = generateContent(commonContent);
  });

  test('should return correct english content', () => {
    languageAssertions('en', enContent, () => generateContent(commonContent));
  });

  test('should return correct welsh content', () => {
    languageAssertions('cy', cyContent, () => generateContent({ ...commonContent, language: 'cy' }));
  });

  test('should contain applicantAddressPostcode field', () => {
    const addressLookupFormFields = addressLookupForm.fields as FormFields;
    const fields = generatedContent.form.fields as FormFields;
    expect(fields.applicantAddressPostcode).toEqual(addressLookupFormFields.addressPostcode);
  });
});
/* eslint-enable @typescript-eslint/ban-types, @typescript-eslint/no-explicit-any */

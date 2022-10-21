import languageAssertions from '../../../../../../test/unit/utils/languageAssertions';
import { FormFields } from '../../../../../app/form/Form';
import { CommonContent } from '../../../../common/common.content';
import {
  form as addressLookupForm
} from '../common/address-lookup';

import { generateContent } from './content';

const enContent = {
    title: 'Address of firstName lastName',
    manualAddressUrl: '/c100-rebuild/applicant/address/manual?applicantId=3d6cc3df-9c11-42c0-be69-84acfcbd6048',
    errors: {
      applicantAddressPostcode: {
        required: 'Enter a real postcode',
        invalid: 'Enter a real postcode',
      },
    },
};

const cyContent = {
    title: 'Address of firstName lastName - welsh',
    manualAddressUrl: '/c100-rebuild/applicant/address/manual?applicantId=3d6cc3df-9c11-42c0-be69-84acfcbd6048',
    errors: {
      applicantAddressPostcode: {
        required: 'Enter a real postcode - welsh',
        invalid: 'Enter a real postcode - welsh',
      },
    },
};

/* eslint-disable @typescript-eslint/ban-types, @typescript-eslint/no-explicit-any */
describe('applicant1 > address > lookup > content', () => {
   const commonContent = {
    language: 'en',
    userCase: {
      "appl_allApplicants": [
        {
        "id": "3d6cc3df-9c11-42c0-be69-84acfcbd6048",
        "applicantFirstName": "firstName",
        "applicantLastName": "lastName"
        }
        ],
    },
    additionalData: {
      req: {
        query: {
          applicantId: '3d6cc3df-9c11-42c0-be69-84acfcbd6048',
        },
      },
    },
  } as unknown as CommonContent;

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

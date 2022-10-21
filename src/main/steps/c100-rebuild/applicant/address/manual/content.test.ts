import languageAssertions from '../../../../../../test/unit/utils/languageAssertions';
import { FormFields } from '../../../../../app/form/Form';
import { CommonContent } from '../../../../common/common.content';
import {
  form as manualAddressForm
} from '../common/address-manual';

import { generateContent } from './content';

const enContent = {
    title: 'Address of firstName lastName',
    errors: {
      applicantAddress1: {
        required: 'Enter the first line of the address',
      },
      applicantAddressTown: {
        required: 'Enter the town or city',
      },
      applicantAddressPostcode: {
        required: 'Enter a real postcode',
        invalid: 'Enter a real postcode',
      },
      applicantAddressHistory: {
        required: 'Enter your details known',
      },
      applicantProvideDetailsOfPreviousAddresses: {
        required:
          'Provide details of previous addresses you have lived at in the last 5 years, starting with your most recent address',
      },
    },
};

const cyContent = {
    title: 'Address of firstName lastName - welsh',
    errors: {
      applicantAddress1: {
        required: 'Enter the first line of the address - welsh',
      },
      applicantAddressTown: {
        required: 'Enter the town or city - welsh',
      },
      applicantAddressPostcode: {
        required: 'Enter a real postcode - welsh',
        invalid: 'Enter a real postcode - welsh',
      },
      applicantAddressHistory: {
        required: 'Enter your details known - welsh',
      },
      applicantProvideDetailsOfPreviousAddresses: {
        required:
          'Provide details of previous addresses you have lived at in the last 5 years, starting with your most recent address - welsh',
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

  test('should contain applicantAddress fields', () => {
    const amanualAddressFormFields = manualAddressForm.fields as FormFields;
    const fields = generatedContent.form.fields as FormFields;
    expect(fields.applicantAddress1).toEqual(amanualAddressFormFields.address1);
    expect(fields.applicantAddress2).toEqual(amanualAddressFormFields.address2);
    expect(fields.applicantAddressTown).toEqual(amanualAddressFormFields.addressTown);
    expect(fields.applicantAddressCounty).toEqual(amanualAddressFormFields.addressCounty);
    expect(fields.applicantAddressPostcode).toEqual(amanualAddressFormFields.addressPostcode);
    expect(fields.applicantAddressHistory).toEqual(amanualAddressFormFields.addressHistory);
  });
});
/* eslint-enable @typescript-eslint/ban-types, @typescript-eslint/no-explicit-any */

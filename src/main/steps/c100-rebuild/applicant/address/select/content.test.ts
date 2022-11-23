import languageAssertions from '../../../../../../test/unit/utils/languageAssertions';
import { FormContent, FormFields, LanguageLookup } from '../../../../../app/form/Form';
import { isAddressSelected } from '../../../../../app/form/validation';
import { CommonContent, generatePageContent } from '../../../../common/common.content';

import { generateContent } from './content';

const en = {
  title: 'Select Address of firstName lastName',
  changePostCodeLabel: 'Change postcode',
  errors: {
    selectAddress: {
      notSelected: 'Select an address',
    },
  },
};

const cy = {
  title: 'Dewiswch gyfeiriad firstName lastName',
  changePostCodeLabel: 'Newid y cod post',
  errors: {
    selectAddress: {
      notSelected: 'Dewiswch gyfeiriad',
    },
  },
};

/* eslint-disable @typescript-eslint/ban-types, @typescript-eslint/no-explicit-any */
describe('applicant > address > select > content', () => {
  let fields;
  let form;
  let generatedContent;
  const commonContent = {
    language: 'en',
    userCase: {
      appl_allApplicants: [
        {
          id: '3d6cc3df-9c11-42c0-be69-84acfcbd6048',
          applicantFirstName: 'firstName',
          applicantLastName: 'lastName',
        },
      ],
    },
    additionalData: {
      req: {
        params: {
          applicantId: '3d6cc3df-9c11-42c0-be69-84acfcbd6048',
        },
      },
    },
  } as unknown as CommonContent;

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

  test('should contain onlycontinue button', () => {
    expect(
      (generatedContent.form?.onlycontinue?.text as LanguageLookup)(
        generatePageContent({ language: 'en' }) as Record<string, never>
      )
    ).toBe('Continue');
  });

  test('should contain applicantSelectAddress field', () => {
    const { selectAddress } = fields as Record<string, FormFields>;
    expect(selectAddress.type).toBe('select');
    expect(selectAddress.labelSize).toBe(null);
    expect((selectAddress.label as LanguageLookup)(generatedContent)).toBe('Select an address');
    expect(selectAddress.validator).toBe(isAddressSelected);
  });
});

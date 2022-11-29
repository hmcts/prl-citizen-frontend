import languageAssertions from '../../../../../../test/unit/utils/languageAssertions';
import { FormContent, FormFields, LanguageLookup } from '../../../../../app/form/Form';
import { isAddressSelected } from '../../../../../app/form/validation';
import { CommonContent, generatePageContent } from '../../../../common/common.content';

import { generateContent } from './content';

const en = {
  title: 'Select Address of John Doe',
  changePostCodeLabel: 'Change postcode',
  errors: {
    selectAddress: {
      notSelected: 'Select an address from the list',
    },
  },
};

const cy = {
  title: 'Dewiswch gyfeiriad John Doe',
  changePostCodeLabel: 'Newid y cod post',
  errors: {
    selectAddress: {
      notSelected: "Dewiswch gyfeiriad o'r rhestr",
    },
  },
};

/* eslint-disable @typescript-eslint/ban-types, @typescript-eslint/no-explicit-any */
describe('respondent > address > select > content', () => {
  let fields;
  let form;
  let generatedContent;
  const commonContent = {
    language: 'en',
    userCase: {
      resp_Respondents: [
        {
          id: '3d6cc3df-9c11-42c0-be69-84acfcbd6048',
          firstName: 'John',
          lastName: 'Doe',
        },
      ],
    },
    additionalData: {
      req: {
        params: {
          respondentId: '3d6cc3df-9c11-42c0-be69-84acfcbd6048',
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

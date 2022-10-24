import languageAssertions from '../../../../../../test/unit/utils/languageAssertions';
import { LanguageLookup } from '../../../../../app/form/Form';
import { CommonContent, generatePageContent } from '../../../../common/common.content';
import { generateContent } from './content';

const en = {
  title: 'Select Address of',
  changePostCodeLabel: 'Change postcode',
  errors: {
    selectAddress: {
      notSelected: 'Select an address',
    },
  },
}

const cy = {
  title: 'Select Address of - welsh firstName lastName',
  changePostCodeLabel: 'Change postcode - welsh',
  errors: {
    selectAddress: {
      notSelected: 'Select an address - welsh',
    },
  },
}

/* eslint-disable @typescript-eslint/ban-types, @typescript-eslint/no-explicit-any */
describe('applicant > address > select > content', () => {
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
    languageAssertions('en', en, () => generateContent(commonContent));
  });

  test('should return correct welsh content', () => {
    languageAssertions('cy', cy, () => generateContent({ ...commonContent, language: 'cy' }));
  });

  test('should contain onlycontinue button', () => {
    expect(
      (generatedContent.form?.submit?.text as LanguageLookup)(generatePageContent({ language: 'en' }) as Record<string, never>)
    ).toBe('Continue');
  });

  test('should contain saveAndComeLater button', () => {
    expect(
      (generatedContent.form?.saveAndComeLater?.text as LanguageLookup)(generatePageContent({ language: 'en' }) as Record<string, never>)
    ).toBe('Save and come back later');
  });

});

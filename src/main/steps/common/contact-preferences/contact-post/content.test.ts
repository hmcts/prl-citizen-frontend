import languageAssertions from '../../../../../test/unit/utils/languageAssertions';
import { FormContent, LanguageLookup } from '../../../../app/form/Form';
import { CommonContent, generatePageContent } from '../../../common/common.content';

import { generateContent } from './content';

jest.mock('../../../../app/form/validation');
let caseNumber;

const en = {
  caption: `Case number #${caseNumber}`,
  title: 'Contact Preferences',
  subTitle: 'Personal details',
  continue: 'Submit',
  textList: [
    'You have decided to receive updates by post.',
    'You will no longer receive updates by email. You can still access previous updates through your dashboard.',
  ],
  warningText: 'Make sure that your contact details are up to date.',
};

const cy = {
  caption: `Case number - welsh #${caseNumber}`,
  title: 'Contact Preferences -welsh',
  subTitle: 'Personal details -welsh',
  continue: 'Submit - welsh',
  textList: [
    'You have decided to receive updates by post. -welsh',
    'You will no longer receive updates by email. You can still access previous updates through your dashboard. -welsh',
  ],
  warningText: 'Make sure that your contact details are up to date. -welsh',
};

describe('contact email common content', () => {
  const commonContent = {
    language: 'en',
    userCase: {
      applicants: [
        {
          value: {
            address: {
              AddressLine1: 'test',
              AddressLine2: 'test line 2',
              PostTown: 'London',
              County: 'Islington',
              PostCode: 'EC1 EC11',
            },
          },
        },
      ],
    },
  } as unknown as CommonContent;
  // eslint-disable-next-line jest/expect-expect
  test('should return correct english content', () => {
    languageAssertions('en', en, () => generateContent(commonContent));
  });

  // eslint-disable-next-line jest/expect-expect
  test('should return correct welsh content', () => {
    languageAssertions('cy', cy, () => generateContent({ ...commonContent, language: 'cy' }));
  });

  test('should contain Submit button', () => {
    const generatedContent = generateContent(commonContent);
    const form = generatedContent.form as FormContent;
    expect(
      (form?.submit?.text as LanguageLookup)(generatePageContent({ language: 'en' }) as Record<string, never>)
    ).toBe('Save and continue');
  });
});

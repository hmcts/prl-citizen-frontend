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
  address: 'Address',
  change: 'Change',
  addressLowerCase: 'address',
};

const cy = {
  caption: `Rhif yr achos #${caseNumber}`,
  title: 'Dewisiadau Cyswllt',
  subTitle: 'Manylion personol',
  continue: 'Cyflwyno',
  textList: [
    'Rydych wedi penderfynu cael diweddariadau drwy’r post.',
    'Ni fyddwch yn cael diweddariadau drwy e-bost o hyn ymlaen. Gallwch dal weld diweddariadau blaenorol yn eich dangosfwrdd',
  ],
  warningText: 'Sicrhewch fod eich manylion cyswllt yn gyfredol.',
  address: 'Cyfeiriad',
  change: 'Newid',
  addressLowerCase: 'cyfeiriad',
};

describe('contact email common content', () => {
  const commonContent = {
    language: 'en',
    userIdamId: '123',
    userCase: {
      applicants: [
        {
          value: {
            user: {
              idamId: '123',
            },
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

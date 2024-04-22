import languageAssertions from '../../../../../test/unit/utils/languageAssertions';
import { CaseWithId } from '../../../../app/case/case';
import { FormContent, LanguageLookup } from '../../../../app/form/Form';
import { CommonContent, generatePageContent } from '../../../common/common.content';

import { generateContent } from './content';

jest.mock('../../../../app/form/validation');
let caseNumber;

const en = {
  caption: `Case number ${caseNumber}`,
  title: 'Contact Preferences',
  subTitle: 'Personal details',
  emailText: 'You have decided to receive updates by email. You will still receive some information by post.',
  postText: [
    'You have decided to receive updates by post.',
    'You will no longer receive updates by email. You can still access previous updates through your dashboard.',
  ],
  continue: 'Submit',
  warningText: 'Make sure that your contact details are up to date.',
  email: 'Email',
  change: 'Change',
  nameText: 'name',
};

const cy = {
  caption: `Rhif yr achos ${caseNumber}`,
  title: 'Dewisiadau Cyswllt',
  subTitle: 'Manylion personol',
  emailText:
    'Rydych wedi penderfynu cael diweddariadau drwy e-bost. Byddwch yn dal i gael rhywfaint o wybodaeth drwy’r post.',
  postText: [
    'Rydych wedi penderfynu cael diweddariadau drwy’r post.',
    'Ni fyddwch yn cael diweddariadau drwy e-bost o hyn ymlaen. Gallwch dal weld diweddariadau blaenorol yn eich dangosfwrdd',
  ],
  continue: 'Cyflwyno',
  warningText: 'Sicrhewch fod eich manylion cyswllt yn gyfredol.',
  email: 'E-bost',
  change: 'Newid',
  nameText: 'enw',
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

  test('should set correct email change link for respondent', () => {
    commonContent.userCase = {
      caseTypeOfApplication: 'C100',
      partyContactPreference: 'email',
      respondents: [
        {
          id: '123',
          value: {
            user: {
              idamId: '123',
            },
          },
        },
      ],
      caseInvites: [
        {
          value: {
            partyId: '123',
            invitedUserId: '123',
          },
        },
      ],
      user: {
        id: '123',
      },
    } as unknown as Partial<CaseWithId>;
    commonContent.userIdamId = '123';
    commonContent.userId = '123';
    const generatedContent = generateContent(commonContent);
    expect(generatedContent.changeLink).toBe('/respondent/confirm-contact-details/contactdetails');
  });

  test('should set correct addresses and change link for respondent', () => {
    commonContent.userCase = {
      caseTypeOfApplication: 'C100',
      partyContactPreference: 'post',
      respondents: [
        {
          id: '123',
          value: {
            user: {
              idamId: '123',
            },
            address: {
              AddressLine1: 'string',
              AddressLine2: 'string',
              AddressLine3: 'string',
              PostTown: 'string',
              County: 'string',
              PostCode: 'string',
              Country: 'string',
            },
          },
        },
      ],
      caseInvites: [
        {
          value: {
            partyId: '123',
            invitedUserId: '123',
          },
        },
      ],
      user: {
        id: '123',
      },
    } as unknown as Partial<CaseWithId>;
    commonContent.userIdamId = '123';
    commonContent.userId = '123';
    const generatedContent = generateContent(commonContent);
    expect(generatedContent.changeLink).toBe('/respondent/confirm-contact-details/addressdetails');
    expect(generatedContent.addresses).toStrictEqual([
      'string',
      'string',
      'string',
      'string',
      'string',
      'string',
      'string',
    ]);
  });
});

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
  text: 'You have decided to receive updates by email. You will still receive some information by post.',
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
  text: 'Rydych wedi penderfynu cael diweddariadau drwy e-bost. Byddwch yn dal i gael rhywfaint o wybodaeth drwy’r post.',
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
    const generatedContent = generateContent(commonContent);
    expect(generatedContent.changeEmailLink).toBe('/respondent/confirm-contact-details/contactdetails');
  });
});

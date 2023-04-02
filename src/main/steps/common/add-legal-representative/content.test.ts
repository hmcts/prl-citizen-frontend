import languageAssertions from '../../../../test/unit/utils/languageAssertions';
import mockUserCase from '../../../../test/unit/utils/mockUserCase';
import { FormContent } from '../../../app/form/Form';
import { CommonContent } from '../../common/common.content';
import { generateContent } from '../add-legal-representative/content';

const enContent = {
  section: 'Adding a legal representative',
  partyName: '',
  continue: 'Continue',
  legalRepresentativeInformationLine1:
    'If you have hired a legal representative,  you will need to give them some information so they can access your case.',
  legalRepresentativeInformationLine2: 'Give your legal representative the following information:',
  legalRepresentativeInformationLine3: 'Your case reference number: ',
  legalRepresentativeInformationLine4: 'Your name: ',
  legalRepresentativeInformationLine5:
    'They will use this information to tell the court that they are now representing you in this claim.',
};

const cyContent = {
  section: 'Adding a legal representative-welsh',
  partyName: '',
  continue: 'Continue-welsh',
  legalRepresentativeInformationLine1:
    'If you have hired a legal representative,  you will need to give them some information so they can access your case.-welsh',
  legalRepresentativeInformationLine2: 'Give your legal representative the following information:-welsh',
  legalRepresentativeInformationLine3: 'Your case reference number-welsh: ',
  legalRepresentativeInformationLine4: 'Your name-welsh: ',
  legalRepresentativeInformationLine5:
    'They will use this information to tell the court that they are now representing you in this claim.-welsh',
};

jest.mock('../../../app/form/validation');
/* eslint-disable @typescript-eslint/ban-types */
describe('add-legal-representative content', () => {
  const commonContent = {
    language: 'en',
    userCase: mockUserCase,
    additionalData: {
      req: {
        query: {
          isApplicant: 'No',
        },
        session: {
          user: { id: '' },
          userCase: {
            ...mockUserCase,
            respondentsFL401: {
              firstName: '',
              lastName: '',
            },
            applicantsFL401: {
              firstName: '',
              lastName: '',
            },
          },
        },
      },
    },
  } as unknown as CommonContent;
  let generatedContent;
  let form;
  beforeEach(() => {
    generatedContent = generateContent(commonContent);
    form = generatedContent.form as FormContent;
  });

  test('should return correct english content', () => {
    expect(generatedContent.section).toEqual('Adding a legal representative');
    expect(generatedContent.legalRepresentativeInformationLine1).toEqual(
      'If you have hired a legal representative,  you will need to give them some information so they can access your case.'
    );
  });

  // eslint-disable-next-line jest/expect-expect
  test('should return correct english content Data', () => {
    languageAssertions('en', enContent, () => generateContent(commonContent));
  });

  // eslint-disable-next-line jest/expect-expect
  test('should return correct welsh content', () => {
    languageAssertions('cy', cyContent, () => generateContent({ ...commonContent, language: 'cy' }));
  });

  test('should contain continue button', () => {
    expect((form.onlyContinue?.text as Function)(generatedContent)).toBe('Continue');
  });
});
/* eslint-enable @typescript-eslint/ban-types */

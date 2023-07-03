import languageAssertions from '../../../../../test/unit/utils/languageAssertions';
import mockUserCase from '../../../../../test/unit/utils/mockUserCase';
import { FormContent } from '../../../../app/form/Form';
import { CommonContent } from '../../common.content';
import { generateContent } from '../../remove-legal-representative/start/content';

const enContent = {
  title: 'Remove my representative',
  continue: 'Continue',
  removeLegalRepresentativeInformationLine1:
    'Removing a legal representative means they will no longer have access to your case. You will be managing this case yourself.',
  removeLegalRepresentativeInformationLine2:
    'If the case had been shared with any of their colleagues, they will also lose access.',
  removeLegalRepresentativeInformationLine3: 'Linked cases are not affected.',
  removelLegalRepresentativeInformationLine4: 'By continuing:',
  removelLegalRepresentativeInformationLine5:
    'I confirm all these details are accurate and match what is written on the case.',
  errors: {
    declarationCheck: {
      required: 'Please confirm the declaration',
    },
  },
};

const cyContent = {
  title: 'Remove my representative - welsh',
  continue: 'Continue-welsh',
  removeLegalRepresentativeInformationLine1:
    'Removing a legal representative means they will no longer have access to your case. You will be managing this case yourself.-welsh',
  removeLegalRepresentativeInformationLine2:
    'If the case had been shared with any of their colleagues, they will also lose access.-welsh',
  removeLegalRepresentativeInformationLine3: 'Linked cases are not affected.-welsh',
  removelLegalRepresentativeInformationLine4: 'By continuing:-welsh',
  removelLegalRepresentativeInformationLine5:
    'I confirm all these details are accurate and match what is written on the case.-welsh',
  errors: {
    declarationCheck: {
      required: 'Please confirm the declaration-welsh',
    },
  },
};

jest.mock('../../../../app/form/validation');
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
    expect(generatedContent.title).toEqual('Remove my representative');
    expect(generatedContent.removeLegalRepresentativeInformationLine1).toEqual(
      'Removing a legal representative means they will no longer have access to your case. You will be managing this case yourself.'
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

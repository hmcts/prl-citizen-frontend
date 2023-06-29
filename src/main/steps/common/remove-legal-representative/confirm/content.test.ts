import languageAssertions from '../../../../../test/unit/utils/languageAssertions';
import mockUserCase from '../../../../../test/unit/utils/mockUserCase';
import { FormContent } from '../../../../app/form/Form';
import { CommonContent } from '../../common.content';
import { generateContent } from '../../remove-legal-representative/confirm/content';

const enContent = {
  continue: 'Close and return to case overview',
  requestSubmitted: 'Request submitted',
  whatHappensText: 'What happens next',
  removeLegalRepresentativeConfirmationLine1:
    'A case administrator from HM Courts and Tribunals will review this request.',
  removeLegalRepresentativeConfirmationLine2:
    'You will receive an email when your representative has been removed from this case.',
};

const cyContent = {
  continue: 'Close and return to case overview-welsh',
  requestSubmitted: 'Request submitted-welsh',
  whatHappensText: 'What happens next-welsh',
  removeLegalRepresentativeConfirmationLine1:
    'A case administrator from HM Courts and Tribunals will review this request.-welsh',
  removeLegalRepresentativeConfirmationLine2:
    'You will receive an email when your representative has been removed from this case.-welsh',
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
    expect(generatedContent.removeLegalRepresentativeConfirmationLine1).toEqual(
      'A case administrator from HM Courts and Tribunals will review this request.'
    );
    expect(generatedContent.removeLegalRepresentativeConfirmationLine2).toEqual(
      'You will receive an email when your representative has been removed from this case.'
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
    expect((form.onlyContinue?.text as Function)(generatedContent)).toBe('Close and return to case overview');
  });
});
/* eslint-enable @typescript-eslint/ban-types */

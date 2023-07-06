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
  title: 'Dileu fy nghynrychiolydd',
  continue: 'Parhau',
  removeLegalRepresentativeInformationLine1:
    'Bydd dileu cynrychiolydd cyfreithiol yn golygu na fydd ganddynt mwyach fynediad i’ch achos. O hyn ymlaen, byddwch yn rheoli’r achos hwn eich hun.',
  removeLegalRepresentativeInformationLine2:
    'Os yw’r achos wedi’i rannu â’u cydweithwyr, byddan nhw hefyd yn colli mynediad i’r achos.',
  removeLegalRepresentativeInformationLine3: 'Nid yw hyn yn effeithio ar achosion cysylltiedig.',
  removelLegalRepresentativeInformationLine4: 'Drwy barhau:',
  removelLegalRepresentativeInformationLine5:
    'Gallaf gadarnhau bod yr holl fanylion hyn yn gywir ac yn cyd-fynd â’r hyn sydd wedi’i ysgrifennu ar yr achos.',
  errors: {
    declarationCheck: {
      required: 'Cadarnhewch y datganiad',
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

import languageAssertions from '../../../../test/unit/utils/languageAssertions';
import mockUserCase from '../../../../test/unit/utils/mockUserCase';
import { FormContent } from '../../../app/form/Form';
import { CommonContent } from '../../common/common.content';
import { generateContent } from '../add-legal-representative/content';

const enContent = {
  title: 'Adding a legal representative',
  partyName: ' ',
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
  title: 'Ychwanegu cynrychiolydd cyfreithiol',
  partyName: ' ',
  continue: 'Parhau',
  legalRepresentativeInformationLine1:
    'Os oes gennych gynrychiolydd cyfreithiol, bydd angen ichi roi rhywfaint o wybodaeth iddynt fel y gallant gael mynediad i’ch achos.',
  legalRepresentativeInformationLine2: 'Rhowch yr wybodaeth ganlynol i’ch cynrychiolydd cyfreithiol:',
  legalRepresentativeInformationLine3: 'Cyfeirnod eich achos: ',
  legalRepresentativeInformationLine4: 'Eich enw: ',
  legalRepresentativeInformationLine5:
    'Byddant yn defnyddio’r wybodaeth hon i ddweud wrth y llys eu bod yn eich cynrychioli yn yr hawliad hwn.',
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
    expect(generatedContent.title).toEqual('Adding a legal representative');
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

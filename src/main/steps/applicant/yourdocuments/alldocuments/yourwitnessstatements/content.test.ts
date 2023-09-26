import languageAssertions from '../../../../../../test/unit/utils/languageAssertions';
//import { FormContent /*, FormFields,  FormOptions*/ } from '../../../../../app/form/Form';
import { CommonContent } from '../../../../common/common.content';

import { form, generateContent } from './content';

const enContent = {
  section: 'All documents',
  title: "'s witness statements",
  caseNumber: 'Case number',
  continue: 'Go back',
};

const cyContent = {
  section: 'Pob dogfen',
  title: "'s witness statements (welsh)",
  caseNumber: 'Rhif yr achos',
  continue: 'Yn ôl',
};

jest.mock('../../../../../app/form/validation');
/* eslint-disable @typescript-eslint/ban-types */
describe('citizen-home content', () => {
  const commonContent = {
    language: 'en',
    additionalData: {
      req: {
        session: {
          applicationSettings: {
            docToView: {
              docType: 'yourwitnessstatements',
              uploadedBy: 'applicant',
              partyName: 'John Smith',
            },
          },
        },
      },
    },
  } as unknown as CommonContent;
  let generatedContent;
  //let form;
  //let fields;
  beforeEach(() => {
    generatedContent = generateContent(commonContent);
    //form = generatedContent.form as FormContent;
    //fields = form.fields as FormFields;
  });

  test('should return correct english content', () => {
    expect(generatedContent.title).toEqual("'s witness statements");
    expect(generatedContent.section).toEqual('All documents');
    expect(generatedContent.caseNumber).toEqual('Case number');
    expect(generatedContent.continue).toEqual('Go back');
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
    expect((form.submit?.text as Function)(generateContent)).toBe(undefined);
  });
  test('should contain  field', () => {
    const field = form.fields;
    expect((field as Function)(generateContent)).toBeCalled;
  });
});
/* eslint-enable @typescript-eslint/ban-types */

import languageAssertions from '../../../../../../test/unit/utils/languageAssertions';
//import { FormContent /*, FormFields,  FormOptions*/ } from '../../../../../app/form/Form';
import { CommonContent } from '../../../../common/common.content';

import { generateContent } from './content';

const enContent = {
  section: 'All documents',
  title: 'Emails, screenshots, images and other media files',
  caseNumber: 'Case number',
  continue: 'Go back',
};

const cyContent = {
  section: 'Pob dogfen',
  title: 'Negeseuon e-bost, cipluniau, delweddau a ffeiliau cyfryngau eraill',
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
              docType: 'digitaldownloads',
              uploadedBy: 'applicant',
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
    expect(generatedContent.title).toEqual('Emails, screenshots, images and other media files');
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
});
/* eslint-enable @typescript-eslint/ban-types */

import languageAssertions from '../../../../../../test/unit/utils/languageAssertions';
//import { FormContent /*, FormFields,  FormOptions*/ } from '../../../../../app/form/Form';
import { CommonContent } from '../../../../common/common.content';

import { generateContent } from './content';

const enContent = {
  section: 'All documents',
  title: 'Allegation of harm and violence',
  threeHint: 'This is a 8 character code',
  summaryText: 'Contacts for help',
  caseNumber: 'Case number',
  continue: 'Go back',
};

const cyContent = {
  section: 'Pob dogfen',
  title: 'Honiad o niwed a thrais',
  threeHint: 'Mae hwn yn god 8 nod',
  summaryText: 'Cysylltiadau cymorth',
  caseNumber: 'Rhif yr achos',
  continue: 'Yn ôl',
};

jest.mock('../../../../../app/form/validation');
/* eslint-disable @typescript-eslint/ban-types */
describe('citizen-home content', () => {
  const commonContent = { language: 'en' } as CommonContent;
  let generatedContent;
  //let form;
  //let fields;
  beforeEach(() => {
    generatedContent = generateContent(commonContent);
    //form = generatedContent.form as FormContent;
    //fields = form.fields as FormFields;
  });

  test('should return correct english content', () => {
    expect(generatedContent.title).toEqual('Allegation of harm and violence');
    expect(generatedContent.section).toEqual('All documents');
    expect(generatedContent.summaryText).toEqual('Contacts for help');
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

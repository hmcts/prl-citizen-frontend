import languageAssertions from '../../../../../../test/unit/utils/languageAssertions';
import { FormContent, FormFields, FormOptions } from '../../../../../app/form/Form';
// import { FormContent } from '../../../../../app/form/Form';
//import { FormContent /*, FormFields,  FormOptions*/ } from '../../../../../../app/form/Form';
import { CommonContent } from '../../../../common/common.content';

import { form, generateContent } from './content';

const enContent = {
  section: 'All documents',
  title: 'Orders from the court',
  caseNumber: 'Case number',
  continue: 'Go back',
};

const cyContent = {
  section: 'Pob dogfen',
  title: 'Gorchmynion gan y llys',
  caseNumber: 'Rhif yr achos',
  continue: 'Yn ôl',
};

jest.mock('../../../../../app/form/validation');
/* eslint-disable @typescript-eslint/ban-types */
describe('citizen-home content', () => {
  const commonContent = { language: 'en' } as CommonContent;
  let generatedContent;
  const forms = form as FormContent;
  let field;
  beforeEach(() => {
    generatedContent = generateContent(commonContent);
  });

  test('should return correct english content', () => {
    expect(generatedContent.title).toEqual('Orders from the court');
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

  // test('should contain detailsKnown field', () => {
  //   const detailsKnownField = fields.detailsKnown as FormOptions;
  //   expect(detailsKnownField.type).toBe('radios');
  //   expect(detailsKnownField.classes).toBe('govuk-radios');
  //   expect((detailsKnownField.section as Function)(generatedContent)).toBe(enContent.section);
  // });

  test('should contain detailsKnown field', () => {
    field = forms.fields as FormFields;
    const detailsKnownField = field({ caseNumber: '1233' }).caseNumber as FormOptions;
    expect((detailsKnownField.label as Function)(generatedContent)).toBe(enContent.caseNumber + 'undefined');
    expect((forms.submit?.text as Function)(generatedContent)).toBe(enContent.continue);
  });
});
/* eslint-enable @typescript-eslint/ban-types */

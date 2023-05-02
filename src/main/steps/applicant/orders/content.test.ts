import languageAssertions from '../../../../test/unit/utils/languageAssertions';
import { FormContent, FormFields } from '../../../app/form/Form';
import { CommonContent } from '../../common/common.content';

import { generateContent } from './content';

const enContent = {
  section: 'All documents',
  title: 'Orders from the court',
  summaryText: 'Contacts for help',
  caseNumber: 'Case number',
  continue: 'Go back',
};

const cyContent = {
  section: 'Pob dogfen',
  title: 'Gorchmynion gan y llys',
  summaryText: 'Cysylltiadau am gymorth',
  caseNumber: 'Rhif yr achos ',
  continue: 'Yn ôl',
};

jest.mock('../../../app/form/validation');
/* eslint-disable @typescript-eslint/ban-types */
describe('citizen-home content', () => {
  const commonContent = { language: 'en' } as CommonContent;
  let generatedContent;
  let form;
  let fields;
  beforeEach(() => {
    generatedContent = generateContent(commonContent);
    form = generatedContent.form as FormContent;
    fields = form.fields as FormFields;
  });

  test('should return correct english content', () => {
    expect(generatedContent.title).toEqual('Orders from the court');
    expect(generatedContent.section).toEqual('All documents');
    expect(generatedContent.summaryText).toEqual('Contacts for help');
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

  test('should contain detailsKnown field', () => {
    const userCaseField = fields.caseNumber;
    expect(userCaseField.type).toBe('hidden');
    expect((userCaseField.label as Function)(generatedContent)).toBe(enContent.caseNumber + userCaseField.caseCode);
  });

  test('should contain Save and continue button', () => {
    expect((form.submit?.text as Function)(generatedContent)).toBe('Go back');
  });
});
/* eslint-enable @typescript-eslint/ban-types */

import languageAssertions from '../../../../test/unit/utils/languageAssertions';
import mockUserCase from '../../../../test/unit/utils/mockUserCase';
import { FormContent } from '../../../app/form/Form';
import { CommonContent } from '../../common/common.content';

import { generateContent } from './content';

const en = {
  success: 'Response submitted successfully',
  caseNumber: 'Case number ',
  line1: 'By submitting this response you have completed the following:',
  line2: 'Your response to the application',
  line3: 'What happens next',
  list1:
    '<li>The court will consider your response at the first hearing.</li><li>If a hearing has not been listed yet, the court will consider your response after Cafcass has provided a safeguarding letter.</li><li>If you have informed the court that you need specific adjustments to take part in the case, they will contact you to confirm what has been arranged. If you haven\'t heard from the court within 3 days of the hearing, call 0300 123 711 or email <a href="#" class="govuk-link">customer.service@justice.gov.uk</a>.</li>',
  line4: 'You can also:',
  list2: `<li><a href="https://helpwithchildarrangements.service.justice.gov.uk/going-to-court-other-parent" class="govuk-link" target="_blank">Read more about child arrangements</a></li>
  <li><a href="https://www.gov.uk/find-legal-advice/find-legal-adviser" class="govuk-link" target="_blank">Find an organisation that will help you with your case</a></li>`,
  line5: ' Download your response (PDF)',
  line6: `If you cannot open the PDF file on your device, download and install
  <a href="https://get.adobe.com/uk/reader/" class="govuk-link" rel="external" target="_blank">Adobe Acrobat Reader</a> and try again.`,
  line7: 'A copy of your submitted application will be in your personal dashboard.',
  downloadLink:
    ' <a class="govuk-button ga-pageLink govuk-button--secondary" role="button" draggable="false" data-module="govuk-button" data-ga-category="check your answers" data-ga-label="download draft" download="" href="/tasklistresponse/generate-c7-final">Download your response</a>',
  saveAndContinue: 'Continue',
};

const cy: typeof en = {
  success: 'Response submitted successfully -welsh',
  caseNumber: 'Case number  -welsh',
  line1: 'By submitting this response you have completed the following: -welsh',
  line2: 'Your response to the application -welsh',
  line3: 'What happens next -welsh',
  list1:
    '<li>The court will consider your response at the first hearing.</li><li>If a hearing has not been listed yet, the court will consider your response after Cafcass has provided a safeguarding letter.</li><li>If you have informed the court that you need specific adjustments to take part in the case, they will contact you to confirm what has been arranged. If you haven\'t heard from the court within 3 days of the hearing, call 0300 123 711 or email <a href="#" class="govuk-link">customer.service@justice.gov.uk</a>.</li> -welsh',
  line4: 'You can also: -welsh',
  list2: `<li><a href="https://helpwithchildarrangements.service.justice.gov.uk/going-to-court-other-parent" class="govuk-link" target="_blank">Read more about child arrangements</a></li>
  <li><a href="https://www.gov.uk/find-legal-advice/find-legal-adviser" class="govuk-link" target="_blank">Find an organisation that will help you with your case</a></li> -welsh`,
  line5: ' Download your response (PDF) -welsh',
  line6: `Os na allwch agor y ffeil PDF ar eich dyfais, llwythwch a gosodwch
  <a href="https://get.adobe.com/uk/reader/" class="govuk-link" rel="external" target="_blank">Adobe Acrobat Reader</a> ar eich dyfais a cheisio eto.`,
  line7: 'A copy of your submitted application will be in your personal dashboard. -welsh',
  downloadLink:
    ' <a class="govuk-button ga-pageLink govuk-button--secondary" role="button" draggable="false" data-module="govuk-button" data-ga-category="check your answers" data-ga-label="download draft" download="" href="/tasklistresponse/generate-c7-final">Download your response -welsh</a>',
  saveAndContinue: 'Parhau',
};

jest.mock('../../../app/form/validation');
/* eslint-disable @typescript-eslint/ban-types */
describe('citizen-home content', () => {
  const commonContent = { language: 'en' } as CommonContent;
  let generatedContent;
  let form;
  beforeEach(() => {
    commonContent.userCase = mockUserCase;
    generatedContent = generateContent(commonContent);
    form = generatedContent.form as FormContent;
  });

  test('should return correct english content', () => {
    expect(generatedContent.saveAndContinue).toEqual('Continue');
  });

  // eslint-disable-next-line jest/expect-expect
  test('should return correct english content Data', () => {
    languageAssertions('en', en, () => generateContent(commonContent));
  });

  // eslint-disable-next-line jest/expect-expect
  test('should return correct welsh content', () => {
    languageAssertions('cy', cy, () => generateContent({ ...commonContent, language: 'cy' }));
  });
  test('should contain Continue button', () => {
    expect((form.submit?.text as Function)(generatedContent)).toBe('Continue');
  });
});

/* eslint-enable @typescript-eslint/ban-types */

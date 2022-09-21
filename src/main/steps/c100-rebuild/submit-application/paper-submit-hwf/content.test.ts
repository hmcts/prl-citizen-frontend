import languageAssertions from '../../../../../test/unit/utils/languageAssertions';
import { CommonContent } from '../../../common/common.content';

import { generateContent } from './content';

const en = {
  notificationHeading: 'You can now submit your application',
  secondaryHeading: 'How to submit your application',
  secondaryHeading1: 'Download your application',
  secondaryHeading2: 'Print your application and any attached documents',
  secondaryHeading3: 'Post it to the court',
  secondaryHeading4: 'Pay the application fee',
  paragraphText: `Print 3 copies of your entire application on A4 paper, single sided.
                    The court will send one copy to the other people in the case,
                    keep a copy, and return one copy to you.`,
  paragraphText1: `Any attached documents must be included in full 
                   as part of each copy of the application.`,
  paragraphText2: 'Post all 3 printed copies of your application to:',
  paragraphText3: `You may not need to pay the full amount as 
                    you have a Help with Fees reference number.
                    The court will call you if they require payment.
                    The call  may come from a 'private number'`,
  firstList: [
    '<a href="https://helpwithchildarrangements.service.justice.gov.uk/" class="govuk-link">Read more about child arrangements</a>',
    '<a href="https://www.gov.uk/find-legal-advice/find-legal-adviser" class="govuk-link">Find an organisation that will help you with your case</a>',
    '<a href="https://www.gov.uk/legal-aid" class="govuk-link">Find legal aid</a>',
  ],
  postalAddress: `C100 Applications <br>Private Law Digital Services
                  <br>PO BOX 13235<br>Harlow<br>CM20 9TT`,
  innerText: `If you cannot open the PDF file after downloading, install 
  <a href="https://get.adobe.com/uk/reader/" class="govuk-link" rel="external" target="_blank">Adobe Acrobat Reader</a> and try again.`,
  warningText: 'The court will not receive your application until you complete these steps.',
};

const cy = {
  notificationHeading: 'You can now submit your application - welsh',
  secondaryHeading: 'How to submit your application - welsh',
  secondaryHeading1: 'Download your application - welsh',
  secondaryHeading2: 'Print your application and any attached documents - welsh',
  secondaryHeading3: 'Post it to the court - welsh',
  secondaryHeading4: 'Pay the application fee - welsh',
  paragraphText: `Print 3 copies of your entire application on A4 paper, single sided.
                    The court will send one copy to the other people in the case,
                    keep a copy, and return one copy to you. - welsh`,
  paragraphText1: `Any attached documents must be included in full 
                   as part of each copy of the application. - welsh`,
  paragraphText2: 'Post all 3 printed copies of your application to: - welsh',
  paragraphText3: `You may not need to pay the full amount as 
                    you have a Help with Fees reference number.
                    The court will call you if they require payment.
                    The call  may come from a 'private number' - welsh`,
  firstList: [
    '<a href="https://helpwithchildarrangements.service.justice.gov.uk/" class="govuk-link">Read more about child arrangements</a> - welsh',
    '<a href="https://www.gov.uk/find-legal-advice/find-legal-adviser" class="govuk-link">Find an organisation that will help you with your case</a> - welsh',
    '<a href="https://www.gov.uk/legal-aid" class="govuk-link">Find legal aid</a> - welsh',
  ],
  postalAddress: `C100 Applications <br>Private Law Digital Services
                  <br>PO BOX 13235<br>Harlow<br>CM20 9TT  - welsh`,
  innerText: `If you cannot open the PDF file after downloading, install 
  <a href="https://get.adobe.com/uk/reader/" class="govuk-link" rel="external" target="_blank">Adobe Acrobat Reader</a> and try again. - welsh`,
  warningText: 'The court will not receive your application until you complete these steps. - welsh',
};
describe('applicant personal details > applying-with > content', () => {
  const commonContent = { language: 'en' } as CommonContent;

  // eslint-disable-next-line jest/expect-expect
  test('should return correct english content', () => {
    languageAssertions('en', en, () => generateContent(commonContent));
  });

  // eslint-disable-next-line jest/expect-expect
  test('should return correct welsh content', () => {
    languageAssertions('cy', cy, () => generateContent({ ...commonContent, language: 'cy' }));
  });
});

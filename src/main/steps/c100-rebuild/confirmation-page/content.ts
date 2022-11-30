import { TranslationFn } from '../../../app/controller/GetController';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const en = () => ({
  successMessage: 'Your application has been submitted',
  label: 'Case number',
  subContent: "Your application has been sent to Central Family Court. You'll receive a confirmation email to",
  subTitle1: 'Download a copy of your application',
  subTitle2: 'Now that you have submitted your application:',
  triTitle: 'You can also:',
  secondaryContent: `If you cannot open the PDF file on your device, download and install 
  <a href="https://get.adobe.com/uk/reader/" class="govuk-link" rel="external" target="_blank">Adobe Acrobat Reader</a> 
  and try again.`,
  copyRightsTxt: 'A copy of your submitted application will be in your personal dashboard.',
  list: [
    `<a href="https://www.cafcass.gov.uk/" class="govuk-link govuk-link" rel="external" target="_blank">Cafcass</a> or
     <a href="https://gov.wales/cafcass-cymru" class="govuk-link govuk-link" rel="external" target="_blank">Cafcass Cymru</a>
      will be in touch with you to conduct the necessary safeguarding checks`,
    'the respondent will receive a copy of your application, and will have the chance to respond to it',
    'the court will be in touch with you to explain what will happen next and what you will need to do',
    `if you have informed the court that you need specific adjustments in order to take part in the case, 
    the court will contact you to confirm what has been arranged. If you have not heard from the court within 3 days of the hearing, 
    call 0300 123 711 or email <a href="#" class="govuk-link">customer.service@justice.gov.uk</a>.`,
  ],
  secondList: [
    `<a href='https://helpwithchildarrangements.service.justice.gov.uk/' class='govuk-link' 
    target='_blank'>Read more about child arrangements</a>`,
    `<a href="https://www.gov.uk/find-legal-advice/find-legal-adviser" class="govuk-link" target="_blank">Find an organisation 
    that will help you with your case</a>`,
  ],
  primaryBtnLabel: 'Download your application',
  secondaryBtnLabel: 'Return to your dashboard',
});

const cy = () => ({
  successMessage: 'Your application has been submitted',
  label: 'Case number',
  subContent: "Your application has been sent to Central Family Court. You'll receive a confirmation email to",
  subTitle1: 'Download a copy of your application',
  subTitle2: 'Now that you have submitted your application:',
  triTitle: 'You can also:',
  secondaryContent: `If you cannot open the PDF file on your device, download and install 
  <a href="https://get.adobe.com/uk/reader/" class="govuk-link" rel="external" target="_blank">Adobe Acrobat Reader</a> 
  and try again.`,
  copyRightsTxt: 'A copy of your submitted application will be in your personal dashboard.',
  list: [
    `<a href="https://www.cafcass.gov.uk/" class="govuk-link govuk-link" rel="external" target="_blank">Cafcass</a> or
     <a href="https://gov.wales/cafcass-cymru" class="govuk-link govuk-link" rel="external" target="_blank">Cafcass Cymru</a>
      will be in touch with you to conduct the necessary safeguarding checks`,
    'the respondent will receive a copy of your application, and will have the chance to respond to it',
    'the court will be in touch with you to explain what will happen next and what you will need to do',
    `if you have informed the court that you need specific adjustments in order to take part in the case, 
    the court will contact you to confirm what has been arranged. If you have not heard from the court within 3 days of the hearing, 
    call 0300 123 711 or email <a href="#" class="govuk-link">customer.service@justice.gov.uk</a>.`,
  ],
  secondList: [
    `<a href='https://helpwithchildarrangements.service.justice.gov.uk/' class='govuk-link' 
    target='_blank'>Read more about child arrangements</a>`,
    `<a href="https://www.gov.uk/find-legal-advice/find-legal-adviser" class="govuk-link" target="_blank">Find an organisation 
    that will help you with your case</a>`,
  ],
  primaryBtnLabel: 'Download your application',
  secondaryBtnLabel: 'Return to your dashboard',
});

const languages = {
  en,
  cy,
};

export const generateContent: TranslationFn = content => {
  const translations = languages[content.language]();
  return {
    ...translations,
  };
};

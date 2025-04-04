import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent } from '../../../app/form/Form';
import { getApplicationListUrl } from '../utils';

export * from './routeGuard';

import { prepareSummaryList } from './utils';

export const en = {
  title: 'Check your answers to your application',
  caseNumber: 'Case number',
  application: 'application',
  sectionTitles: {},
  typeOfApplication: 'What are you applying for?',
  whichHearing: 'Which hearing are you applying to delay or cancel?',
  doHaveAgreementForRequest: 'Does the other person in the case agree with the date change?',
  isOtherInformed: 'Can the respondent be informed about the application?',
  documentsUpload: 'Document uploaded',
  doHaveSupportingDocuments: 'Do you have supporting documents to upload?',
  isHwfRequired: 'Will you be using help with fees to pay for this application?',
  hwfReferenceNumber: 'Help with fees reference number',
  change: 'Change',
  cancel: 'Cancel',
  continue: 'Submit Application',
  errors: {
    paymentError: {
      title: 'There is a problem',
      defaultPaymentError: 'Your application is not submitted. Please try again.',
      applicationNotSubmitted:
        'Your payment was successful but you need to resubmit your application. If you are unable to submit the application, please contact the court.',
      paymentUnsuccessful: 'Your payment was unsuccessful. Make the payment again and resubmit your application.',
    },
  },
};

export const cy = {
  title: 'Gwirio eich atebion i’ch cais',
  caseNumber: 'Rhif yr achos ',
  application: 'Cais',
  sectionTitles: {},
  typeOfApplication: 'Beth ydych chi’n gwneud cais amdano?',
  whichHearing: 'Pa wrandawiad ydych chi’n gwneud cais i’w ohirio neu ei ganslo?',
  doHaveAgreementForRequest: 'A yw’r unigolyn arall yn yr achos yn cytuno i newid y dyddiad?',
  isOtherInformed: 'Can the respondent be informed about the application? -welsh',
  documentsUpload: 'Dogfen wedi’i huwchlwytho',
  doHaveSupportingDocuments: 'A oes gennych chi ddogfennau ategol i’w huwchlwytho?',
  isHwfRequired: 'A fyddwch chi’n defnyddio Help i Dalu Ffioedd i dalu am y cais hwn?',
  hwfReferenceNumber: 'Cyfeirnod Help i Dalu Ffioedd',
  change: 'Newid',
  cancel: 'Canslo',
  continue: 'Cyflwyno’r cais',
  errors: {
    paymentError: {
      title: 'Mae yna broblem',
      defaultPaymentError: 'Nid yw eich cais wedi’i gyflwyno. Rhowch gynnig arall arni.',
      applicationNotSubmitted:
        'Your payment was successful but you need to resubmit your application. If you are unable to submit the application, please contact the court (welsh).',
      paymentUnsuccessful:
        'Your payment was unsuccessful. Make the payment again and resubmit your application (welsh).',
    },
  },
};

export const form: FormContent = {
  fields: {},
  submit: {
    text: l => l.continue,
  },
  link: {
    classes: 'govuk-!-margin-left-3',
    href: '#',
    text: l => l.cancel,
  },
};

const languages = {
  en,
  cy,
};

export const generateContent: TranslationFn = content => {
  const translations = languages[content.language];

  Object.assign(form.link!, {
    href: getApplicationListUrl(content.additionalData?.req?.params?.partyType),
  });

  return {
    ...translations,
    form,
    sections: [prepareSummaryList(content.language === 'en' ? en : cy, content)],
  };
};

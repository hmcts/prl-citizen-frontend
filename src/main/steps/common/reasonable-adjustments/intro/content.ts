import _ from 'lodash';

import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent } from '../../../../app/form/Form';
export * from './routeGuard';

const en = {
  caption: 'Support you need during the case',
  title: 'Tell us if you need support',
  title2: 'Tell us if your support needs have changed',
  content1: 'Some people need support during their case. This includes if a case goes to court.',
  content2: 'You can ask for:',
  list: [
    {
      content: 'language requirements, for example if you need an interpreter in a particular language',
    },
    {
      content:
        'support for people with a health condition or disability (known as ‘reasonable adjustments’), for example access and mobility needs',
    },
    {
      content: 'special arrangements for you to feel safe at court, for example a separate waiting room',
    },
  ],
  content3: 'Requesting support',
  content4:
    '<a class="govuk-link" rel="external" href="https://www.gov.uk/find-court-tribunal" target="_blank">Contact the court (opens in a new tab)</a> if you have a hearing within 2 days and you need support.',
  content5: 'Support before a court hearing',
  content6:
    'If you need support before a hearing, you can ask for it at any point during your case. For example, if you need documents in an alternative format like braille.',
  content7: 'Support at a court hearing',
  content8:
    'If you’re asked to attend a hearing, you can ask for support if you need help to take part. We’ll let you know if you need to attend and you can tell us what support you’ll need.',
  content9: 'Support for somebody else',
  content10:
    'If somebody else who’s also attending the hearing needs support, you can <a class="govuk-link" rel="external" href="https://www.gov.uk/find-court-tribunal" target="_blank">contact the court (opens in a new tab)</a>.',
  content11: 'What happens next',
  content12:
    'Once you’ve submitted your request for support, it’ll be reviewed by HMCTS staff or a judge. We’ll contact you if we need more information.',
  startNow: 'Start now',
};

const cy: typeof en = {
  caption: 'Support you need during the case - welsh',
  title: 'Tell us if you need support - welsh',
  title2: 'Tell us if your support needs have changed - welsh',
  content1: 'Some people need support during their case. This includes if a case goes to court. - welsh',
  content2: 'You can ask for: - welsh',
  list: [
    {
      content: 'language requirements, for example if you need an interpreter in a particular language - welsh',
    },
    {
      content:
        'support for people with a health condition or disability (known as ‘reasonable adjustments’), for example access and mobility needs - welsh',
    },
    {
      content: 'special arrangements for you to feel safe at court, for example a separate waiting room - welsh',
    },
  ],
  content3: 'Requesting support - welsh',
  content4:
    '<a class="govuk-link" rel="external" href="https://www.gov.uk/find-court-tribunal" target="_blank">Contact the court (opens in a new tab)</a> if you have a hearing within 2 days and you need support. - welsh',
  content5: 'Support before a court hearing - welsh',
  content6:
    'If you need support before a hearing, you can ask for it at any point during your case. For example, if you need documents in an alternative format like braille. - welsh',
  content7: 'Support at a court hearing - welsh',
  content8:
    'If you’re asked to attend a hearing, you can ask for support if you need help to take part. We’ll let you know if you need to attend and you can tell us what support you’ll need. - welsh',
  content9: 'Support for somebody else - welsh',
  content10:
    'If somebody else who’s also attending the hearing needs support, you can <a class="govuk-link" rel="external" href="https://www.gov.uk/find-court-tribunal" target="_blank">contact the court (opens in a new tab)</a>. - welsh',
  content11: 'What happens next - welsh',
  content12:
    'Once you’ve submitted your request for support, it’ll be reviewed by HMCTS staff or a judge. We’ll contact you if we need more information. - welsh',
  startNow: 'Start now - welsh',
};

export const languages = {
  en,
  cy,
};

export const form: FormContent = {
  fields: {},
  onlyContinue: {
    classes: 'govuk-!-margin-top-6',
    text: l => l.startNow,
    isStartButton: true,
  },
};

export const generateContent: TranslationFn = content => {
  const translations = languages[content.language];
  const hasRAData = _.get(
    content.additionalData,
    'req.session.applicationSettings.reasonableAdjustments.isManageSupport',
    false
  );

  return {
    ...translations,
    title: !hasRAData ? translations.title : translations.title2,
    form,
  };
};

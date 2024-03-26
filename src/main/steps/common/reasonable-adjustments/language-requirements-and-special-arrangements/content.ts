import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent } from '../../../../app/form/Form';
import { isTextAreaValid } from '../../../../app/form/validation';

const en = {
  caption: 'Support you need during the case',
  title: 'Language requirements and special arrangements',
  content1: 'Language requirements',
  content2: 'Think about all communication with the court, as well as what you might need at a hearing.',
  content3: 'For example, tell us if you need:',
  list: [
    {
      content: 'to speak, read or write in Welsh',
    },
    {
      content: 'an interpreter in a language that is not English',
    },
  ],
  content4: 'Special arrangements',
  content5:
    'You may need special arrangements to feel safe at court. Some of these arrangements will need to be agreed by the judge or HMCTS staff. If your needs change, you can tell the court before your hearing date.',
  content6: 'Tell us if you need:',
  specialArrangementsList: [
    {
      content: 'separate entrances and exits',
    },
    {
      content: 'separate toilets',
    },
    {
      content: 'a separate waiting room',
    },
    {
      content: 'a visit to the court before the hearing',
    },
    {
      content: 'screens so you and the other people in the case cannot see each other',
    },
    {
      content: 'a hearing by phone or video',
    },
    {
      content: 'anything else to help make you feel safe during the hearing',
    },
  ],
  supportYouNeed: 'Tell us what support you need (optional)',
  supportYouNeedHint:
    'Provide as much detail as possible, including why the support is needed.If you have already asked for support, your request has been sent to the court.',
  errors: {
    ra_languageReqAndSpecialArrangements: {
      invalidCharacters: 'You have entered an invalid character. Special characters <,>,{,} are not allowed.',
      invalid:
        'You have exceeded the character limit accepted by the free text field. Please enter 5,000 characters or less.',
    },
  },
};

const cy: typeof en = {
  caption: 'Support you need during the case - welsh',
  title: 'Language requirements and special arrangements - welsh',
  content1: 'Language requirements - welsh',
  content2: 'Think about all communication with the court, as well as what you might need at a hearing. - welsh',
  content3: 'For example, tell us if you need: - welsh',
  list: [
    {
      content: 'to speak, read or write in Welsh - welsh',
    },
    {
      content: 'an interpreter in a language that is not English - welsh',
    },
  ],
  content4: 'Special arrangements - welsh',
  content5:
    'You may need special arrangements to feel safe at court. Some of these arrangements will need to be agreed by the judge or HMCTS staff. If your needs change, you can tell the court before your hearing date. - welsh',
  content6: 'Tell us if you need: - welsh',
  specialArrangementsList: [
    {
      content: 'separate entrances and exits - welsh',
    },
    {
      content: 'separate toilets - welsh',
    },
    {
      content: 'a separate waiting room - welsh',
    },
    {
      content: 'a visit to the court before the hearing - welsh',
    },
    {
      content: 'screens so you and the other people in the case cannot see each other - welsh',
    },
    {
      content: 'a hearing by phone or video - welsh',
    },
    {
      content: 'anything else to help make you feel safe during the hearing - welsh',
    },
  ],
  supportYouNeed: 'Tell us what support you need (optional) - welsh',
  supportYouNeedHint:
    'Provide as much detail as possible, including why the support is needed.If you have already asked for support, your request has been sent to the court. - welsh',
  errors: {
    ra_languageReqAndSpecialArrangements: {
      invalidCharacters: 'Rydych wedi defnyddio nod annilys. Ni chaniateir y nodau arbennig hyn <,>,{,}',
      invalid:
        'Rydych wedi defnyddio mwy o nodau na’r hyn a ganiateir yn y blwch testun rhydd. Defnyddiwch 5,000 neu lai o nodau.',
    },
  },
};

export const languages = {
  en,
  cy,
};

export const form: FormContent = {
  fields: {
    ra_languageReqAndSpecialArrangements: {
      type: 'textarea',
      labelSize: 'm',
      label: l => l.supportYouNeed,
      hint: l => l.supportYouNeedHint,
      attributes: {
        rows: 4,
      },
      validator: isTextAreaValid,
    },
  },
  onlyContinue: {
    text: l => l.onlyContinue,
  },
  link: {
    classes: 'govuk-!-margin-left-3',
    href: '#',
    text: l => l.cancel,
  },
};

export const generateContent: TranslationFn = content => {
  const translations = languages[content.language];

  return {
    ...translations,
    form,
  };
};

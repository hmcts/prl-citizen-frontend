import _ from 'lodash';

import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent } from '../../../../app/form/Form';
import { isFieldFilledIn, isTextAreaValid } from '../../../../app/form/validation';
import { applyParms } from '../../../../steps/common/url-parser';
import { FETCH_CASE_DETAILS } from '../../../../steps/urls';

const en = {
  caption: 'Support you need during the case',
  title: 'Language requirements and special arrangements',
  content1: 'Language requirements',
  content2: 'Think about all communication with the court, as well as what you might need at a hearing.',
  content3: 'Tell us if you:',
  list: [
    {
      content: 'want to speak, read or write in Welsh',
    },
    {
      content: 'need an interpreter in a language that is not English',
    },
  ],
  content4: 'Support needs',
  content5:
    'Tell us if you or any other party involved in the case have a health condition or disability that means you need support to take part in the hearing or communicate with the court.',
  content6: 'Tell us if you need:',
  supportNeedsList: [
    {
      content: 'an intermediary',
    },
    {
      content: 'special assistance',
    },
    {
      content: 'special facilities',
    },
  ],
  content7: 'Special Measures',
  content8:
    'Please say whether there is a need for the court to make any special measures for you or any relevant children to attend court.',
  content9: 'Special measures can be put in place to keep you separate from the respondent when you attend court.',
  content10: 'Select any of the following measures you would like to request.',
  specialArrangementsList: [
    {
      content: 'a separate waiting room in the court building',
    },
    {
      content: 'a separate entrance and exit from the court building',
    },
    {
      content:
        'to be shielded by a privacy screen in the courtroom (a privacy screen would mean the respondent would not be able to see you while in the courtroom).',
    },
    {
      content:
        'to join the hearing by video link rather than in person (it is the judge’s decision whether to allow a hearing by video link).',
    },
  ],
  supportYouNeed: 'Tell us what support you need',
  supportYouNeedHint: 'Provide as much detail as possible to help us understand what you need.',
  errors: {
    ra_languageReqAndSpecialArrangements: {
      invalidCharacters: 'You have entered an invalid character. Special characters <,>,{,} are not allowed.',
      invalid:
        'You have exceeded the character limit accepted by the free text field. Please enter 5,000 characters or less.',
    },
  },
};

const cy: typeof en = {
  caption: 'Cymorth y mae arnoch ei angen yn ystod yr achos',
  title: 'Gofynion ieithyddol a threfniadau arbennig',
  content1: 'Gofynion ieithyddol',
  content2: 'Meddyliwch am yr holl ohebiaeth â’r llys, ynghyd â’r hyn y gallwch fod ei angen mewn gwrandawiad.',
  content3: '--welsh-- Tell us if you need:',
  list: [
    {
      content: '--welsh-- want to speak, read or write in Welsh',
    },
    {
      content: '--welsh-- need an interpreter in a language that is not English',
    },
  ],
  content4: '--welsh-- Support needs',
  content5:
    '--welsh-- Tell us if you or any other party involved in the case have a health condition or disability that means you need support to take part in the hearing or communicate with the court.',
  content6: '--welsh-- Tell us if you need:',
  supportNeedsList: [
    {
      content: '--welsh-- an intermediary',
    },
    {
      content: '--welsh-- special assistance',
    },
    {
      content: '--welsh-- special facilities',
    },
  ],
  content7: '--welsh-- Special Measures',
  content8:
    '--welsh-- Please say whether there is a need for the court to make any special measures for you or any relevant children to attend court.',
  content9:
    '--welsh-- Special measures can be put in place to keep you separate from the respondent when you attend court.',
  content10: '--welsh-- Select any of the following measures you would like to request.',
  specialArrangementsList: [
    {
      content: '--welsh-- a separate waiting room in the court building',
    },
    {
      content: '--welsh-- a separate entrance and exit from the court building',
    },
    {
      content:
        '--welsh-- to be shielded by a privacy screen in the courtroom (a privacy screen would mean the respondent would not be able to see you while in the courtroom).',
    },
    {
      content:
        '--welsh-- to join the hearing by video link rather than in person (it is the judge’s decision whether to allow a hearing by video link).',
    },
  ],
  supportYouNeed: 'Dywedwch wrthym pa gymorth sydd ei angen arnoch (dewisol)',
  supportYouNeedHint:
    "Rhowch gymaint o fanylion â phosibl, gan gynnwys pam fod angen y cymorth. Os ydych eisoes wedi gofyn am gymorth, anfonwyd eich cais i'r llys.",
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
      validator: value => isFieldFilledIn(value) || isTextAreaValid(value),
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

  Object.assign(form.link!, {
    href: applyParms(FETCH_CASE_DETAILS, { caseId: _.get(content, 'userCase.id', '') }),
  });

  return {
    ...translations,
    form,
  };
};

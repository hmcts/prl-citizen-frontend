/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { TranslationFn } from '../../../../../app/controller/GetController';
import { FormContent } from '../../../../../app/form/Form';
import { isFieldFilledIn } from '../../../../../app/form/validation';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const en = () => ({
  caption: 'Safety concerns',
  title: 'What do you want the court to do to keep you and the children safe?',
  paragraph:
    'Describe what you want the court to do to keep you and the children safe. The court may be able to make a protective order.',
  detailsSummary: 'Actions the court can take',
  detailsParagraphs: [
    '<strong>Non-molestation order:</strong> The court may decide to make a non-molestation order. This requires the person served with the order not to be violent, or threaten violence. They must not harass or pester the person who applied for the order in any way. This includes harassing them over messaging apps or social media (Facebook, Twitter and so on).',
    '<strong>Prohibited Steps:</strong> this order prevents a person from taking certain actions without the permission of the court.',
    '<strong>Specific issue:</strong> this order sets out a decision on specific issues, which could include medical treatment, education or a foreign holiday.',
  ],
  errors: {
    c1A_keepingSafeStatement: {
      required: 'Describe what do you want the court to do to keep you and the children safe',
    },
  },
});

export const cy = () => ({
  caption: 'Pryderon diogelwch',
  title: "Beth ydych chi eisiau i'r llys ei wneud i'ch cadw chi a'r plant yn ddiogel?",
  paragraph:
    "Disgrifiwch yr hyn rydych chi eisiau i'r llys ei wneud i'ch cadw chi a'r plant yn ddiogel. Mae'n bosib y bydd y llys yn gallu gwneud gorchymyn amddiffyn.",
  detailsSummary: 'Camau y gall y llys eu cymryd',
  detailsParagraphs: [
    "<strong>Gorchymyn rhag molestu: </strong>  Gall y llys benderfynu gwneud gorchymyn rhag molestu. Mae hyn yn ei gwneud yn ofynnol i'r unigolyn a wasanaethwyd â’r gorchymyn hwn i beidio â bod yn dreisgar, neu fygwth rhywun gyda thrais. Ni ddylent aflonyddu na phlagio’r unigolyn a wnaeth gais am y gorchymyn mewn unrhyw ffordd. Mae hyn yn cynnwys aflonyddu ar rywun dros apiau anfon negeseuon neu gyfryngau cymdeithasol (Facebook, Twitter ac yn y blaen).",
    "<strong>Camau Gwaharddedig:</strong> mae'r gorchymyn hwn yn atal unigolyn rhag cymryd camau penodol heb ganiatâd y llys.",
    "<strong>Mater penodol:</strong> mae'r gorchymyn hwn yn nodi penderfyniad ar faterion penodol, a allai gynnwys triniaeth feddygol, addysg neu wyliau tramor.",
  ],
  errors: {
    c1A_keepingSafeStatement: {
      required: "Disgrifiwch beth ydych chi eisiau i'r llys ei wneud i'ch cadw chi a'r plant yn ddiogel",
    },
  },
});

const languages = {
  en,
  cy,
};

export const form: FormContent = {
  fields: {
    c1A_keepingSafeStatement: {
      type: 'textarea',
      attributes: { rows: 10 },
      validator: value => isFieldFilledIn(value),
    },
  },
  submit: {
    text: l => l.onlycontinue,
  },
  saveAndComeLater: {
    text: l => l.saveAndComeLater,
  },
};

export const generateContent: TranslationFn = content => {
  const translations = languages[content.language]();
  return {
    ...translations,
    form,
  };
};

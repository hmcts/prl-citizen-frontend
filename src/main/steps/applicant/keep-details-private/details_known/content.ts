import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent } from '../../../../app/form/Form';
import {
  en as english,
  form as formContents,
  cy as welsh,
} from '../../../common/keep-details-private/details_known/content';
console.info('** FOR SONAR **');
const en = {
  ...english,
  title: 'Does the other person named in your application (the respondent) know any of your contact details?',
  line2:
    'Your application will be shared with the other person in the case (the respondent). This includes your contact details, unless you ask the court not to share these details.',
};

const cy: typeof en = {
  ...welsh,
  title:
    'Ydych chi eisiau cadw eich manylion cyswllt yn breifat oddi wrth y bobl eraill a enwir yn y cais (yr atebwyr)?',
  line2:
    "Bydd eich cais yn cael ei rannu gyda'r unigolyn arall yn yr achos (yr atebydd). Mae hyn yn cynnwys eich manylion cyswllt, oni bai eich bod yn gofyn i'r llys beidio â rhannu'r manylion hyn.",
};

const languages = {
  en,
  cy,
};

export const form: FormContent = {
  fields: formContents.fields,
  submit: {
    text: l => l.continue,
  },
};

export const generateContent: TranslationFn = content => {
  const translations = languages[content.language];
  return {
    ...translations,
    form,
  };
};

import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent } from '../../../../app/form/Form';

const en = {
  title: 'Transfer your case to your legal representative',
  content1: 'To transfer your case to your legal representative, provide them with your Case number.',
  content2:
    "Once your case is passed to your representative, you won't be able to edit your response. They will handle your case and receive any updates from the court.",
  content3: 'Your Case number is: ',
  content4:
    'Do not respond to this application yourself if you plan to have a legal representative complete the response.',
};

const cy: typeof en = {
  title: "Trosglwyddo eich achos i'ch cynrychiolydd cyfreithiol",
  content1: "I drosglwyddo eich achos i'ch cynrychiolydd cyfreithiol, rhowch eich rhif achos iddo.",
  content2:
    "Ar ôl i'ch achos gael ei drosglwyddo i'ch cynrychiolydd, ni fyddwch yn gallu golygu eich ymateb. Bydd yn trin eich achos ac yn derbyn unrhyw ddiweddariadau gan y llys.",
  content3: 'Rhif eich achos yw:',
  content4:
    "Peidiwch ag ymateb i'r cais hwn eich hun os ydych yn bwriadu cael cynrychiolydd cyfreithiol i gwblhau'r ymateb.",
};

const languages = {
  en,
  cy,
};

export const form: FormContent = {
  fields: {},
  onlyContinue: {
    text: l => l.onlyContinue,
  },
};

export const generateContent: TranslationFn = content => {
  const translations = languages[content.language];

  return {
    ...translations,
    form,
  };
};

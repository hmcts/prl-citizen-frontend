import { TranslationFn } from '../../../../app/controller/GetController';

const en = {
  title: 'Transfer your case to your legal representative',
  line1: 'To transfer your case to your legal representative, provide them with your Case number.',
  line2:
    "Once your case is passed to your representative, you won't be able to edit your response. They will handle your case and receive any updates from the court.",
  listItem: 'Your Case number is: ',
  warning: 'Warning',
  line3:
    'Do not respond to this application yourself if you plan to have a legal representative complete the response.',
  continue: 'Continue',
};

const cy: typeof en = {
  title: "Trosglwyddo eich achos i'ch cynrychiolydd cyfreithiol",
  line1: "I drosglwyddo eich achos i'ch cynrychiolydd cyfreithiol, rhowch eich rhif achos iddo.",
  line2:
    "Ar ôl i'ch achos gael ei drosglwyddo i'ch cynrychiolydd, ni fyddwch yn gallu golygu eich ymateb. Bydd yn trin eich achos ac yn derbyn unrhyw ddiweddariadau gan y llys.",
  listItem: 'Rhif eich achos yw:',
  warning: 'Warning - welsh',
  line3:
    "Peidiwch ag ymateb i'r cais hwn eich hun os ydych yn bwriadu cael cynrychiolydd cyfreithiol i gwblhau'r ymateb.",
  continue: 'Continue',
};

const languages = {
  en,
  cy,
};

export const generateContent: TranslationFn = content => {
  const translations = languages[content.language];
  const caseId = content.userCase?.id;
  return {
    ...translations,
    caseId,
  };
};

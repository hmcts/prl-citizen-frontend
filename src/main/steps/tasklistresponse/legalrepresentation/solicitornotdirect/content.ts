import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent } from '../../../../app/form/Form';

const en = {
  title: 'Complete your response',
  content1: "Complete your response to the applicant's request for child arrangements.",
  content2: 'Once you have completed all of the main sections, you will be able to review and submit your answers.',
  content3: 'Transfer your case to your legal representative',
  content4:
    'Once you have submitted your response, you have the option to pass your case over to a legal representative.',
  content5:
    "You will need to provide them with your Case number. Once the case is transferred, you won't be able to edit your response.",
  content6: 'Your Case number is: ',
  content7:
    'Do not respond to the application yourself, if you plan to have a legal representative complete the response.',
};

const cy: typeof en = {
  title: 'Cwblhau eich ymateb',
  content1: 'Cwblhau eich ymateb i gais yr ymgeisydd am drefniadau plant.',
  content2: "Ar ôl i chi  gwblhau'r holl brif adrannau, byddwch yn gallu adolygu a chyflwyno eich atebion.",
  content3: "Trosglwyddo eich achos i'ch cynrychiolydd cyfreithiol",
  content4:
    'Ar ôl i chi gyflwyno eich ymateb, mae gennych yr opsiwn i basio eich achos drosodd i gynrychiolydd cyfreithiol.',
  content5:
    'Bydd angen i chi ddarparu eich rhif achos iddo. Unwaith y bydd yr achos yn cael ei drosglwyddo, ni fyddwch yn gallu golygu eich ymateb.',
  content6: 'Rhif eich achos yw:',
  content7:
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

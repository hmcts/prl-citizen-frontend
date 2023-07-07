import { TranslationFn } from '../../../../app/controller/GetController';

const en = {
  title: 'Complete your response',
  line1: "Complete your response to the applicant's request for child arrangements.",
  line2: 'Once you have completed all of the main sections, you will be able to review and submit your answers.',
  listItem: 'Your Case number is: ',
  warning: 'Warning',
  respond:
    'Do not respond to the application yourself, if you plan to have a legal representative complete the response.',
  continue: 'Continue',
};

const cy: typeof en = {
  title: 'Cwblhau eich ymateb',
  line1: 'Cwblhau eich ymateb i gais yr ymgeisydd am drefniadau plant.',
  line2: "Ar ôl i chi  gwblhau'r holl brif adrannau, byddwch yn gallu adolygu a chyflwyno eich atebion.",
  listItem: 'Rhif eich achos yw:',
  warning: 'Rhybudd',
  respond:
    "Peidiwch ag ymateb i'r cais hwn eich hun os ydych yn bwriadu cael cynrychiolydd cyfreithiol i gwblhau'r ymateb.",
  continue: 'Parhau',
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

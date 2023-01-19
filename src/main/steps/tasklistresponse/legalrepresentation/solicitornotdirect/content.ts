import { TranslationFn } from '../../../../app/controller/GetController';
import { typeofcaseuser } from '../../../common/typeofcaseuser';
const en = {
  title: 'Complete your response',
  pagetitle: '',
  line1: "Complete your response to the applicant's request for child arrangements.",
  line2: 'Once you have completed all of the main sections, you will be able to review and submit your answers.',
  medheading: 'Transfer your case to your legal representative',
  line3: 'Once you have submitted your response, you have the option to pass your case over to a legal representative.',
  line4:
    "You will need to provide them with your Case number. Once the case is transferred, you won't be able to edit your response.",
  listItem: 'Your Case number is: ',
  warning: 'Warning',
  respond:
    'Do not respond to the application yourself, if you plan to have a legal representative complete the response.',
  continue: 'Continue',
};

const cy: typeof en = {
  title: 'Complete your response - welsh',
  pagetitle: '',
  line1: "Complete your response to the applicant's request for child arrangements. - welsh",
  line2:
    'Once you have completed all of the main sections, you will be able to review and submit your answers. - welsh',
  medheading: 'Transfer your case to your legal representative - welsh',
  line3:
    'Once you have submitted your response, you have the option to pass your case over to a legal representative. - welsh',
  line4:
    "You will need to provide them with your Case number. Once the case is transferred, you won't be able to edit your response. - welsh",
  listItem: 'Your Case number is: - welsh',
  warning: 'Warning - welsh',
  respond:
    'Do not respond to the application yourself, if you plan to have a legal representative complete the response. - welsh',
  continue: 'Continue',
};

const languages = {
  en,
  cy,
};

export const generateContent: TranslationFn = content => {
  const translations = languages[content.language];
  translations.pagetitle = typeofcaseuser(content.language, content.userCase?.caseTypeOfApplication, false);
  const caseId = content.userCase?.id;

  return {
    ...translations,
    caseId,
  };
};

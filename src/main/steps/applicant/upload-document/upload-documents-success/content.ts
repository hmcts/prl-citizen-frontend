import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent } from '../../../../app/form/Form';

console.info('** FOR SONAR **');

const en = {
  pageTitle: 'Document submitted',
  bannerHeading: 'Important',
  bannerTitle: 'You must serve the documents',
  paragraphs: [
    'You can do this by sending them to the party’s legal representative if they have one, or by posting or emailing them directly to the party.',
  ],
  whatHappensNext: 'What happens next',
  courtWillMakeDecisions: 'The court will make a decision on whether to restrict access to this document.',
  accessToCourtOnly: 'Access to the document will only be given to the court and judiciary.',
  continue: 'Close and return to case overview',
  uploadAgain: 'Upload another document',
};

const cy: typeof en = {
  pageTitle: 'Cyflwynwyd y ddogfen',
  bannerHeading: 'Pwysig',
  bannerTitle: "Rhaid i chi gyflwyno'r dogfennau",
  paragraphs: [
    'Gallwch wneud hyn drwy eu hanfon at gynrychiolydd cyfreithiol y parti os oes ganddynt un, neu drwy eu postio neu eu hanfon yn uniongyrchol at y parti.',
  ],
  whatHappensNext: 'Beth fydd yn digwydd nesaf',
  courtWillMakeDecisions: "Bydd y llys yn penderfynu a ddylid cyfyngu ar fynediad i'r ddogfen hon ai peidio",
  accessToCourtOnly: "Dim ond i'r llys a'r farnwriaeth y rhoddir mynediad i'r ddogfen",
  continue: 'Cau a dychwelyd i drosolwg o’r achos',
  uploadAgain: 'Llwytho dogfen arall',
};

const languages = {
  en,
  cy,
};

export const form: FormContent = {
  fields: {},
};

export const generateContent: TranslationFn = content => {
  const translations = languages[content.language];
  const reasonsToNotSeeTheDocument = content.userCase?.reasonsToNotSeeTheDocument;

  return {
    ...translations,
    form,
    haveReasonForDocNotToBeShared: content.userCase?.haveReasonForDocNotToBeShared,
    hasConfidentialDetails:
      reasonsToNotSeeTheDocument?.length === 1 && reasonsToNotSeeTheDocument?.includes('hasConfidentailDetails'),
  };
};

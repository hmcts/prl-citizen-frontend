import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent } from '../../../../app/form/Form';

const en = {
  pageTitle: 'Document submitted',
  bannerHeading: 'Important',
  bannerTitle: 'You must serve the documents',
  paragraphs: [
    'You can do this by sending them to the party’s legal representative if they have one, or by posting or emailing them directly to the party.',
  ],
  whatHappensNext: 'What happens next',
  courtWillMakeDecisions: 'The court will make a decision on whether to restrict access to this document.',
  continue: 'Close and return to case overview',
  uploadAgain: 'Upload another document',
};

const cy: typeof en = {
  pageTitle: 'Document submitted - welsh',
  bannerHeading: 'Important - welsh',
  bannerTitle: 'You must serve the documents - welsh',
  paragraphs: [
    'You can do this by sending them to the party’s legal representative if they have one, or by posting or emailing them directly to the party. - welsh',
  ],
  whatHappensNext: 'What happens next - welsh',
  courtWillMakeDecisions: 'The court will make a decision on whether to restrict access to this document. - welsh',
  continue: 'Close and return to case overview - welsh',
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

  return {
    ...translations,
    form,
    haveReasonForDocNotToBeShared: content.userCase?.haveReasonForDocNotToBeShared,
  };
};

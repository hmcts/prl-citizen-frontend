import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent } from '../../../../app/form/Form';

const en = {
  section: 'Document submitted',
  title: 'Important',
  text: 'Serve the documents',
  status: 'Your documents have been uploaded',
  para1:
    "If you haven't requested this document is restricted, it is your responsibility to share it with the other people in the case.",
  para2:
    "You can do this by sending to the party's legal representative if they have one or otherwise the party themselves by post or email.",
  restrictedHeading: 'If you have requested this document to be restricted',
  restrictedBody:
    'If you have requested this document is restricted, the court will review your request and let you know what happens next.',
  continue: 'Close and return to case overview',
  uploadAgain: 'Upload another document',
};

const cy: typeof en = {
  section: 'Document submitted -welsh',
  title: 'Important -welsh',
  text: 'Serve the documents -welsh',
  status: 'Your documents have been uploaded -welsh',
  para1:
    "If you haven't requested this document is restricted, it is your responsibility to share it with the other people in the case. -welsh",
  para2:
    "You can do this by sending to the party's legal representative if they have one or otherwise the party themselves by post or email. -welsh",
  restrictedHeading: 'If you have requested this document to be restricted -welsh',
  restrictedBody:
    'If you have requested this document is restricted, the court will review your request and let you know what happens next. -welsh',
  continue: 'Close and return to case overview -welsh',
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
  };
};

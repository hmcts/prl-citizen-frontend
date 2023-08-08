import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent } from '../../../../app/form/Form';
import { getDocumentMeta } from '../../../../steps/common/upload-document/util';

const en = {
  pageTitle: 'Document submitted',
  bannerHeading: 'Important',
  bannerTitle: 'Serve the documents',
  status: 'Your documents have been uploaded',
  paragraphs: [
    "If you haven't requested this document is restricted, it is your responsibility to share it with the other people in the case.",
    "You can do this by sending to the party's legal representative if they have one or otherwise the party themselves by post or email.",
  ],
  pageCaption: 'If you have requested this document to be restricted',
  pageContent:
    'If you have requested this document is restricted, the court will review your request and let you know what happens next.',
  continue: 'Close and return to case overview',
  uploadAgain: 'Upload another document',
};

const cy: typeof en = {
  pageTitle: 'Document submitted -welsh',
  bannerHeading: 'Important -welsh',
  bannerTitle: 'Serve the documents -welsh',
  status: 'Your documents have been uploaded -welsh',
  paragraphs: [
    "If you haven't requested this document is restricted, it is your responsibility to share it with the other people in the case. -welsh",
    "You can do this by sending to the party's legal representative if they have one or otherwise the party themselves by post or email. -welsh",
  ],
  pageCaption: 'If you have requested this document to be restricted -welsh',
  pageContent:
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
  const { docCategory, docType } = content.additionalData!.req.params;
  const { category: caption } = getDocumentMeta(docCategory, docType, content.language);

  return {
    ...translations,
    form,
    caption,
  };
};

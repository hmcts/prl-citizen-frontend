import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent } from '../../../../app/form/Form';

const emailId = 'example@test.com';

const en = {
  section: 'How your documents will be shared',
  email: emailId,
  continue: 'Continue',
  warning: 'Warning',
  warningTxt: 'When you upload a document, it will  be shared with the other people in the case.',
  documentSharedLine1:
    'If there is information that should not be shared, remove it from the document. If this is not possible, do not upload the document. Instead, you can ask  the court to restrict who can see the document. ',
  documentSharedLine2: 'The court will only agree to restrict who can see the document if:',
  documentSharedLine3: 'there is a good reason not to share the document, for example safety concerns',
  documentSharedLine4: 'the document is not something the judge needs to see',
  documentSharedLine5: 'an address that needs to be kept private is included in the document',
  documentSharedLine6: 'If you want the court to restrict who can see a document, email: ',
  documentSharedLine7: 'You must say why the document should be restricted.',
};

const cy: typeof en = {
  section: 'How your documents will be shared',
  email: emailId,
  continue: 'Continue',
  warning: 'Warning',
  warningTxt: 'When you upload a document, it will  be shared with the other people in the case.',
  documentSharedLine1:
    'If there is information that should not be shared, remove it from the document. If this is not possible, do not upload the document. Instead, you can ask  the court to restrict who can see the document. ',
  documentSharedLine2: 'The court will only agree to restrict who can see the document if:',
  documentSharedLine3: 'there is a good reason not to share the document, for example safety concerns',
  documentSharedLine4: 'the document is not something the judge needs to see',
  documentSharedLine5: 'an address that needs to be kept private is included in the document',
  documentSharedLine6: 'If you want the court to restrict who can see a document, email: ',
  documentSharedLine7: 'You must say why the document should be restricted.',
};

const languages = {
  en,
  cy,
};

export const form: FormContent = {
  fields: {

  },

  onlyContinue: {
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

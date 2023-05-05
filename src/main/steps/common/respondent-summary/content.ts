/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent } from '../../../app/form/Form';

const en = () => ({
  confirm: 'Confirm before continuing',
  submit:
    "Once you submit your response, you cannot make any further changes. Please select 'Submit your response' to complete your online response.",
  download: 'You can download a copy of your submitted response using the link below.',
  believeFacts: 'I believe that the facts stated in this response are true',
  statementOfTruthSubmission:
    'This confirms that the information you are submitting is true and accurate, to the best of your knowledge. It’s known as your ‘statement of truth’.',
  downloadDraftPDF: 'Download a draft of your response (PDF)',
  cannotOpen: 'If you cannot open the PDF file on your device, download and install',
  adobeReader: 'Adobe Acrobat Reader',
  tryAgain: 'and try again.',
  forRecords: 'Please note this draft is for your records. Only the completed response will be admitted in court.',
  downloadDraft: 'Download draft response',
});

const cy = () => ({
  confirm: 'Confirm before continuing (welsh)',
  submit:
    "Once you submit your response, you cannot make any further changes. Please select 'Submit your response' to complete your online response. (welsh)",
  download: 'You can download a copy of your submitted response using the link below. (welsh)',
  believeFacts: 'I believe that the facts stated in this response are true (welsh)',
  statementOfTruthSubmission:
    'This confirms that the information you are submitting is true and accurate, to the best of your knowledge. It’s known as your ‘statement of truth’. (welsh)',
  downloadDraftPDF: 'Download a draft of your response (PDF) (welsh)',
  cannotOpen: 'If you cannot open the PDF file on your device, download and install (welsh)',
  adobeReader: 'Adobe Acrobat Reader (welsh)',
  tryAgain: 'and try again. (welsh)',
  forRecords:
    'Please note this draft is for your records. Only the completed response will be admitted in court. (welsh)',
  downloadDraft: 'Download draft response (welsh)',
});

const languages = {
  en,
  cy,
};

export const form: FormContent = {
  fields: {},
};

export const generateContent: TranslationFn = content => {
  const translations = languages[content.language]();
  return {
    ...translations,
    form,
  };
};

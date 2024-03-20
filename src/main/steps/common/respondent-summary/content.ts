/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent } from '../../../app/form/Form';

console.info('** FOR SONAR **');

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
  confirm: 'Cadarnhewch cyn parhau',
  submit:
    'Unwaith y byddwch wedi cyflwyno’ch ymateb, ni allwch wneud unrhyw newidiadau pellach iddo. Dewiswch ‘Cyflwyno eich ymateb’ i gwblhau eich ymateb ar-lein.',
  download: 'Gallwch ddefnyddio’r ddolen isod i lawrlwytho copi o’r ymateb rydych wedi’i gyflwyno.',
  believeFacts: 'Credaf fod y ffeithiau a nodir yn yr ymateb hwn yn wir',
  statementOfTruthSubmission:
    'Mae hyn yn cadarnhau bod yr wybodaeth yr ydych yn ei chyflwyno yn wir ac yn gywir, hyd eithaf eich gwybodaeth. Gelwir hwn yn eich ‘datganiad gwirionedd',
  downloadDraftPDF: 'Lawrlwytho drafft o’ch ymateb (PDF)',
  cannotOpen: 'Os na allwch agor y ffeil PDF ar eich dyfais, llwythwch a gosodwch',
  adobeReader: 'Adobe Acrobat Reader (welsh)',
  tryAgain: 'ar eich dyfais a cheisio eto.',
  forRecords: 'Noder mai drafft yw hwn ar gyfer eich cofnodion. Dim ond yr ymateb terfynol a dderbynnir yn y llys.',
  downloadDraft: 'Lawrlwytho drafft o’r ymateb',
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

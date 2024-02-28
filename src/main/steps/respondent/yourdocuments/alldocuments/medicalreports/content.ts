import { TranslationFn } from '../../../../../app/controller/GetController';
import { getDocumentList } from '../../../../../steps/applicant/yourdocuments/alldocuments/alldocuments/utils';

console.info('** FOR SONAR **');

const en = () => {
  return {
    section: 'All documents',
    title: 'Medical reports',
    caseNumber: 'Case number',
    continue: 'Go back',
  };
};

const cy: typeof en = () => {
  return {
    section: 'Pob dogfen',
    title: 'Adroddiadau meddygol',
    threeHint: 'Mae hwn yn god 8 nod',
    summaryText: 'Cysylltiadau am gymorth',
    caseNumber: 'Rhif yr achos',
    continue: 'Yn ôl',
  };
};

const languages = {
  en,
  cy,
};

export const generateContent: TranslationFn = content => {
  const translations = languages[content.language]();
  const documentToView = content.additionalData?.req.session.applicationSettings.docToView;
  const citizenUploadedDocumentList = content.userCase?.citizenUploadedDocumentList;

  return {
    ...translations,
    orders: getDocumentList(citizenUploadedDocumentList, documentToView.docType, documentToView.uploadedBy),
  };
};
